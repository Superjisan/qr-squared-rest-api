import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

export default {
  Query: {
    items: async (parent, args, { models }) => {
      return await models.Item.findAll();
    },
    item: async (parent, { id }, { models }) => {
      return await models.Item.findById(id);
    },
  },

  Item: {
    ingredients: async (item, args, { models }) => {
      return await models.Ingredient.findAll({
        where: {
          itemId: item.id,
        },
      });
    },
  },
};
