import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    recipes: [Recipe!]
    recipe(id: ID!): Recipe!
  }

  extend type Mutation {
    addRecipe(name: String!): Recipe!

    updateRecipe(
      id: ID!
      name: String
      rating: Int
      originUrl: String
      originText: String
      cookingTime: String
    ): Recipe!

    deleteRecipe(id: ID!): Boolean!
  }

  type Recipe {
    id: ID!
    name: String!
    rating: Int
    originUrl: String
    originText: String
    author: User
    cookingTime: String
    instructions: [Instruction!]
    ingredients: [Ingredient!]
  }
`;
