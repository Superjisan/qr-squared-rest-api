import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    ingredients: [Ingredient!]
    ingredient(id: ID!): Ingredient
  }
  
  extend type Mutation {
    addIngredient(
      qty:Float!,
      itemName: String,
      itemId: Int,
      recipeId: Int!,
      uomId: Int
    ): Ingredient!

    updateIngredient(
      id: ID!
      recipeId: ID!
      qty: Float!
      itemId: ID
      itemName: String
      uomId: ID
    ): Ingredient!

    deleteIngredient(
      id: ID!
      recipeId: ID!
    ): Boolean!
  }

  type Ingredient {
      id: ID!
      category: String
      qty: Float!
      item: Item!
      recipe: Recipe!
      instructions: [Instruction!]
      uom: UOM
  }`;