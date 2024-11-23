//
//Custom Hook: useFetchBookedCars
//This custom React hook is designed to fetch and manage the state of booked cars for a user. It utilizes the `useUserContext` hook to access the current user's information and performs an asynchronous POST request to the server to retrieve booked cars. The hook maintains and returns the following state variables:
// - `Bookings`: Array holding the fetched booked cars data.
// - `isLoading`: Boolean indicating whether the data is still being loaded.
// - `error`: String containing any error message encountered during the fetch operation.
//
//The hook will automatically re-fetch the booked cars whenever the user context changes.
//

import { useState, useEffect } from "react";
import { useUserContext } from "./useUserContext"; // Importing UserContext to access current user details

export const useFetchBookedCars = () => {
  // State to hold the booked cars data
  const [Bookings, setBookings] = useState([]);
  // State to handle loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);

  // Access the current user from UserContext
  const { user } = useUserContext();

  useEffect(() => {
    // Function to fetch booked cars from the API
    const fetchBookedCars = async () => {
      setIsLoading(true); // Set loading to true before starting fetch
      setError(null); // Reset any previous errors
      const rid = user.id; // Retrieve the user ID
      console.log(JSON.stringify({ rid })); // Log the request data for debugging

      try {
        // Make a POST request to fetch booked cars
        const response = await fetch(
          "http://localhost:4000/api/carRoutes/getBookedCars",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rid }), // Send the user ID in the request body
          }
        );
        const json = await response.json(); // Parse the JSON response

        if (response.status === 404) {
          throw new Error(`No Booked Cars`);
        }
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setBookings(json); // Set the fetched bookings to state
        setIsLoading(false); // Set loading to false after fetching data
      } catch (error) {
        // Handle errors by setting error state
        setError(error.message || "An error occurred while fetching cars.");
        setIsLoading(false); // Set loading to false in case of error
      }
    };

    // Fetch booked cars only if user is available
    if (user) {
      fetchBookedCars();
    }
  }, [user]); // Dependency array to re-run effect when user changes

  // Return state variables for use in components
  return { Bookings, isLoading, error };
};
