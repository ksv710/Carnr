// Custom hook for user signup functionality
//
// This file defines a custom React hook `useSignup` which provides
// functionality for user signup. It includes:
// - State management for error messages and loading status.
// - A `signup` function that sends a POST request to the server
//   for user registration and updates state based on the response.
// - Interaction with a user context for dispatching a login action
//   upon successful signup.
import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useSignup = () => {
  // State for storing error messages
  const [error, setError] = useState(null);

  // State for managing the loading status
  const [isLoading, setIsLoading] = useState(null);

  // Get the dispatch function from the user context
  const { dispatch } = useUserContext();

  // Async function to handle user signup
  const signup = async (first, last, email, password) => {
    setIsLoading(true);
    setError(null);

    // Send a POST request to the signup endpoint
    const response = await fetch(
      "http://localhost:4000/api/userRoutes/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first, last, email, password }),
      }
    );

    // Parse the response as JSON
    const json = await response.json();

    // If the response is successful (status 200)
    if (response.status === 200) {
      setIsLoading(false);
      setError(null);
      localStorage.setItem("user", JSON.stringify(json)); // Store user data in local storage

      // Dispatch a login action with the user data
      dispatch({ type: "LOGIN", payload: json });

      return true; // Return true indicating successful signup
    } else {
      setIsLoading(false); // Set loading state to false
      setError(json.error); // Set error state with the error message from the response

      return false; // Return false indicating unsuccessful signup
    }
  };

  // Return the signup function and the states
  return { signup, isLoading, error };
};
