const {
  createFactory,
  getAllFactory,
  getByIdFactory,
  updateByIdFactory,
  deleteByIdFactory,
} = require("../utils/crudFactory");

const UserModel = require("../models/UserModel");

const createuserHandler = createFactory(UserModel);
const getAllUserHandler = getAllFactory(UserModel);
const getUserByIdHandler = getByIdFactory(UserModel);
const updateUserByIdHandler = updateByIdFactory(UserModel);
const deleteUserByIdHandler = deleteByIdFactory(UserModel);

module.exports = {
  createuserHandler,
  getAllUserHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
};
