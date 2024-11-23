//
//SignUpModal Component
//
//This React component renders a modal for user sign-up. It uses React-Bootstrap's Modal, Button, and Form components to create a sign-up form. The modal can be toggled via a button, and it includes fields for first name, last name, email, and password.
//
//Key Features:
// - Manages modal visibility with useState hooks.
// - Collects user input for sign-up through form fields.
// - Submits the form using the custom `useSignup` hook.
// - Displays loading state and error messages.
// - Styled with inline CSS and Bootstrap classes.
//
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSignup } from "../../hooks/useSignup";

const SignUpModal = () => {
  // useState hooks to manage the component's state
  const [show, setShow] = useState(false); // State for controlling the visibility of the modal
  const handleClose = () => setShow(false); // Function to close the modal
  const handleShow = () => setShow(true); // Function to show the modal

  // useState hooks to manage the form input values
  const [first, setFirst] = useState(""); // State for first name input
  const [last, setLast] = useState(""); // State for last name input
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input

  // Destructuring signup, error, and isLoading from the useSignup custom hook
  const { signup, error, isLoading } = useSignup();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.time("Signup");
    const res = await signup(first, last, email, password); // Call signup function from the hook
    console.timeEnd("Signup");
    if (res) {
      handleClose(); // Close the modal if signup is successful
    }
  };

  return (
    <>
      {/* Button to trigger the modal */}
      <a href="#" className="nav-link" onClick={handleShow}>
        <button
          className="btn"
          style={{
            backgroundColor: "#324b5f",
            color: "#ffffff",
            borderColor: "#001f3f",
          }}
        >
          Sign Up
        </button>
      </a>

      {/* Modal component */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up to CaRnR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form component */}
          <Form onSubmit={handleSubmit}>
            {/* First Name input */}
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                value={first}
                onChange={(e) => setFirst(e.target.value)} // Update First name state
              />
            </Form.Group>
            {/* Last Name input */}
            <Form.Group controlId="formLastName" className="mt-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                value={last}
                onChange={(e) => setLast(e.target.value)} // Update last name state
              />
            </Form.Group>
            {/* Email input */}
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else (example
                abc@xyz.com).
              </Form.Text>
            </Form.Group>
            {/* Password input */}
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update Password state
              />
              <Form.Text className="text-muted">
                Should contain one uppercase, one lowercase, one special
                character, and one number.
              </Form.Text>
            </Form.Group>
            {/* Submit button */}
            <Button
              variant="primary"
              type="submit"
              className="mt-4"
              disabled={isLoading} // Disable button if isLoading is true
              style={{
                backgroundColor: "#324b5f",
                color: "#ffffff",
                borderColor: "#001f3f",
              }}
            >
              Create Account
            </Button>
            {/* Error message display */}
            {error && <div className="error mt-3">{error}</div>}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpModal;
