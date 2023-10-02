const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
require('dotenv').config();

const doc = {
    info: {
        title: 'BetterStudent API',
        description: 'Description',
    },
    host: `${process.env.EXPO_PUBLIC_EXPRESS_URL}:${process.env.EXPO_PUBLIC_EXPRESS_PORT}`,
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./express.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);