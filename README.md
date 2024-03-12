# snake-mongoose-social

[![badge](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/mit)

## Description

A robust backend API for a social network web application, facilitating user authentication, friend connections, thought sharing, and reactions. Powered by Express.js, MongoDB, and Mongoose ODM.

## Installation

To install and run this API locally:

1. Clone this repository.

2. Install dependencies: `npm install`

3. (Optionally) Seed the database: `npm run seed`. This will execute the seeds/seed.js script which will insert sample user, thought and reaction (sub)documents into the db.

4. Start the server: `npm start`.

The API will now be running at [http://localhost:3000](http://localhost:3000).

- The seed data includes:

  - 3 sample users
  - 3 sample thoughts across the sample users
  - Reactions to the sample thoughts.
  
    - This will provide some initial data to test out the API endpoints.

## Usage

- Routes can be tested using Postman or Insomnia.
- The database can be seeded using the `seed.js` file.
- This API offers several endpoints for managing users, thoughts, reactions and friends:

  ### Users

- `/api/users`
  - GET: Retrieve all users.
  - GET `/:userId`: Retrieve a single user by ID (populated with thoughts and friends).
  - POST: Create a new user.
  - PUT `/:userId`: Update a user by ID.
  - DELETE `/:userId`: Delete a user by ID (also removes associated thoughts - BONUS).
- `/api/users/:userId/friends/:friendId`
  - POST: Add a friend to a user's friend list.
  - DELETE: Remove a friend from a user's friend list.

  ### Thoughts

- `/api/thoughts`
  - GET: Retrieve all thoughts.
  - GET `/:thoughtId`: Retrieve a single thought by ID.
  - POST: Create a new thought (adds ID to user's thoughts array).
  - PUT `/:thoughtId`: Update a thought by ID.
  - DELETE `/:thoughtId`: Delete a thought by ID.
- `/api/thoughts/:thoughtId/reactions`
  - POST: Create a reaction and store it in a thought's reactions array.
  - DELETE `/:reactionId`: Remove a reaction by its ID from a thought's reactions array.

### User Schema

- `username`: (String, Unique, Required, Trimmed) Represents the user's unique username.
- `email`: (String, Required, Unique) Stores the user's email address, ensuring uniqueness and validity.
- `thoughts`: (Array of _id references) An array containing references (using _id values) to Thought documents created by the user.
- `friends`: (Array of _id references) An array containing references (using _id values) to other User documents, representing the user's friend network.

- Virtual Field:

  - `friendCount`: (Virtual) A virtual field that automatically retrieves the length of the `friends` array, providing the user's friend count without additional queries.

### Thought Schema

- `thoughtText`: (String, Required) Stores the content of the thought, with a character limit between 1 and 280.
- `createdAt`: (Date) Represents the date and time the thought was created, automatically set to the current timestamp.
- `username`: (String, Required) References the username of the user who created the thought.
- `reactions`: (Array of Reaction subdocuments) An array containing nested Reaction documents associated with the thought.

- Virtual Field:

  - `reactionCount`: (Virtual) A virtual field that automatically retrieves the length of the `reactions` array, providing the thought's reaction count without additional queries.

### Reaction Schema (Subdocument)

- Note: This schema is not a separate model but is used within the Thought model's `reactions` array.

- `reactionId`: (ObjectId) A unique identifier for the reaction using Mongoose's ObjectId data type, automatically set to a new ObjectId.
- `reactionBody`: (String, Required) Stores the content of the reaction, with a character limit of 280.
- `username`: (String, Required) References the username of the user who created the reaction.
- `createdAt`: (Date) Represents the date and time the reaction was created, automatically set to the current timestamp.

## Demo

A video demo showcasing route functionality can be found [here](https://drive.google.com/file/d/1jFO4udv21wB_ZJR01VPZWrEOk6dPA4N-/view?usp=drive_link). Feel free to watch at 1.5x to 2x speed for a more natural pace.

## Credits

This app was created by [CookingMeister](https://github.com/CookingMeister) on criteria from the University of New Brunswick's [edX Coding Bootcamp](https://unb.ca/cel/bootcamps/coding.html) program. Program materials, [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose) and [Mongoose documentation](https://mongoosejs.com/) were referenced for this API.

## Questions

If you have an questions about this API, please contact me at [LinkedIn](https://www.linkedin.com/in/shawn-meister-bb646b29a/). More of my work can be viewed at [Github](https://github.com/CookingMeister).

## License

[![badge](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/mit)

This application is covered under the MIT license. See attached LICENSE file.
