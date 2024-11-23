// MyListings Component
//
// This React component displays a list of car listings fetched from an API. It uses:
// - A custom hook, `useFetchListerCars`, to retrieve car data.
// - `Link` from `react-router-dom` for navigation to individual car details.
// - Bootstrap CSS and custom CSS for styling.
//
// The component renders:
// - A loading message while data is being fetched.
// - An error message if there is a problem with fetching data.
// - A list of car listings, each including an image, make, model, year, description, and daily rate.

import React from "react";
import { useFetchListerCars } from "../hooks/useCarListings"; // Import custom hook for fetching car listings
import { Link } from "react-router-dom"; // Import Link component for navigation
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS for styling
import "../components/Styles/Listings.css"; // Import custom CSS for styling the listings

const MyListings = () => {
  // Destructure the values returned from the useFetchListerCars hook
  const { listings, isLoading, error } = useFetchListerCars();

  return (
    <div className="page">
      {/* Display loading message while data is being fetched */}
      {isLoading && <p>Loading cars...</p>}
      {/* Display error message if there's an issue with fetching data */}
      {error && <p>{error}</p>}
      <div className="Listings">
        {/* Map over the car listings and render each one */}
        {listings.map((car) => (
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
                    fontSize: "1.2rem", 
                    fontWeight: "bold",
                  }}
                >
                  ${car.dailyRate} CAD day
                </p>
                {car.booked && (
                  <span className="booked-tag">Booked</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
