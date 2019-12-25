import * as cors from '@koa/cors';

// setting up cors
const corsOptions = {
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE']
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
