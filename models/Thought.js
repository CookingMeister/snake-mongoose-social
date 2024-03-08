/**
 * Defines a Mongoose schema and model for thoughts.
 *
 * The schema defines the structure of thought documents, including required fields
 * thoughtText, username, and optional field for embedded document reactions.
 *
 * Virtual property reactionCount is defined.
 * Helper method formattedCreatedAt is used.
 *
 * The Thought model provides an interface to interact with the thoughts collection in MongoDB.
 */
import mongoose from 'mongoose';
import reactionSchema from '../models/Reaction.js';
import formatDate from '../utils/formatDate.js';

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

export default mongoose.model('Thought', thoughtSchema);
