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
            },
            Login: {
                $email: 'example@email.com',
                $password: '1234567890'
            },
            Career: {
                $name: 'Ingeniería en Sistemas Computacionales',
                $faculty: 'Facultad de Ingeniería'
            },
            Review: {
                $student_id: '1',
                $title: 'Excelente profesor',
                $comment: 'El profesor es muy bueno',
                $rating: '5',
                $date: '2021-10-10'
            },
            Section: {
                $subject_id: '1',
                $schedule_id: '1',
                $classroom_code: '123',
                $professor_id: '1',
                $number: '1'
            },
            Friend: {
                $student_id: '1',
                $friend_id: '2'
            },
            Subject: {
                $name: 'Programación Orientada a Objetos'
            },
            Schedule: {
                $start_time: '10:00',
                $end_time: '11:00',
                $day: 'Lunes'
            },
            Professor: {
                $name: 'Juan',
                $email: 'juan@email.com'
            }
        }
    },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);