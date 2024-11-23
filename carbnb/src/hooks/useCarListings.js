//
//Custom Hook for Fetching Lister's Car Listings
//
//This custom React hook, `useFetchListerCars`, manages the state and side effects
//related to fetching car listings for a specific lister. It:
// - Retrieves the current user from the user context.
// - Sends a POST request to fetch car listings based on the lister's ID.
// - Manages loading, error, and listing states.
// - Returns the car listings, loading status, and any errors encountered.
//
//It uses the `useEffect` hook to perform the fetch operation when the user context changes.
//

import { useState, useEffect } from "react";
import { useUserContext } from "./useUserContext"; // Custom hook to access the current user context

export const useFetchListerCars = () => {
  // State to hold the car listings
  const [listings, setListings] = useState([]);

  // State to manage any errors
  const [error, setError] = useState(null);

  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);

  // Get the current user from context
  const { user } = useUserContext();

  useEffect(() => {
    const fetchListerCars = async () => {
      setIsLoading(true);
      setError(null);

      // Get the lister's ID from the current user
      const listerid = user.id;

      try {
        const response = await fetch(
          "http://localhost:4000/api/carRoutes/getlisterCars",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ listerid }),
          }
        );

        // Parse the JSON response
        const json = await response.json();

        // Handle potential errors based on response status
        if (response.status === 404) {
          throw new Error(`No Listed Cars`);
        }
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Update state with the retrieved car listings
        setListings(json);
        setIsLoading(false);
      } catch (error) {
        // Set error state if an error occurs
        setError(error.message || "An error occurred while fetching cars.");
        setIsLoading(false);
      }
    };

    // Fetch the listings only if the user is defined
    if (user) {
      fetchListerCars();
    }
  }, [user]); // Re-run the effect if the user changes

  // Return the current state values
  return { listings, isLoading, error };
};
