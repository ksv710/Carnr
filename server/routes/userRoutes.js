// This file defines the routes related to user authentication and information retrieval in an Express.js application. It uses an Express Router instance to set up the following endpoints:

// - `POST /login`: Authenticates a user by handling login requests.
// - `POST /signup`: Registers a new user by handling signup requests.
// - `GET /:id`: Retrieves user details based on the provided user ID.

// The routes are connected to respective controller functions

import express from "express"; // Express framework for routing
import loginUser, {
  getUserById,
  signupUser,
} from "../controllers/userController.js"; // Importing controller functions

const router = express.Router(); // Create an Express Router instance

// Route to handle user login
router.post("/login", loginUser);

// Route to handle user signup
router.post("/signup", signupUser);

// Route to fetch user details by user ID
router.get("/:id", getUserById);

// Export the router instance for use in other parts of the application
export default router;
