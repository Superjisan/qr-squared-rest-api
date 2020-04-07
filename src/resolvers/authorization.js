import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === 'ADMIN'
      ? skip
      : new ForbiddenError('Not authorized as admin.'),
);

export const isMessageOwner = async (
  parent,
  { id },
  { models, me },
) => {
  const message = await models.Message.findById(id, { raw: true });

  if (message.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};


export const isRecipeAuthorOrAdmin = combineResolvers(
  isAuthenticated,
  async (parent, {id}, { me: { role } }) => {
    const recipe = await models.Recipe.findById(id, {raw: true});
    if(me.id !== recipe.id || role !== "ADMIN") {
      throw new ForbiddenError("Not authorized to edit recipe");
    }
    return skip;
  }
)