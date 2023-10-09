const express = require('express');
const app = express();
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerDocument = require('./swagger-output.json');

//routes
const studentsRoutes = require('./api/students-routes');
const loginRoutes = require('./api/auth/login-routes');

require('dotenv').config();

const port = process.env.EXPO_PUBLIC_EXPRESS_PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', router);
router.use('/', studentsRoutes, loginRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = router;