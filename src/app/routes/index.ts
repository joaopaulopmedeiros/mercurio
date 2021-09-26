import { Router, Request, Response } from 'express';
import multer from 'multer';
import ContactController from '../controllers/ContactController';
import uploadConfig from '../../infra/upload';

const routes = Router();

const upload = multer(uploadConfig.config.multer);

routes.get('/', (request: Request, response: Response) => {
  response.redirect('/docs');
});

routes.get('/contatos', ContactController.index);

routes.post('/contatos/importacao/csv', upload.single('file'), ContactController.importByCsv);

export default routes;
