import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../swagger.json';
import routes from '../../app/routes';

class HttpConnectionManager {
  initializeConnection() {
    const app = express();
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(cors());
    app.use(express.json());
    app.use(routes);
    app.listen(3333);
  }
}

export default HttpConnectionManager;
