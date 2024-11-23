//
//UserModel.js
//
// This file defines the schema and model for user management using Mongoose.
// It includes methods for user signup and login with validation and password hashing.
//
// - `userSchema`: Mongoose schema defining the user structure, including fields for first name, last name, email, and password.
// - `signup`: Static method for creating a new user. Validates input, checks for existing email, hashes the password, and saves the user to the database.
// - `login`: Static method for authenticating a user. Validates input, checks if the user exists, and compares the provided password with the stored hashed password.
//
// Used Tools:
// - mongoose: MongoDB object modeling tool.
// - bcrypt: Library for hashing passwords.
// - validator: Library for input validation.
//

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

// Define the Schema class from mongoose
const Schema = mongoose.Schema;

// Create a schema for the User model
const userSchema = new Schema({
  first: {
    type: String,
    required: true,
  },

  last: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static method to handle user login
userSchema.statics.login = async function (email, password) {
  // Check if all required fields are provided
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // Find user by email
  const user = await this.findOne({ email });

  // Check if user exists
  if (!user) {
    throw Error("Email Incorrect");
  }

  // Compare provided password with stored hash
  const match = await bcrypt.compare(password, user.password);

  // Check if password matches
  if (!match) {
    throw Error("Password Incorrect");
  }

  return user;
};

// Create the User model using the schema and export it
const User = mongoose.model("User", userSchema);
export default User;
