//userConext.js
//
// This file defines a UserContext and a reducer for managing user authentication state.
// It includes the context creation, reducer logic, and context provider component.

import { createContext, useReducer, useEffect } from "react";

// Create a context for user authentication
export const userContext = createContext();

// Reducer function to handle authentication actions
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // On login, update state with the user object from the action payload
      return { user: action.payload };
    case "LOGOUT":
      // On logout, clear the user from the state
      return { user: null };
    default:
      // Default case returns the current state if action type is unrecognized
      return state;
  }
};

// Context provider component to manage and provide authentication state
export const UserContextProvider = ({ children }) => {
  // Initialize state and dispatch function using the authReducer
  const [state, dispatch] = useReducer(authReducer, {
    user: null, // Initial state has no user
  });

  // Effect to load user from localStorage when component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      // Dispatch a LOGIN action if a user is found in localStorage
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  // Log the current context state for debugging
  console.log("userContext state: ", state);

  // Provide the context value to children components
  return (
    <userContext.Provider value={{ ...state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};
