//
//RedirectPage Component
//
//This React component displays a Snackbar with an error message indicating that the user needs to be logged in to access the page.
//The Snackbar is shown for 3 seconds before automatically closing and redirecting the user to the home page.
//
// - Uses the `useState` hook to manage the Snackbar's open state.
// - Utilizes the `useNavigate` hook from `react-router-dom` to handle navigation.
// - Includes a `useEffect` hook to set a timer for closing the Snackbar and redirecting.
//

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Define the RedirectPage component
const RedirectPage = () => {
  // useState hook to manage the open state of the Snackbar
  const [open, setOpen] = useState(true);
  // useNavigate hook to programmatically navigate
  const navigate = useNavigate();

  // Function to handle the closing of the Snackbar and redirect to the home page
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  // useEffect hook to set a timer that triggers the handleClose function after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => handleClose(), 3000);
    // Clean up the timer when the component unmounts or when navigate changes
    return () => clearTimeout(timer);
  }, [navigate]);

  // Render the Snackbar component with an Alert inside
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        You need to be logged in to access this page.
      </Alert>
    </Snackbar>
  );
};

// Export the RedirectPage component as default
export default RedirectPage;
