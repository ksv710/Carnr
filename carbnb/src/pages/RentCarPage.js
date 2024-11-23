//CarPage Component
//
//This component fetches and displays a list of cars available for rent.
//It includes functionality to sort the cars by price in ascending or descending order.
//The component shows a loading message while data is being fetched and an error message if an error occurs.

import "../components/Styles/CarPage.css";
import Card from "../components/Assets/Card";
import { useFetchCars } from "../hooks/usegetallCar";
import { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const CarPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");
  // Destructuring the result of useFetchCars hook
  const { cars, isLoading, error, setSortOrder } = useFetchCars(lat, lng); // Pass lat and lng to the hook

  // State to manage the sort option (ascending or descending)
  const [sortOption, setSortOption] = useState("asc");

  // Handles the sort option change between ascending and descending
  const handleSortChange = () => {
    // Toggle the sort order
    const newSortOrder = sortOption === "asc" ? "desc" : "asc";
    setSortOption(newSortOrder);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="page">
      <div className="sort-options">
        <label htmlFor="sort">Sort by price: </label>
        <button
          onClick={handleSortChange}
          className="sort-btn"
          aria-label={`Sort by price ${
            sortOption === "asc" ? "ascending" : "descending"
          }`}
        >
          {sortOption === "asc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
        </button>
      </div>
      {/* Display loading message while data is being fetched */}
      {isLoading && <p>Loading cars...</p>}
      {/* Display error message if an error occurs during fetching */}
      {error && <p>{error}</p>}
      <div className="cards-container">
        {/* Render a Card component for each car */}
        {cars.map((car) => (
          <Card
            key={car._id}
            id={car._id}
            imgSrc={`${car.photo}`}
            imgAlt={`${car.make} ${car.model}`}
            title={`${car.make} ${car.model} - ${car.year}`}
            description={car.description}
            price={car.dailyRate}
          />
        ))}
      </div>
    </div>
  );
};

export default CarPage;
