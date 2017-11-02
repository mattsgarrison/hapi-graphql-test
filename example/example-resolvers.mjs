import { find, filter } from 'lodash';

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

export const resolvers = {
  Query: {
    hello: {
      description: 'Hello World',
      resolve: () => {
        return 'hello world!';
      } 
    },
    posts: {
      description: 'Returns the post mocks',
      resolve: () => posts,
    },
    author: {
      description: 'Returns the individual author mock',
      resolve: (_, { id }) => find(authors, { id: id }),
    }
  },
  Mutation: {
    // Description for upvotePost
    // upvotes the post's votes and returns the value
    upvotePost: {
      description: 'Upvote a post by id',
      resolve: (_, { postId }) => {
        const post = find(posts, { id: postId });
        if (!post) {
          throw new Error(`Couldn't find post with id ${postId}`);
        }
        post.votes += 1;
        return post;
      }
    },
  },
  Author: {
    posts: (author) => filter(posts, { authorId: author.id }),
  },
  Post: {
    author: (post) => find(authors, { id: post.authorId }),
  },
};