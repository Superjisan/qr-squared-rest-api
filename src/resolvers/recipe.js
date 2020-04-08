import { pickBy } from 'lodash';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { isAuthenticated } from './authorization';

export default {
  Query: {
    recipes: async (parent, args, { models }) => {
      return await models.Recipe.findAll();
    },
    recipe: async (parent, { id }, { models }) => {
      return await models.Recipe.findById(id);
    },
  },

  Mutation: {
    addRecipe: combineResolvers(
      isAuthenticated,
      async (parent, { name }, { models, me }) => {
        const recipe = await models.Recipe.create(
          {
            name,
            authorId: me.id,
          },
          { include: [{ model: models.User, as: 'author' }] }
        );
        if (!recipe) {
          throw new UserInputError(
            'Name is needed to create a recipe'
          );
        }

        return recipe;
      }
    ),

    updateRecipe: async (parent, { recipe }, { models }) => {
      const recipeToUpdate = await models.Recipe.findOne({
        where: {
          id: recipe.id,
        },
      });
      return await recipeToUpdate.update(recipe);
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
    ingredients: async (recipe, args, { models }) => {
      return await models.Ingredient.findAll({
        where: {
          recipeId: recipe.id,
        },
      });
    },
    instructions: async (recipe, args, { models }) => {
      return await models.Instruction.findAll({
        where: {
          recipeId: recipe.id,
        },
      });
    },
  },
};
