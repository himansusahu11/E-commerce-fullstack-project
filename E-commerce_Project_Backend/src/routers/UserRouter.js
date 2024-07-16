const express = require("express");
const UserRouter = express.Router();

const {
  createuserHandler,
  getAllUserHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
} = require("../controllers/UserController");

const { checkInput } = require("../controllers/middleWares");
const {
  isAdminMiddleWare,
  protectRouteMiddleWare,
} = require("../controllers/AuthController");

/***********routes**************/
/**********users*****/

UserRouter.use(protectRouteMiddleWare);

UserRouter.get("/", isAdminMiddleWare, getAllUserHandler);

// chaining
UserRouter.post("/", checkInput, isAdminMiddleWare, createuserHandler);
UserRouter.get("/:id", getUserByIdHandler);
UserRouter.put("/:id", isAdminMiddleWare, updateUserByIdHandler);
UserRouter.delete("/:id", isAdminMiddleWare, deleteUserByIdHandler);

module.exports = UserRouter;
