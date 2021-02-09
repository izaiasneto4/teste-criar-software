import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ProductController from './app/controllers/ProductController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  return res.json({
    "hello": "world"
  })
})

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.read);
routes.post('/products', ProductController.create);
routes.delete('/products/:id', ProductController.delete);

export default routes;
