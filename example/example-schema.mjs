import { filter, find, merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from './example-resolvers.mjs';
const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];
const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

const Author = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }
`;
const Post = `
  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }
`;

const Query = `
  # the schema allows the following query:
  type Query {
    hello: String
    posts: [Post]
    author(id: Int!): Author
  }
`;

const Mutation = `
  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [Author, Post, Query, Mutation],
  resolvers,
});