import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

export default {
  Query: {
    instructions: async (parent, args, { models }) => {
      return await models.Instruction.findAll();
    },
    instruction: async (parent, { id }, { models }) => {
      return await models.Instruction.findById(id);
    },
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
        include: [models.Instruction],
        where: {
          id: instruction.id,
        },
      });
    },
  },
};
