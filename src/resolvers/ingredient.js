import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

export default {
  Query: {
    ingredients: async (parent, args, { models }) => {
      return await models.Ingredient.findAll();
    },
    ingredient: async (parent, { id }, { models }) => {
      return await models.Ingredient.findById(id);
    },
  },

  Ingredient: {
    recipe: async (ingredient, args, { models }) => {
      return await models.Recipe.findOne({
        where: {
          id: ingredient.recipeId,
        },
      });
    },
    item: async (ingredient, args, { models }) => {
      return await models.Item.findOne({
        where: {
          id: ingredient.itemId,
        },
      });
    },
    instructions: async (ingredient, args, { models }) => {
      return await models.Instruction.findAll({
        include: [models.Ingredient],
        where: {
          id: ingredient.id,
        },
      });
    },
  },
};
