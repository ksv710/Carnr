//
//Card Component
//
//This React component displays a card with an image, title, description, and price.
// - `id`: Unique identifier for the car, used for navigation.
// - `imgSrc`: Source URL of the car's image.
// - `imgAlt`: Alternative text for the image.
// - `title`: Title of the car.
// - `description`: Brief description of the car.
// - `price`: Rental price of the car per day.
//
//When the card is clicked, it navigates to the detailed view of the car using its ID.
//The component also includes functionality to truncate long strings for both title and description.
//

import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Card.css";

// Card component definition
// This component displays a card with an image, title, description, and price
const Card = ({ id, imgSrc, imgAlt, title, description, price }) => {
  const navigate = useNavigate();

  // Function to handle card click event
  // Navigates to the car detail page based on the car's ID
  const handleCardClick = () => {
    navigate(`/car/${id}`);
  };

  // Function to truncate a string to a specified maximum length
  // If the string exceeds the maximum length, it appends "..." at the end
  const truncate = (str, maxLength) => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + "...";
  };

  return (
    // Card container with an onClick event to handle navigation
    <div className="card-container" onClick={handleCardClick}>
      {/* Image container */}
      <div className="card-img-container">
        {imgSrc && <img src={imgSrc} alt={imgAlt} className="card-img" />}
      </div>
      {/* Card content including title, description, and price */}
      <div className="card-content">
        <h2 className="card-title">{truncate(title, 50)}</h2>
        <p className="card-description">{truncate(description, 55)}</p>
        <div className="card-price">{`$${price} CAD day`}</div>
      </div>
    </div>
  );
};

export default Card;
