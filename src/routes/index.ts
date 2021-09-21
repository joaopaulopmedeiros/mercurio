import { Router, Request, Response } from 'express';
const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  response.redirect('/docs');
});

routes.get('/contatos', (request: Request, response: Response) => {
  return response.json('hi');
});

export default routes;
