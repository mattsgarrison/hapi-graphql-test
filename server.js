import hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
const server = new hapi.Server();
const HOST = 'localhost';
const PORT = 3000;

const GraphQLSchema = {};
const GraphQLOptions = {
  schema: GraphQLSchema,
  
  //rootValue?: any,
  
  //context?: any,
  
  //formatError?: Function,
  
  //logFunction?: Function,
  
  //formatParams?: Function,
  
  //validationRules?: Array<ValidationRule>,
  
  //formatResponse?: Function
  
  //fieldResolver?: Function
  
  debug: true
};

server.connection({
    host: HOST,
    port: PORT,
});

/** 
 * Register the main graphql endpoint
 */
server.register({
  register: graphqlHapi,
  options: {
    path: '/graphql',
    graphqlOptions: GraphQLOptions,
  },
});

/**
 * Register the GraphiQL in-browser IDE endpoint
 */
server.register({
  register: graphiqlHapi,
  options: {
    path: '/graphiql',
    graphiqlOptions: {
      endpointURL: '/graphql',
    },
  },
});

server.start((err) => {
  if(err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
