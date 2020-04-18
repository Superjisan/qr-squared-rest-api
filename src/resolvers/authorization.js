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
  async (parent, { id, recipeId }, { me: { role } }) => {
    const recipe = await models.Recipe.findOne(
      { where: { id: recipeId || id } },
      { raw: true }
    );
    if (me.id !== recipe.author.id || role !== 'ADMIN') {
      throw new ForbiddenError('Not authorized to edit recipe');
    }
    return skip;
  }
);
