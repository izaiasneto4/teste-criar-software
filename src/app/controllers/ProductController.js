import * as yup from 'yup';
import Product from '../models/Product';

// title: Sequelize.STRING,
// price: Sequelize.FLOAT,
// description: Sequelize.TEXT,
// category: Sequelize.STRING,


class ProductController {

  async index(req, res) {
    const products = Product.findAll();

    return res.json({
      data: products
    })
  }

  async create(req, res) {
    const schema = yup.object.shape({
      title: yup.string().required(),
      price: yup.number().required().positive().float(),
      description: yup.string().required(),
      category: yup.string().required(),
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation failed" });
    }

    const productExists = await Product.findOne({ where: { title: req.body.title } });

    if(productExists) {
      return res.status(400).json({ error: 'Product already exists' });
    }

    const { title, price, description, category } = await Product.create(req.body);

    return res.json({
      title,
      price,
      description,
      category,
    });
  }

  async read(req, res) {

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

    const productExists = await Product.findOne({ where: { title: req.body.title } });

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

  }
}

export default new ProductController();
