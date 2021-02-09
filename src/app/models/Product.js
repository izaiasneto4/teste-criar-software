import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        price: Sequelize.FLOAT,
        description: Sequelize.TEXT,
        category: Sequelize.STRING,
     },
      {
        sequelize,
      }
    );

    return this;
  }

//  static associate(models) {
//  }
}

export default Product;
