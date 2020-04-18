import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    instructions: [Instruction!]
    instruction(id: ID!): Instruction!
  }

  type Instruction {
      id: ID!
      text: String!
      textTimes: [InstructionTextTime!]
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
  
  `;