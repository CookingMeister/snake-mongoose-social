import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';

db.once('open', async () => {
  // Delete existing documents
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create sample users
  const users = [
    {
      username: 'uncleJohn',
      email: 'john@email.com',
    },
    {
      username: 'auntJane',
      email: 'jane@email.com',
    },
    {
      username: 'uncleBob',
      email: 'bob@email.com',
    },
  ];

  const createdUsers = await User.collection.insertMany(users);
  const userIdsArray = Object.values(createdUsers.insertedIds); //  Get Array of ObjectIds
  const textArray = [
    'Here is a sample thought',
    'Here is a second sample thought',
    'Uncle John and Aunt Jane are the best!',
  ];

  // Create thoughts and update users
  for (let i = 0; i < userIdsArray.length; i++) {
    const userId = userIdsArray[i];
    const username = users[i].username;

    const thought = {
      thoughtText: textArray[i],
      username,
      userId,
    };

    const createdThought = await Thought.create(thought);

    // Update user after thought creation
    await User.updateOne(
      { _id: userId },
      { $push: { thoughts: createdThought._id } }
    );
  }

  // Add reactions to thoughts
  await Thought.updateOne(
    { thoughtText: 'Here is a sample thought' },
    {
      $push: {
        reactions: { reactionBody: 'Great thought!', username: 'auntJane' },
      },
    }
  );

  await Thought.updateOne(
    { thoughtText: 'Here is a second sample thought' },
    {
      $push: { reactions: { reactionBody: 'Love it!', username: 'uncleJohn' } },
    }
  );

  console.log('Database seeded!');

  process.exit(0);
});
