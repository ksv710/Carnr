//
//SnackbarAlert Component
//
//his React component displays a Snackbar with an Alert inside it.
// - Uses Material-UI's Snackbar and Alert components for showing error messages.
// - The `open` prop controls whether the Snackbar is visible.
// - The `message` prop specifies the text to be displayed in the Alert.
// - The `onClose` prop is a callback function that handles closing the Snackbar.
//

import React from "react"; // Importing React library
import Snackbar from "@mui/material/Snackbar"; // Importing Snackbar component from Material-UI
import MuiAlert from "@mui/material/Alert"; // Importing Alert component from Material-UI

/*
 * SnackbarAlert component displays a Snackbar with an Alert inside it.
 */
const SnackbarAlert = ({ open, message, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <MuiAlert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackbarAlert; // Exporting the SnackbarAlert component
