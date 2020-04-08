import { gql } from 'apollo-server-express';

import userSchema from './user';
import messageSchema from './message';
import recipeSchema from './recipe';
import ingredientSchema from "./ingredient";
import itemSchema from "./item";
import instructionSchema from "./instruction";
import UOMSchema from "./uom";

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema, 
  userSchema, 
  messageSchema, 
  recipeSchema,
  ingredientSchema,
  itemSchema,
  instructionSchema,
  UOMSchema
];
