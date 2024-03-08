/**
 * Defines the User schema and model for the application.
 *
 * The schema defines the fields and constraints for User documents, including:
 * - username - Required, unique, trimmed string
 * - email - Required, unique, validated email string
 * - thoughts - Array of Thought references
 * - friends - Array of User references
 *
 * The schema also defines a virtual friendCount property to return the number of friends.
 *
 * The model provides an interface to the database for creating, querying, updating,
 * deleting User documents.
 */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) =>
          /^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w{2,3}$/.test(email),
        message: 'Please enter a valid email address',
      },
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    id: false,
  }
);
// Inherits 'this' from the surrounding schema definition
userSchema.virtual('friendCount', () => {
  return this.friends.length;
});

export default mongoose.model('User', userSchema);
