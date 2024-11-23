//
//LoginModal Component
//
//This React component displays a login modal using Bootstrap. The component provides:
// - A button to trigger the modal display.
// - A modal form for user login with email and password fields.
// - Functions to manage showing and hiding the modal.
// - Integration with a custom hook (`useLogin`) for handling login logic.
// - Error handling and loading state management during the login process.
// - A link to a sign-up modal for users who need to create a new account.
//
//The component utilizes Bootstrap for modal functionality and styling.
//

import React, { useState } from "react";
import { Modal } from "bootstrap";
import { useLogin } from "../../hooks/useLogin";
import SignUpModal from "./SignUpModal";
import "../Styles/LoginModal.css";

function LoginModal() {
  // Create a reference for the Bootstrap modal
  const modalRef = React.createRef();

  // Function to close the modal
  const handleClose = () => {
    const modal = Modal.getInstance(modalRef.current);
    modal.hide(); // Hide the modal when called
  };

  // Function to show the modal
  const handleShow = () => {
    const modal = new Modal(modalRef.current);
    modal.show(); // Show the modal when called
  };

  // State variables to manage email and password inputs
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  // Custom hook for handling login logic and state
  const { login, error, isLoading } = useLogin();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const modal = Modal.getInstance(modalRef.current);
    const res = await login(email, password); // Attempt to log in the user
    if (res) {
      modal.hide(); // Hide the modal if login is successful
    }
  };

  return (
    <>
      {/* Button to trigger the modal display */}
      <a href="#" className="nav-link" onClick={handleShow}>
        <button
          className="btn"
          style={{
            backgroundColor: "#324b5f",
            color: "#ffffff",
            borderColor: "#001f3f",
          }}
        >
          Log In
        </button>
      </a>

      {/* Modal component for user login */}
      <div
        className="modal fade"
        ref={modalRef} // Reference to the modal element
        id="loginModal"
        data-bs-backdrop="static" // Prevent closing the modal when clicking outside
        data-bs-keyboard="false" // Prevent closing the modal with keyboard events
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 id="loginModalLabel">CaRnR Login</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Login form */}
              <form className="login" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setemail(e.target.value)} // Update email state
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)} // Update password state
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading} // Disable button when loading
                  className="btn"
                  style={{
                    backgroundColor: "#324b5f",
                    color: "#ffffff",
                    borderColor: "#001f3f",
                  }}
                >
                  Submit
                </button>
                {error && <div className="error">{error}</div>}{" "}
                {/* Display error message if any */}
                <div className="sign-up-link">
                  <div onClick={handleClose}>
                    <span>Need an account? </span>
                    <SignUpModal /> {/* Link to the sign-up modal */}
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose} // Close the modal when clicked
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
