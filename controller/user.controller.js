const createError = require('http-errors');
const mongoose = require('mongoose');
const { User, Post } = require('./../models');

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    const newUserInstanse = new User(body);
    const createdUser = await newUserInstanse.save();

    if (createdUser) {
      return res.status(200).send({ data: createdUser });
    }

    next(createError(400, 'Bad request'));
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const foundUsers = await User.find().limit(3);

    res.status(200).send({ data: foundUsers });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    const foundUser = await User.findById(userId);
    if (foundUser) {
      return res.status(200).send({ data: foundUser });
    }
    next(createError(404, 'User not found'));
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const {
    params: { userId },
    body,
  } = req;

  try {
    // new:true -- возвращать новое (обновленное) значение
    // runValidators:true -- применять валидацию при обновлении
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, body, {
      new: true,
      runValidators: true,
    });

    if (updatedUser) {
      return res.status(200).send({ data: updatedUser });
    }
    next(createError(404, 'User not found'));
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const {
    params: { userId },
  } = req;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      return res.status(200).send({ data: deletedUser });
    }
    next(createError(400, 'User not found'));
  } catch (err) {
    next(err);
  }
};

// POST на путь 'http://HOST:PORT/api/users/:userId/posts'
// создание поста конкретного юзера (если такой юзер есть)
module.exports.createUserPost = async (req, res, next) => {
  const {
    params: { userId },
    body,
  } = req;

  try {
    const foundUser = await User.findById(userId);
    if (foundUser) {
      const newPostInstanse = new Post({
        ...body,
        userId: mongoose.Types.ObjectId(userId),
      });

      const createdPost = await newPostInstanse.save(newPostInstanse);
      if (createdPost) {
        return res.status(201).send(createdPost);
      }
      next(createError(400, 'Bad request'));
    }

    next(createError(404, 'User Not Found'));
  } catch (err) {
    next(err);
  }
};

// GET на путь 'http://HOST:PORT/api/users/:userId/posts'
// отравка постов конкретного юзера (если такой юзер есть)
module.exports.getUserPosts = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    const foundUser = await User.findById(userId);
    if (foundUser) {
      // aggregate (+ match, lookup, project)
      // работает аналогично aggregate в MongoDB:
      // - match - фильтр,
      // - lookup - соединение с документами другой коллекции по указанным критериям
      // - project - проекция (какие поля полученных документов включать в результат)
      const foundUserPosts = await User.aggregate()
        .match({ _id: mongoose.Types.ObjectId(userId) })
        .lookup({
          from: 'posts',
          localField: '_id',
          foreignField: 'userId',
          as: 'userPosts',
        })
        .project({ _id: 0, userPosts: { body: 1, createdAt: 1 } });
      res.status(200).send(foundUserPosts);
    }
    next(createError(404, 'User Not Found'));
  } catch (err) {
    next(err);
  }
};
