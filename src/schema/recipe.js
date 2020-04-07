import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    recipes: [Recipe!]
    recipe(id: ID!): Recipe!
  }

  type Recipe {
      id: ID!
      name: String!
      rating: Int
      originUrl: String
      originText: String
      author: User!
  }
`