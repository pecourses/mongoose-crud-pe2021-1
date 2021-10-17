const { Router } = require('express');
const { userController } = require('../controller');

const userRouter = Router();

userRouter
  .route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

userRouter
  .route('/:userId')
  .get(userController.getUserById)
  .patch(userController.updateUserById, userController.getUserById)
  .delete(userController.deleteUserById);

module.exports = userRouter;
