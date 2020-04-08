import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    instructions: [Instruction!]
    instruction(id: ID!): Instruction!
  }

  type Instruction {
      id: ID!
      text: String!
      textTimes: [String]
      category: String
      recipe: Recipe!
      ingredients: [Ingredient!]
  }`;