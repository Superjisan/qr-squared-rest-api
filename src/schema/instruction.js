import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    instructions: [Instruction!]
    instruction(id: ID!): Instruction!
  }

  extend type Mutation {
    addInstruction(
      text: String!
      textIngredients: [InputTextIngredient]
      textTimes: [InputTextTime]
      category: String
      recipeId: ID!
      ingredientIds: [ID]
    ): Instruction!

    updateInstruction(
      id: ID!
      recipeId: ID!
      text: String!
      textIngredients: [InputTextIngredient]
      textTimes: [InputTextTime]
      category: String
      ingredientIds: [ID]
    ): Instruction!

    deleteInstruction(
      id: ID!
      recipeId: ID!
    ): Boolean!
  }

  type Instruction {
      id: ID!
      text: String!
      textTimes: [InstructionTextTime]
      textIngredients: [InstructionTextIngredient]
      category: String
      recipe: Recipe!
      ingredients: [Ingredient!]
  }
  
  type InstructionTextTime {
    wordIndex: Int!
    timeValue: String!
  }

  type InstructionTextIngredient {
    wordIndex: Int!
    ingredientId: Int!
  }

  input InputTextTime {
    wordIndex: Int
    timeValue: String!
  }

  input InputTextIngredient {
    wordIndex: Int
    ingredientId: Int
  }
  
  `;