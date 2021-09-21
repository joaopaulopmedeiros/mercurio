import { Router, Request, Response } from 'express';
const routes = Router();

routes.get('/contatos', (req: Request, resp: Response) => {
  return resp.json('hi');
});

export default routes;
