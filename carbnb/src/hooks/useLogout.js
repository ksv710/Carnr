// Custom Hook: useLogout
//
// This file defines a custom hook, `useLogout`, which provides a function to handle user logout.
// - `useLogout` utilizes the `useUserContext` hook to access the user context's dispatch function.
// - The `logout` function removes user data from local storage and dispatches a "LOGOUT" action to update the context.
//
// This hook can be used in components to manage user logout functionality.

import { useUserContext } from "./useUserContext";

export const useLogout = () => {
  const { dispatch } = useUserContext();

  // Function to handle user logout
  const logout = () => {
    // Remove the user data from local storage
    localStorage.removeItem("user");
    // Dispatch the logout action to the user context
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
