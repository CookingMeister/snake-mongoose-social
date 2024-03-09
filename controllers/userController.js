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
    return res.status(201).json(user);
  } catch (err) {
    //  Handle Errors
    console.log(err);
    return res.status(500).json(err);
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    // FindOne method
    const user = await User.findOne({ _id: req.params.userId })
      .select('-__v')
    //   .populate('friends')
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
  try {   //  Get userId from params
    const { userId } = req.params;
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
    //  Get userId from params
    const { userId } = req.params;
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
  //  Get userId and friendId from params
  const { userId, friendId } = req.params;

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

    // Add mutual friendship to friends arrays
    user.friends.push(friendId);
    friend.friends.push(userId);
    // Save user and friend updates
    await user.save();
    await friend.save();

    res.json({ message: 'Friend added successfully!' });
  } catch (err) {
    // Handle Errors
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Friend

export { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend };
