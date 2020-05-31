import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';
import {
  isAuthenticated,
  isRecipeAuthorOrAdmin
} from './authorization';

export default {
  Query: {
    ingredients: async (parent, args, { models }) => {
      return await models.Ingredient.findAll();
    },
    ingredient: async (parent, { id }, { models }) => {
      return await models.Ingredient.findOne({ where: { id } });
    }
  },

  Mutation: {
    addIngredient: combineResolvers(
      isAuthenticated,
      async (
        parent,
        { qty, itemName, itemId, uomId, recipeId, category },
        { models, me }
      ) => {
        let ingredientObject = {
          recipeId,
          uomId,
          qty
        };
        if (itemName) {
          ingredientObject.item = {
            name: itemName
          };
        }
        if (itemId) {
          ingredientObject.itemId = itemId;
        }

        if (uomId) {
          ingredientObject.uomId = uomId;
        }

        if(category) {
          ingredientObject.category = category;
        }

        const ingredient = await models.Ingredient.create(
          ingredientObject,
          { include: [models.Item, models.UOM] }
        );
        if (!ingredient) {
          throw new UserInputError('Unable to create ingredient');
        }
        return ingredient;
      }
    ),
    updateIngredient: combineResolvers(
      isRecipeAuthorOrAdmin,
      async (
        parent,
        { id, recipeId, qty, itemName, itemId, uomId, category },
        { models }
      ) => {
        let ingredientObject = {
          recipeId,
          uomId,
          qty
        };
        if (itemName) {
          ingredientObject.item = {
            name: itemName
          };
        }
        if (itemId) {
          ingredientObject.itemId = itemId;
        }

        if (uomId) {
          ingredientObject.uomId = uomId;
        }

        if(category) {
          ingredientObject.category = category;
        }

        const ingredientToUpdate = await models.Ingredient.findOne({
          where: { id }
        });

        const upgradedIngredient = await ingredientToUpdate.update(
          ingredientObject,
          {
            include: [models.Item, models.UOM]
          }
        );
        if (!itemName || (itemName && !upgradedIngredient.itemId)) {
          return upgradedIngredient;
        } else {
          const newItem = await models.Item.create({
            name: itemName
          });

          return await upgradedIngredient.update({
            ...ingredientObject,
            itemId: newItem.id
          });
        }
      }
    ),
    deleteIngredient: combineResolvers(
      isRecipeAuthorOrAdmin,
      async (parent, { id, recipeId }, { models }) => {
        if (!recipeId) {
          new UserInputError('recipeId must be specified');
        }
        return await models.Ingredient.destroy({
          where: { id }
        });
      }
    )
  },

  Ingredient: {
    recipe: async (ingredient, args, { models }) => {
      return await models.Recipe.findOne({
        where: {
          id: ingredient.recipeId
        }
      });
    },
    item: async (ingredient, args, { models }) => {
      return await models.Item.findOne({
        where: {
          id: ingredient.itemId
        }
      });
    },
    uom: async (ingredient, args, { models }) => {
      return await models.UOM.findOne({
        where: {
          id: ingredient.uomId
        }
      });
    },
    instructions: async (ingredient, args, { models }) => {
      return await models.Instruction.findAll({
        include: [
          {
            model: models.Ingredient,
            where: {
              id: ingredient.id
            }
          }
        ]
      });
    }
  }
};
