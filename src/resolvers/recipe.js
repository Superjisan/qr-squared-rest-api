import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

export default {
  Query: {
    recipes: async (parent, args, { models }) => {
      return await models.Recipe.findAll();
    },
    recipe: async (parent, { id }, { models }) => {
      return await models.Recipe.findById(id);
    },
  },

  Recipe: {
    author: async (recipe, args, { models }) => {
      return await models.User.findOne({
        where: {
          id: recipe.authorId,
        },
      });
    },
    ingredients: async (recipe, args, {models}) => {
      return await models.Ingredient.findAll({
        where: {
          recipeId: recipe.id
        }
      })
    },
    instructions: async (recipe, args, {models}) => {
      return await models.Instruction.findAll({
        where: {
          recipeId: recipe.id
        }
      })
    }
  },
};
