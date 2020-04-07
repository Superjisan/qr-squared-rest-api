import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import messageResolvers from './message';
// import recipeResolvers from './recipe';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  messageResolvers,
];
