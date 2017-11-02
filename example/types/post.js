import Author from './author';

const Post = `
  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }
`;


export default () => [Post, Author];
