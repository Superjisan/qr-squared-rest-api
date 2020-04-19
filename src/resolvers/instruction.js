import { combineResolvers } from 'graphql-resolvers';
import { Op } from 'sequelize';
import {
  AuthenticationError,
  UserInputError,
  ApolloError,
} from 'apollo-server';

import {
  isAuthenticated,
  isRecipeAuthorOrAdmin,
} from './authorization';

export default {
  Query: {
    instructions: async (parent, args, { models }) => {
      return await models.Instruction.findAll();
    },
    instruction: async (parent, { id }, { models }) => {
      return await models.Instruction.findOne({ id });
    },
  },

  Mutation: {
    addInstruction: async (
      parent,
      {
        text,
        textIngredients,
        textTimes,
        category,
        ingredientIds,
        recipeId,
      },
      { models }
    ) => {
      if (!recipeId) {
        throw new UserInputError('Need to specify recipeId');
      }
      const instructionObj = {
        text,
        recipeId,
      };
      if (textIngredients) {
        const textIngredientJSONArr = textIngredients.map((elem) =>
          JSON.stringify(elem)
        );
        instructionObj.textIngredients = textIngredientJSONArr;
      }
      if (textTimes) {
        const textTimesJSONArr = textIngredients.map((elem) =>
          JSON.stringify(elem)
        );
        instructionObj.textTimes = textTimesJSONArr;
      }
      if (category || category === null) {
        instructionObj.category = category;
      }

      const instruction = await models.Instruction.create(
        instructionObj
      );
      if (!ingredientIds) {
        return instruction;
      } else {
        return instruction.then((instructionInstance) => {
          return models.Ingredient.findAll({
            where: {
              id: {
                [Op.or]: ingredientIds,
              },
            },
          }).then((ingredients) => {
            return instructionInstance.setIngredients(ingredients);
          });
        });
      }
    },
    updateInstruction: combineResolvers(
      isRecipeAuthorOrAdmin,
      async (
        parent,
        {
          id,
          text,
          textIngredients,
          textTimes,
          category,
          ingredientIds,
          recipeId,
        },
        { models }
      ) => {
        try {
          const instructionToUpdate = await models.Instruction.findOne(
            {
              where: { id },
            }
          );
          const instructionObj = {
            text,
            recipeId,
          };
          if (textIngredients) {
            const textIngredientJSONArr = textIngredients.map(
              (elem) => JSON.stringify(elem)
            );
            instructionObj.textIngredients = textIngredientJSONArr;
          }
          if (textTimes) {
            const textTimesJSONArr = textIngredients.map((elem) =>
              JSON.stringify(elem)
            );
            instructionObj.textTimes = textTimesJSONArr;
          }
          if (category || category === null) {
            instructionObj.category = category;
          }
          const instructionUpdatedInstance = await instructionToUpdate.update(
            instructionObj
          );
          if (!ingredientIds) {
            return instructionUpdatedInstance;
          } else {
            return instruction.then((instructionInstance) => {
              return models.Ingredient.findAll({
                where: {
                  id: {
                    [Op.or]: ingredientIds,
                  },
                },
              }).then((ingredients) => {
                return instructionInstance.setIngredients(
                  ingredients
                );
              });
            });
          }
        } catch (err) {
          throw new ApolloError(err);
        }
      }
    ),
    deleteInstruction: combineResolvers(
      isRecipeAuthorOrAdmin,
      async (parent, { id }, { models }) => {
        return await models.Instruction.destroy({ where: { id } });
      }
    ),
  },

  Instruction: {
    recipe: async (instruction, args, { models }) => {
      return await models.Recipe.findOne({
        where: {
          id: instruction.recipeId,
        },
      });
    },

    ingredients: async (instruction, args, { models }) => {
      return await models.Ingredient.findAll({
        include: [
          {
            model: models.Instruction,
            where: {
              id: instruction.id,
            },
          },
        ],
      });
    },

    textIngredients: async (instruction, args, { models }) => {
      try {
        return await models.Instruction.findOne({
          where: { id: instruction.id },
        }).then((instructionInstance) => {
          const { textIngredients } = instruction;
          return textIngredients;
        });
      } catch (e) {
        console.error(e);
      }
    },
    textTimes: async (instruction, args, { models }) => {
      try {
        return await models.Instruction.findOne({
          where: { id: instruction.id },
        }).then((instructionInstance) => {
          const { textTimes } = instruction;
          return textTimes;
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
};
