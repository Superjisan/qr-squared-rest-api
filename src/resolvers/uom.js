import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, ApolloError } from 'apollo-server';

import { isAuthenticated, isAdmin } from './authorization';

export default {
  Query: {
    uoms: async (parent, args, { models }) => {
      return await models.UOM.findAll();
    },
    uom: async (parent, { id }, { models }) => {
      return await models.UOM.findById(id);
    },
  },
  Mutation: {
    addUOM: combineResolvers(
      isAuthenticated,
      async (parent, { name, alias }, { models }) => {
        try {
          const UOM = {
            name
          };
          if(alias) {
            UOM.alias = alias;
          }
          return await models.UOM.create(UOM)
        } catch (err) {
          throw new ApolloError(err);
        }
      }
    ),
    deleteUOM: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        try {
          return await models.UOM.destroy({ where:  {id} });
        } catch (err) {
          throw new ApolloError(err);
        }
      }
    ),
  },
};
