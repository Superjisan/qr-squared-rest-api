import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    recipes: [Recipe!]
    recipe(id: ID!): Recipe!
    recipeSearchByName(name: String): [Recipe!]
    myRecipes: [Recipe!]
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
      imageUrl: String
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
    imageUrl: String
    instructions: [Instruction!]
    ingredients: [Ingredient!]
  }
`;
