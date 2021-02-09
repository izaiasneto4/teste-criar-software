import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  return res.json({
    "hello": "world"
  })
})

export default routes;
