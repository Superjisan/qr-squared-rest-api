import { combineResolvers } from 'graphql-resolvers';
import { UserInputError } from 'apollo-server';
import { Op } from 'sequelize';

import {
  isAuthenticated,
  isRecipeAuthorOrAdmin
} from './authorization';

export default {
  Query: {
    recipes: async (parent, args, { models }) => {
      return await models.Recipe.findAll();
    },
    recipe: async (parent, { id }, { models }) => {
      return await models.Recipe.findOne({ where: { id } });
    },
    recipeSearchByName: async (parent, { name }, { models }) => {
      return await models.Recipe.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        }
      });
    },
    myRecipes: combineResolvers(
      isAuthenticated,
      async (parent, args, {models, me}) => {
        return await models.Recipe.findAll({
          where: {
            authorId: me.id
          }
        })
      }
    )
  },

  Mutation: {
    addRecipe: combineResolvers(
      isAuthenticated,
      async (parent, { name }, { models, me }) => {
        const recipe = await models.Recipe.create(
          {
            name,
            authorId: me.id
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

    updateRecipe: combineResolvers(
      isRecipeAuthorOrAdmin,
      async (
        parent,
        { id, name, rating, originUrl, originText, cookingTime, imageUrl },
        { models }
      ) => {
        const recipeToUpdate = await models.Recipe.findOne({
          where: {
            id
          }
        });
        let recipeObject = {};
        if (name) {
          recipeObject.name = name;
        }
        if (rating) {
          recipeObject.rating = rating;
        }
        if (originUrl || originUrl === "") {
          recipeObject.originUrl = originUrl;
        }
        if (originText || originText === "") {
          recipeObject.originText = originText;
        }
        if (cookingTime || cookingTime === "") {
          recipeObject.cookingTime = cookingTime;
        }

        if (imageUrl || imageUrl === "") {
          recipeObject.imageUrl = imageUrl
        }

        return await recipeToUpdate.update(recipeObject);
      }
    ),
    deleteRecipe: combineResolvers(
      isRecipeAuthorOrAdmin,
      async (parent, { id }, { models }) => {
        return await models.Recipe.destroy({ where: { id } });
      }
    )
  },

  Recipe: {
    author: async (recipe, args, { models }) => {
      return await models.User.findOne({
        where: {
          id: recipe.authorId
        }
      });
    },
    ingredients: async (recipe, args, { models }) => {
      return await models.Ingredient.findAll({
        where: {
          recipeId: recipe.id
        },
        order: [['id', 'ASC']]
      });
    },
    instructions: async (recipe, args, { models }) => {
      return await models.Instruction.findAll({
        where: {
          recipeId: recipe.id
        },
        order: [['id', 'ASC']]
      });
    }
  }
};
