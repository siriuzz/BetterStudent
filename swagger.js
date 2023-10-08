const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
require('dotenv').config();

const doc = {
    info: {
        title: 'BetterStudent API',
        description: 'Description',
    },
    host: `${process.env.EXPO_PUBLIC_EXPRESS_URL}`,
    servers: [
        { url: `${process.env.EXPO_PUBLIC_EXPRESS_URL}` },
    ],
    schemes: ['http'],
    components: {
        schemas: {
            Student: {
                $name: 'Elian',
                $email: 'elian1234@gmail.com',
                $info: 'Coloque aqui su informacion académica',
                $phone_number: '1234567890',
                $password: '1234567890',
                rating: 0,
                $career_id: '1',
            }
        }
    },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);