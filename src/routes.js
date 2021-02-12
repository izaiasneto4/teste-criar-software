import { Router } from 'express';

import ProductController from './app/controllers/ProductController';

const routes = new Router();

routes.get('/api/products', ProductController.index);
routes.get('/api/products/:id', ProductController.read);
routes.post('/api/products', ProductController.create);
routes.delete('/api/products/:id', ProductController.delete);

export default routes;
