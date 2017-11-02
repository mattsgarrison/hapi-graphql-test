import hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import { schema as exampleSchema } from './example/example-schema.mjs';

import { addErrorLoggingToSchema } from 'graphql-tools';
const logger = { log: (e) => console.error(e.stack) };
addErrorLoggingToSchema(exampleSchema, logger);

const server = new hapi.Server();
const HOST = '0.0.0.0';
const PORT = 3000;


const GraphQLOptions = {
  schema: exampleSchema,
};

server.connection({
    // host: HOST,
    port: PORT
});

/**
 * Register the main graphql endpoint
 */
server.register({
  register: graphqlHapi,
  options: {
    path: '/graphql',
    graphqlOptions: GraphQLOptions,
    route: {
      cors: true
    }
  },
});

/**
 * Register the GraphiQL in-browser IDE endpoint
 */
server.register({
  register: graphiqlHapi,
  options: {
    path: '/graphiql',
    schema: exampleSchema,
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
