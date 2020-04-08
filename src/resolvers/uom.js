import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

export default {
  Query: {
    uoms: async (parent, args, { models }) => {
      return await models.UOM.findAll();
    },
    uom: async (parent, { id }, { models }) => {
      return await models.UOM.findById(id);
    }
  }
};
