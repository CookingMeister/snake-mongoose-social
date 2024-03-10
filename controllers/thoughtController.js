import { Thought, User } from '../models/index.js';

// Get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    //  Find method
    const thoughts = await Thought.find()
      .sort({ createdAt: 'desc' }) // Sort by creation date descending
      .populate('reactions'); // Populate reactions with associated data

    return res.status(200).json(thoughts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error!' });
  }
};

// Get a single thought by ID
const getThoughtById = async (req, res) => {
  try {
    const { thoughtId } = req.params; //  Destructure to get thoughtId
    //  FindById method
    const thought = await Thought.findById(thoughtId)
      .populate('reactions'); // Populate reactions with associated data

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
    const { thoughtText, username, userId } = req.body;   //  Destructure values
    const newThought = new Thought({ thoughtText, username });
    const savedThought = await newThought.save();

    //  If thought does not exist
    !savedThought
      ? console.error('Thought not created!')
      : null;      
    // Find one and update method
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { thoughts: savedThought._id } },  //  Add to thoughts array
      {
        new: true,  // Return the updated user document
        runValidators: true // Run validators on update
      } 
    );
    //  If user does not exist
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
    const { thoughtId } = req.params; //  Destructure values
    const { thoughtText } = req.body;
    // FindByIdAndUpdate method
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },  // Update only the specified field
      {
        new: true,      // Return updated document and run validators
        runValidators: true,  // Run validators on update
      }
    );

    return updatedThought
      ? res.status(201).json({ message: 'Thought updated successfully!' })
      : res.status(404).json({ message: 'Thought not found!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error!' });
  }
};

// Delete a thought by ID
const deleteThought = async (req, res) => {
  try {
    const { thoughtId } = req.params; //  Destructure from params
    // Find by ID and Delete method
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);

    return !deletedThought  //  If deleted thought does not exist
      ? res.status(404).json({ message: 'Thought not found!' })
      : res.status(200).json({ message: 'Thought deleted successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error!' });
  }
};

//  Add Reaction
const addReaction = async (req, res) => {
  try {
    const { thoughtId } = req.params;   // Destructure from params
    //  Find By Id And Update method
    const newReaction = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: req.body } },  // Update reaction field
      {
        new: true,  // Return updated document and run validators
        runValidators: true,  //  Run validators on update
      }
    );
    
    return newReaction  //  If newReaction exists
      ? res.status(201).json({ message: 'Reaction created successfully!' })
      : res.status(404).json({ message: 'Thought not found!' });
  } catch (err) {
    //  Handle Errors
    console.error(err);
    res.status(500).json({ message: 'Server error!' });
  }
};

// Delete Reaction
const deleteReaction = async (req, res) => {
  const { thoughtId, reactionId } = req.params; //  Destructure values from params

  try {
    // Find By Id And Update Method
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId: reactionId } } }, // Update reaction field
      { new: true } // Return the updated document
    );
    // Check if reaction was removed from array
    const reactionDeleted = thought.reactions.some(reaction => reaction.reactionId === reactionId)
    // If thought exists
    return thought
    ? !reactionDeleted  // If reaction was removed from array
      ? res.status(200).json({ message: 'Reaction deleted successfully!' })
      : res.status(404).json({ message: 'Error Deleting Reaction!' }) //  Reaction was not removed from array
    : res.status(404).json({ message: 'Thought not found!' });  //  Thought does not exist
  } catch (err) {
    //  Handle Errors
    console.error(err);
    res.status(500).json({ message: 'Server error!' });
  }
}

export {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction, 
  deleteReaction
};
