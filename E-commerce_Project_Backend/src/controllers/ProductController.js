const ProductModel = require("../models/ProductModel");

const {
  createFactory,
  getAllFactory,
  getByIdFactory,
  updateByIdFactory,
  deleteByIdFactory,
} = require("../utils/crudFactory");

/******************products************************/

const createProductHandler = createFactory(ProductModel);
const getAllProductHandler = getAllFactory(ProductModel);
const getProductById = getByIdFactory(ProductModel);
const updateProductById = updateByIdFactory(ProductModel);
const deleteProductById = deleteByIdFactory(ProductModel);

module.exports = {
  createProductHandler,
  getAllProductHandler,
  getProductById,
  updateProductById,
  deleteProductById,
};
