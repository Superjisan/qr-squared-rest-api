import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { isAuthenticated } from './authorization';

export default {
  Query: {
    ingredients: async (parent, args, { models }) => {
      return await models.Ingredient.findAll();
    },
    ingredient: async (parent, { id }, { models }) => {
      return await models.Ingredient.findOne({ where: { id } });
    },
  },

  Mutation: {
    addIngredient: combineResolvers(
      isAuthenticated,
      async(parent, {qty, itemName, itemId, uomId, recipeId}, {models, me}) => {
        let ingredientObject = {
          recipeId,
          uomId,
          qty
        };
        if(itemName) {
          ingredientObject.item = {
            name: itemName
          }
        }
        if(itemId) {
          ingredientObject.itemId = itemId
        }
        const ingredient = await models.Ingredient.create(ingredientObject, {include: [models.Item, models.UOM]})
        if(!ingredient) {
          throw new UserInputError('Unable to create ingredient')
        }
        return ingredient
      }
    )
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
    uom: async (ingredient, args, { models }) => {
      return await models.UOM.findOne({
        where: {
          id: ingredient.uomId,
        },
      });
    },
    instructions: async (ingredient, args, { models }) => {
      return await models.Instruction.findAll({
        include: [
          {
            model: models.Ingredient,
            where: {
              id: ingredient.id,
            },
          },
        ],
      });
    },
  },
};
