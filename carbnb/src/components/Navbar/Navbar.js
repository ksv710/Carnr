//
//NavBar Component
//
//This React component renders the navigation bar for the application. It includes:
// - Responsive design with a collapsible menu for smaller screens.
// - Navigation links that smoothly scroll to different sections of the homepage.
// - Conditional rendering of user-specific content based on authentication status:
// - Logged-in users see a dropdown menu with options for profile management and logout.
// - Guests see login and signup modals.
// - Includes styling for the custom dropdown toggle.
//
import React from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useUserContext } from "../../hooks/useUserContext";
import { Link as ScrollLink } from "react-scroll";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import CustomUserIcon from "./user.png";

// Define the NavBar functional component
const NavBar = () => {
  // Destructure logout function from useLogout custom hook
  const { logout } = useLogout();
  // Destructure user object from useUserContext custom hook
  const { user } = useUserContext();
  // Get the current location using useLocation hook
  const location = useLocation();
  // Get the navigate function from useNavigate hook
  const navigate = useNavigate();

  // Define the handleLogout function to log the user out and navigate to the home page
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Navbar toggler button for responsive design */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Link to home page with logo */}
        <RouterLink to="/" className="navbar-brand" aria-current="page">
          <img
            src={require("./logo.png")}
            alt="logo"
            style={{ height: "52px", marginLeft: "75px" }}
          />
        </RouterLink>
        <div className="collapse navbar-collapse" id="navbarText">
          {/* Show navigation links only on the home page */}
          {location.pathname === "/" && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* ScrollLink to smoothly scroll to the 'about' section */}
                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  About
                </ScrollLink>
              </li>
              <li className="nav-item">
                {/* ScrollLink to smoothly scroll to the 'services' section */}
                <ScrollLink
                  to="services"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Services
                </ScrollLink>
              </li>
              <li className="nav-item">
                {/* ScrollLink to smoothly scroll to the 'testimonials' section */}
                <ScrollLink
                  to="testimonials"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Testimonials
                </ScrollLink>
              </li>
              <li className="nav-item">
                {/* ScrollLink to smoothly scroll to the 'contact' section */}
                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Contact
                </ScrollLink>
              </li>
            </ul>
          )}
          <div className="d-flex align-items-center ms-auto">
            {/* If the user is logged in, show the dropdown menu */}
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-basic"
                  className="custom-dropdown-toggle"
                >
                  <img
                    src={CustomUserIcon}
                    alt="User Icon"
                    style={{ width: "38px", height: "38px" }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.ItemText>
                    {user.first} {user.last}
                  </Dropdown.ItemText>
                  <Dropdown.Divider />
                  <Dropdown.Item as={RouterLink} to="/my-listings">
                    My Listings
                  </Dropdown.Item>
                  <Dropdown.Item as={RouterLink} to="/my-bookings">
                    My Bookings
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              // If the user is not logged in, show the login and signup modals
              <>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <LoginModal />
                  </li>
                  <li className="nav-item">
                    <SignUpModal />
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .custom-dropdown-toggle::after {
          display: none !important;
        }
      `}</style>
    </nav>
  );
};

// Export the NavBar component as the default export
export default NavBar;
