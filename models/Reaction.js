/**
 * Reaction schema for Mongoose.
 * Defines the structure of reaction documents in MongoDB.
 * Includes fields for reaction ID, username, reaction body, and created at timestamp.
 * Helper method formattedCreatedAt is used.
 */
import mongoose from 'mongoose';
import formatDate from '../utils/formatDate.js';

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

export default reactionSchema;
