import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    items: [Item!]
    item(id: ID!): Item!
  }

  type Item {
      id: ID!
      name: String!
      type: String
      ingredients: [Ingredient!]
  }`;