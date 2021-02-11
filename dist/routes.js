"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _ProductController = require('./app/controllers/ProductController'); var _ProductController2 = _interopRequireDefault(_ProductController);
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);

const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default);

routes.get('/api/products', _ProductController2.default.index);
routes.get('/api/products/:id', _ProductController2.default.read);
routes.post('/api/products', _ProductController2.default.create);
routes.delete('/api/products/:id', _ProductController2.default.delete);

routes.post('/files', upload.single('file'), _FileController2.default.store);

exports. default = routes;
