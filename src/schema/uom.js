import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    uoms: [UOM!]
    uom(id: ID!): UOM!
  }

  extend type Mutation {
    addUOM(name: String!, alias: String): UOM!
    deleteUOM(id: ID!): Boolean!
  }

  type UOM {
    id: ID!
    name: String!
    alias: String
  }
`;
