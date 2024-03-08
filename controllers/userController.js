import User from '../models/index.js';

const getAllUsers = async (req, res) => {
  try {
    // Find method
    const users = await User.find({}).select('-__v');

    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    // Create method
    const user = await User.create({
      ...req.body,
    });
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    // FindOne method
    const user = await User.findOne({ _id: req.params.userId })
      .select('-__v');
    //   .populate('friends')
    //   .populate('thoughts');

    return !user
      ? res.status(404).json({ message: 'No user found with this id!' })
      : res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    //  FindByIdAndUpdate method
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true, // Return the updated document
      runValidators: true, // Run model validators on update
    });

    return !updatedUser
      ? res.status(404).json({ message: 'User not found!' })
      : res.status(200).json(updatedUser);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error!' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    //    FindByIdAndDelete method
    const deletedUser = await User.findByIdAndDelete(userId);

    return !deletedUser
      ? res.status(404).json({ message: 'User not found!' })
      : res.status(200).json({ message: 'User deleted successfully!' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error!' });
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
