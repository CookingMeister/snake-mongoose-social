/**
 * Connects to a MongoDB database using the provided URI.
 * Exports the database connection instance.
 */
import { connect, connection } from 'mongoose';

const uri = 'mongodb://127.0.0.1:27017/socialDB';

connect(uri);

export default connection;
