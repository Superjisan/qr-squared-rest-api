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