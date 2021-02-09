import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ProductController from './app/controllers/ProductController';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.read);
routes.post('/products', ProductController.create);
routes.delete('/products/:id', ProductController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
