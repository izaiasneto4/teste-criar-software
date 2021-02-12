"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var yup = _interopRequireWildcard(_yup);
var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);

class ProductController {

  async index(req, res) {
    const products = await _Product2.default.findAll();

    return res.json({
      data: products
    })
  }

  async create(req, res) {
    const schema = yup.object().shape({
      title: yup.string().required(),
      price: yup.number().required().positive(),
      description: yup.string().required(),
      category: yup.string().required(),
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failed" });
    }

    const productExists = await _Product2.default.findOne({ where: { title: req.body.title } });

    if(productExists) {
      return res.status(400).json({ error: 'Product already exists' });
    }

    const { id, title, price, description, category } = await _Product2.default.create(req.body);

    return res.json({
      id,
      title,
      price,
      description,
      category,
    });
  }

  async read(req, res) {
    const product = await _Product2.default.findOne({ where: { id: req.params.id } });

    if(product) {
      return res.json({
        data: product
      })
    } else {
      return res.status(404).json({ error: 'Product not found' })
    }
  }

  async update(req, res) {
    const schema = yup.object.shape({
      title: yup.string().required(),
      price: yup.number().required().positive().float(),
      description: yup.string().required(),
      category: yup.string().required(),
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failed" });
    }

    const productExists = await _Product2.default.findOne({ where: { title: req.body.title } });

    if(productExists) {
      try {
        const  { title, price, description, category } = await productExists.update(req.body);
        return res.json({
          title,
          price,
          description,
          category,
        });
      } catch(e) {
        return res.json(500).json({ error: 'Could not update product' })
      }
    } else {
      return res.status(400).json({ error: 'Product does not exist' });
    }
  }

  async delete(req, res) {
    const product = await _Product2.default.findOne({ where: { id: req.params.id } });

    if(product) {
      const { id, title } = product;
      try {
        await product.destroy();

        return res.json({
          data: "Product deleted successfully"
        })
      } catch(e) {
        return res.status(500).json({
          data: "Product could not be deleted"
        })
      }
    } else {
      return res.status(404).json({ error: 'Product not found' })
    }
  }
}

exports. default = new ProductController();
