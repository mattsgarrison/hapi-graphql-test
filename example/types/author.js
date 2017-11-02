import Post from './post';

const Author = `
  # Description for Author
  
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }
`;

export default () => [Author, Post];
