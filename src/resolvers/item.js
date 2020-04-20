import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

import { isAdmin } from './authorization';
export default {
  Query: {
    items: async (parent, args, { models }) => {
      return await models.Item.findAll();
    },
    item: async (parent, { id }, { models }) => {
      return await models.Item.findOne({ where: { id } });
    }
  },

  Mutation: {
    updateItem: combineResolvers(
      isAdmin,
      async (parent, { id, name, type }, { models }) => {
        const itemToUpdate = await models.Item.findOne({
          where: { id }
        });
        return await itemToUpdate.update({ id, name, type });
      }
    ),
    deleteItem: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.Item.destroy({ where: { id } });
      }
    )
  },

  Item: {
    ingredients: async (item, args, { models }) => {
      return await models.Ingredient.findAll({
        where: {
          itemId: item.id
        }
      });
    }
  }
};
