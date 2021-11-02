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
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

// создать пост конкретного юзера
userRouter.post('/:userId/posts', userController.createUserPost);
// получить посты конкретного юзера
userRouter.get('/:userId/posts', userController.getUserPosts);

module.exports = userRouter;
