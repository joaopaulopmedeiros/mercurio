import { Router, Request, Response } from 'express';
import ContactController from '../controllers/ContactController';
const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  response.redirect('/docs');
});

routes.get('/contatos', ContactController.index);

routes.post('/contatos/importacao/csv', ContactController.importByCsv);

export default routes;
