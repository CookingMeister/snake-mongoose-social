import User from '../models/index.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    };

export { getAllUsers, getUserById, createUser };