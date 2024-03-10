/**
 * Connects to a MongoDB database using the provided URI.
 * Uses Mongoose v.8+ so no need to set useNewUrlParser, useUnifiedTopology options.
 * Exports the database connection instance.
 */
import pkg from 'mongoose';
const { connect, connection } = pkg;

const uri = 'mongodb://127.0.0.1:27017/socialDB';

connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

export default connection;
