import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
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
  recipeResolvers,
  ingredientResolvers,
  itemResolvers,
  instructionResolvers,
  uomResolvers
];
