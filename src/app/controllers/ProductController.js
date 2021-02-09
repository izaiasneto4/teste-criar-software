import * as yup from 'yup';
import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    const products = Product.findAll();

    return res.json({
      data: products
    })
  }

  async create(req, res) {

  }

  async read(req, res) {

  }

  async update(req, res) {

  }

  async delete(req, res) {

  }
}

export default new ProductController();
