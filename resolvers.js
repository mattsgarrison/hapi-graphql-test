import { merge } from 'lodash';

import { resolvers as exampleResolvers } from './example/example-resolvers.mjs';

const rootResolvers = {};

const resolvers = merge(rootResolvers, exampleResolvers);

export default resolvers;