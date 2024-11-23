// Custom React Hook for User Login
//
// This file defines a custom React hook, `useLogin`, which manages the login process. It includes:
// - State management for login errors and loading status.
// - A `login` function that sends a POST request to the login endpoint.
// - Updates the user context and local storage upon successful login.
// - Returns login function, loading status, and error information.

import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useLogin = () => {
  const [error, setError] = useState(null); // State to manage login errors
  const [isLoading, setIsLoading] = useState(null); // State to manage loading status
  const { dispatch } = useUserContext(); // Get the dispatch function from the user context

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    // Send a POST request to the login endpoint
    const response = await fetch("http://localhost:4000/api/userRoutes/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (response.status === 200) {
      // Save user data to local storage on successful login
      localStorage.setItem("user", JSON.stringify(json));

      // Update user context with login data
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      return true;
    } else {
      // Set error state if login fails
      setIsLoading(false);
      setError(json.error);
      return false;
    }
  };

  return { login, isLoading, error };
};
