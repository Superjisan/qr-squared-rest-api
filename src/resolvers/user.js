import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

import { isAdmin, isAuthenticated } from './authorization';

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};

export default {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findOne({
        where: {
          id
        }
      });
    },
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }

      return await models.User.findOne({where: {id:me.id}});
    },
  },

  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { models, secret },
    ) => {
      const user = await models.User.create({
        username,
        email,
        password,
      });

      return { token: createToken(user, secret, '30m') };
    },

    signIn: async (
      parent,
      { login, password },
      { models, secret },
    ) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.',
        );
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }

      return { token: createToken(user, secret, '4h') };
    },

    updateUser: combineResolvers(
      isAuthenticated,
      async (parent, { username, password, email, role }, { models, me }) => {
        
        const user = await models.User.findOne({
          where: {
            id: me.id
          }
        });
        let passwordToSet;
        if(password) {
          if(password.length < 7 || password.length >  42) {
            throw new UserInputError('password not the correct length')
          } else {
            passwordToSet = await bcrypt.hash(password, 10)
          }
        }
        return await user.update({ username, password: passwordToSet , email, role });
      },
    ),

    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.User.destroy({
          where: { id },
        });
      },
    ),
  },

  User: {
    recipes: async (user, args, {models}) => {
      return await models.Recipe.findAll({
        where: {
          authorId: user.id
        }
      })
    }
  },
};
