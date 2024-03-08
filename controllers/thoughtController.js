import { Thought, User } from '../models/index.js';

// Get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    //  Find method
    const thoughts = await Thought.find()
      .sort({ createdAt: 'desc' }); // Sort by creation date descending
    // .populate('reactions'); // Populate reactions with associated data
    return res.status(200).json(thoughts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error!' });
  }
};

// Get a single thought by ID
const getThoughtById = async (req, res) => {
  try {
    //  FindById method
    const { thoughtId } = req.params;
    const thought = await Thought.findById(thoughtId);
    // .populate('reactions'); // Populate reactions with associated data

    return !thought
      ? res.status(404).json({ message: 'Thought not found!' })
      : res.json(thought);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error!' });
  }
};

// Create a new thought
const createThought = async (req, res) => {
  try {
    const { thoughtText, username, userId } = req.body;
    const newThought = new Thought({ thoughtText, username });
    const savedThought = await newThought.save();

    !savedThought
      ? console.error('Thought not created!')
      : null;
      
    // Find the user and push the created thought's ID to their thoughts array
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { thoughts: savedThought._id } },
      { new: true } // Return the updated user document
    );

    return !user
      ? res.status(404).json({ message: 'User not found!' })
      : res.status(201).json(savedThought);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error!' });
  }
};

// Update a thought by ID
const updateThought = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },  // Update only the specified field
      {
        new: true,      // Return updated document and run validators
        runValidators: true,
      }
    );

    return updatedThought
      ? res.status(201).json(updatedThought)
      : res.status(404).json({ message: 'Thought not found' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


// Delete a thought by ID
const deleteThought = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);

    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found!' });
    }

    // Additional logic here

    return res.status(200).json({ message: 'Thought deleted successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


export { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought };
