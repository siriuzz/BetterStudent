const express = require('express');
const app = express();
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerDocument = require('./swagger-output.json');

//routes
const studentsRoutes = require('./api/students');
const userRoutes = require('./api/user');
const careerRoutes = require('./api/careers');
const reviewRoutes = require('./api/reviews');
const friendsRoutes = require('./api/friends');
const professorRoutes = require('./api/professors');
const subjectRoutes = require('./api/subjects');
const sectionRoutes = require('./api/sections');

require('dotenv').config();

const port = process.env.EXPO_PUBLIC_EXPRESS_PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', router);
router.use('/',
    studentsRoutes,
    userRoutes,
    careerRoutes,
    reviewRoutes,
    friendsRoutes,
    professorRoutes,
    subjectRoutes,
    sectionRoutes
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = router;