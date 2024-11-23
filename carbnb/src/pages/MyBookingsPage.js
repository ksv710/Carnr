//
//MyBookings Component
//
//This component fetches and displays a list of booked cars. It uses the custom hook `useFetchBookedCars`
//to retrieve the data and handles loading and error states. Each car is presented as a link, which
//directs the user to a detailed view of the car.
//

import React from "react";
import { useFetchBookedCars } from "../hooks/useGetBooked"; // Custom hook for fetching booked cars
import { Link } from "react-router-dom"; // Link component for navigation
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS for default styling
import "../components/Styles/Listings.css"; // Custom CSS for component-specific styles

const MyBookings = () => {
  // Destructure the result from the custom hook
  const { Bookings, isLoading, error } = useFetchBookedCars();

  return (
    <div className="page">
      {/* Display loading message while fetching data */}
      {isLoading && <p>Loading cars...</p>}
      {/* Display error message if there is an issue with fetching data */}
      {error && <p>{error}</p>}
      <div className="Listings">
        {/* Map over the list of booked cars and display each one */}
        {Bookings.map((car) => (
          <Link key={car._id} to={`/car/${car._id}`} className="listing-link">
            <div className="listing-item">
              {/* Display car image */}
              <img
                className="listing-image"
                src={`${car.photo}`}
                alt={`${car.make} ${car.model}`}
              />
              <div className="listing-details">
                {/* Display car make, model, and year */}
                <h3>{`${car.make} ${car.model} - ${car.year}`}</h3>
                {/* Display car description */}
                <p>{car.description}</p>
                {/* Display car daily rate */}
                <p
                  style={{
                    color: "#324b5f",
                    fontSize: "1.2 rem",
                    fontWeight: "bold",
                  }}
                >
                  ${car.dailyRate} CAD day
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
