import express from 'express';
import db from './config/connection';
import routes from './routes';

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use Routes
app.use(routes);

// Connect to the Mongo DB and start Server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
