import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    uoms: [UOM!]
    uom(id: ID!): UOM!
  }

  type UOM {
    id: ID!
    name: String!
    alias: String
  }
`;
