import db from '../config/connection.js';
import { User, Thought} from '../models/index.js';

db.once('open', async () => {

  // Delete existing documents
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create sample users
  const users = [
    {
      username: 'uncleJohn',
      email: 'john@email.com'
    },
    {
      username: 'auntJane',
      email: 'jane@email.com'
    },
    {
      username: 'uncleBob',
      email: 'bob@email.com'
    }
  ];

  await User.collection.insertMany(users);

  // Create sample thoughts
  const thoughts = [
    {
      thoughtText: 'Here is a sample thought',
      username: 'uncleJohn'
    },
    {
      thoughtText: 'Here is a second sample thought',
      username: 'auntJane'
    },
    {
      thoughtText: 'Uncle John and Aunt Jane are the best!',
      username: 'uncleBob'
    }
  ];

  await Thought.collection.insertMany(thoughts);

  // Add reactions to thoughts
  await Thought.updateOne(
    {thoughtText: 'Here is a sample thought'}, 
    {$push: {reactions: {reactionBody: 'Great thought!', username: 'auntJane'}}}
  );

  await Thought.updateOne(
    {thoughtText: 'Here is a second sample thought'},
    {$push: {reactions: {reactionBody: 'Love it!', username: 'uncleJohn'}}}
  );

  console.log('Database seeded!');

  process.exit(0);
});
