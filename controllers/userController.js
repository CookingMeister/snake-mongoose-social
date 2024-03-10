import { User } from '../models/index.js';

// Get Users
const getAllUsers = async (req, res) => {
  try {
    // Find method
    const users = await User.find({}).select('-__v');

    return res.status(200).json(users);
  } catch (err) {
    //  Handle Errors
    console.log(err);
    return res.status(500).json(err);
  }
};

// Create User
const createUser = async (req, res) => {
  try {
    // Create method
    const user = await User.create({
      ...req.body,
    });
    //  If user exists
    return user
      ? res.status(201).json({ message: 'User created successfully!' })
      : res.status(400).json({ message: 'Error: User not created!' });
  } catch (err) {
    //  Handle Errors
    console.log(err);
    return res.status(500).json(err);
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params; // Destructure to get userId
    // FindOne method
    const user = await User.findOne({ _id: userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts');

    return !user
      ? res.status(404).json({ message: 'No user found with this id!' })
      : res.status(200).json(user);
  } catch (err) {
    //  Handle Errors
    console.log(err);
    return res.status(500).json(err);
  }
};

// Update User by ID
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params; // Destructure to get userId
    //  Get updates from body
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
    //  Handle Errors
    console.error(err);
    return res.status(500).json({ message: 'Server error!' });
  }
};

//  Delete User
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params; // Destructure to get userId
    //   FindByIdAndDelete method
    const deletedUser = await User.findByIdAndDelete(userId);
    // add delete users thoughts here too
    return !deletedUser
      ? res.status(404).json({ message: 'User not found!' })
      : res.status(200).json({ message: 'User deleted successfully!' });
  } catch (err) {
    //  Handle Errors
    console.error(err);
    return res.status(500).json({ message: 'Server error!' });
  }
};

// Add Friend
const addFriend = async (req, res) => {
  const { userId, friendId } = req.params; // Destructure to get userId and friendId

  try {
    // Find the user and friend by their IDs
    const [user, friend] = await Promise.all([
      User.findById(userId),
      User.findById(friendId),
    ]);

    // Check if user and friend exist
    !user || !friend
      ? res.status(404).json({ message: 'User or friend not found!' })
      : // Check if they are already friends
      user.friends.includes(friendId) && friend.friends.includes(userId)
      ? res.status(400).json({ message: 'You are already friends!' })
      : null;

    /* Add mutual friendship
    * Add friend to user */ 
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { friends: friendId } },
      {
        new: true,
        runValidators: true
      }
    );
    // Add user to friend
    await User.findOneAndUpdate(
      { _id: friendId },
      { $push: { friends: userId } },
      {
        new: true,
        runValidators: true
      }
    );
    res.status(201).json({ message: 'Friend added successfully!' });
  } catch (err) {
    // Handle Errors
    console.error(err);
    res.status(500).json({ message: 'Server error!' });
  }
};

// Delete Friend

const deleteFriend = async (req, res) => {
  const { userId, friendId } = req.params; // Destructure to get userId and friendId

  // Check if friend ID exists
  if (!friendId) {
    return res.status(400).json({ message: 'Friend ID is required!' });
  }

  try {
    // Find the user and friend by their IDs
    const [user, friend] = await Promise.all([
      User.findById(userId),
      User.findById(friendId),
    ]);

    // Check if user and friend exist
    !user || !friend
      ? res.status(404).json({ message: 'User or friend not found!' })
      : // Check if they are friends
      !user.friends.includes(friendId)
      ? res.status(400).json({ message: 'You are not friends!' })
      : null;

    /* Remove mutual friendship
    * Remove friend from user */
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } },
      {
        new: true,
        runValidators: true
      }
    );
    // Remove user from friend
    await User.findOneAndUpdate(
      { _id: friendId },
      { $pull: { friends: userId } },
      {
        new: true,
        runValidators: true
      }
    );
    res.status(200).json({ message: 'Friend deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error!' });
  }
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
};
