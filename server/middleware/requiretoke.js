//
//Middleware function to verify the JSON Web Token (JWT) in request headers.
//This middleware checks for the presence of a token, verifies it,
//and attaches the authenticated user's ID to the request object.
//
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const requiretoke = async (req, res, next) => {
  // Extract the token from the request headers
  const { toke } = req.headers;

  // Check if token is present in the headers
  if (!toke) {
    return res.status(401).json({ error: "missing token/login" });
  }

  // Extract the token part from the "Bearer" prefix
  const newToke = toke.split(" ")[1];

  try {
    // Verify the token using a secret key from environment variables
    const { _id } = jwt.verify(newToke, process.env.SECRET);

    // Find the user by ID and attach the user ID to the request object
    req.user = await User.findOne({ _id }).select("_id");
    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Log the error and send an unauthorized response if token verification fails
    console.log(error);
    res.status(401).json({ error: "Not Authorized/failed verification" });
  }
};

// Export the middleware function for use in other parts of the application
export default requiretoke;
