import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    items: [Item!]
    item(id: ID!): Item!
  }

  extend type Mutation {
    updateItem(
      id: ID!
      name: String!
      type: String
    ): Item!
    
    deleteItem(
      id: ID!
    ): Boolean!
  }

  type Item {
      id: ID!
      name: String!
      type: String
      ingredients: [Ingredient!]
  }`;