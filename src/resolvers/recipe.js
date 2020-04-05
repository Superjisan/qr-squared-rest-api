import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

export default {
    Query: {
        recipes: async(parent, args, {models}) => {
            return await models.Recipe.findAll();
        }
    }

}