import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import routes from './api/routes/index';
import ConnectionManager from './infra/database/mongodb/ConnectionManager';

//mongodb
const mongodbConnectionManager = new ConnectionManager();
mongodbConnectionManager.initializeMongoDBConnection();

//http
const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333);
