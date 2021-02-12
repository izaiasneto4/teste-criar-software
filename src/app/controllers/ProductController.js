import * as yup from 'yup';
import Product from '../models/Product';

class ProductController {

  async index(req, res) {
    const products = await Product.findAll();

    return res.json(
      products
    )
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

    const productExists = await Product.findOne({ where: { title: req.body.title } });

    if(productExists) {
      return res.status(400).json({ error: 'Product already exists' });
    }

    const { id, title, price, description, category } = await Product.create(req.body);

    return res.json({
      id,
      title,
      price,
      description,
      category,
    });
  }

  async read(req, res) {
    const product = await Product.findOne({ where: { id: req.params.id } });

    if(product) {
      const { id, title, string, price, description, category } = product;
      return res.json({
        id,
        title,
        string, 
        price, 
        description, 
        category
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
    const product = await Product.findOne({ where: { id: req.params.id } });

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

export default new ProductController();
