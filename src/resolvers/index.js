import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import messageResolvers from './message';
import recipeResolvers from './recipe'
import ingredientResolvers from "./ingredient";
import itemResolvers from "./item";
import instructionResolvers from "./instruction";
import uomResolvers from "./uom";

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  messageResolvers,
  recipeResolvers,
  ingredientResolvers,
  itemResolvers,
  instructionResolvers,
  uomResolvers
];
