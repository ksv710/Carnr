// Custom hook to access the User Context
//
// This file defines a custom hook, `useUserContext`, that allows components
// to access the `userContext` using the `useContext` hook from React. If the
// context is not available, it throws an error. Otherwise, it returns the
// context object to be used by the component.
import { userContext } from "../context/userContext";
import { useContext } from "react";

// Custom hook to use the User Context
export const useUserContext = () => {
  // Retrieve the context using the useContext hook
  const context = useContext(userContext);

  // Check if the context is not available
  if (!context) {
    // Throw an error if the context is not found
    throw Error("User Context ERROR");
  }

  // Return the context if found
  return context;
};
