import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === 'ADMIN'
      ? skip
      : new ForbiddenError('Not authorized as admin.')
);

export const isRecipeAuthorOrAdmin = combineResolvers(
  isAuthenticated,
  (parent, { id, recipeId }, { me, models }) => {
    return models.Recipe.findOne(
      { where: { id: recipeId || id } },
      { raw: true }
    ).then((recipe) => {
      console.log({me, recipe})
      if (me.id !== recipe.authorId && me.role !== 'ADMIN') {
        throw new ForbiddenError('Not authorized to edit recipe');
      }
      return skip;
    });
  }
);
