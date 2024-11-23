//
//Main Application Component
//
//This file defines the main component for the React application where routing is configured. It includes:
//- Setting up routing using React Router to manage navigation between different pages.
//- Rendering the NavBar component for navigation.
//- Configuring routes for pages such as Home, Find Cars, Rent Car, List a Car, Car Detail, My Listings, and My Bookings.
//- Implementing conditional rendering for certain routes based on user authentication status.
//

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

// Importing components and pages used in the application
import NavBar from "./components/Navbar/Navbar";
import Home from "./pages/HomePage";
import FindCars from "./pages/FindCarsPage";
import CarPage from "./pages/RentCarPage";
import CarDetail from "./pages/CarDetailPage";
import ListACarPage from "./pages/ListACarPage";
import { useUserContext } from "./hooks/useUserContext";
import MyListings from "./pages/MyListingsPage";
import MyBookings from "./pages/MyBookingsPage";
import RedirectPage from "./components/Navigation/RedirectPage";

// Main App component where routing is configured
function App() {
  // Destructuring user from custom hook to manage user authentication
  const { user } = useUserContext();

  return (
    // Wrapping the application in Router to enable routing
    <Router>
      <div>
        {/* Rendering the navigation bar component */}
        <NavBar />
        {/* Configuring routes for different pages of the application */}
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<Home />} />

          {/* Route for the Find Cars page */}
          <Route path="FindCars" element={<FindCars />} />

          {/* Route for the Rent Car page */}
          <Route path="CarPage" element={<CarPage />} />

          {/* Route for listing a car, requires user authentication */}
          <Route
            path="/ListACarPage"
            element={user ? <ListACarPage /> : <RedirectPage />}
          />

          {/* Route for car detail page, dynamic route based on car ID */}
          <Route path="/car/:id" element={<CarDetail />} />

          {/* Route for displaying user's car listings */}
          <Route path="/my-listings" element={<MyListings />} />

          {/* Route for displaying user's bookings */}
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
