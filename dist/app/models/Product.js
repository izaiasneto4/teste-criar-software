"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Product extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        title: _sequelize2.default.STRING,
        price: _sequelize2.default.FLOAT,
        description: _sequelize2.default.TEXT,
        category: _sequelize2.default.STRING,
     },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

exports. default = Product;
