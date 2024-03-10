# snake-mongoose-social

[![badge](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/mit)

## Description

A robust backend API for a social network web application, facilitating user authentication, friend connections, thought sharing, and reactions. Powered by Express.js, MongoDB, and Mongoose ODM.

## Usage

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

## Installation

## Credits

This app was created by [CookingMeister](https://github.com/CookingMeister) on criteria from the University of New Brunswick's [edX Coding Bootcamp](https://unb.ca/cel/bootcamps/coding.html) program. Program materials, [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose) and [Mongoose documentation](https://mongoosejs.com/) were referenced for this API.

## License

[![badge](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/mit)

This application is covered under the MIT license. See attached LICENSE file.
