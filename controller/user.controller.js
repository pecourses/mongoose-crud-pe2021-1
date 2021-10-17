const createError = require('http-errors');
const { User } = require('./../models');

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
    const updatedUser = await User.findByIdAndUpdate(userId, body);

    if (updatedUser) {
      return next();
      //return res.status(200).send({ data: updatedUser });
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
