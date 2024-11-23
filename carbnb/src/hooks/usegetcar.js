//
//Custom Hook: useFetchCar
//
//This custom React hook, `useFetchCar`, is designed to fetch and manage the state of car data based on a given ID.
//It provides the following states:
// - `car`: The fetched car data.
// - `isLoading`: A boolean indicating if the data is still being loaded.
// - `error`: Any error encountered during the fetch process.
//
//The hook performs the following:
// - Initializes state for `car`, `error`, and `isLoading`.
// - Defines a `fetchCar` function that fetches car data from an API endpoint using the provided ID.
// - Updates state based on the response or any errors encountered.
// - Refetches the data whenever the `id` changes.
//

import { useState, useEffect } from "react";

export const useFetchCar = (id) => {
  const [car, setCar] = useState(null); // State to store the car data
  const [error, setError] = useState(null); // State to store any error encountered during fetch
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchCar = async () => {
      setIsLoading(true); // Set loading state to true at the start of fetch
      setError(null); // Clear any previous errors

      try {
        const response = await fetch(
          `http://localhost:4000/api/carRoutes/${id}`
        );
        const json = await response.json();

        if (response.ok) {
          setCar(json); // Set car data if fetch is successful
          setIsLoading(false); // Set loading state to false after successful fetch
        } else {
          setError(json.message || "Failed to fetch car."); // Set error message if response is not ok
          setIsLoading(false); // Set loading state to false after fetch attempt
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching the car."); // Set error message if fetch fails
        setIsLoading(false); // Set loading state to false after fetch attempt
      }
    };

    if (id) {
      fetchCar(); // Fetch car details if ID is provided
    }
  }, [id]); // Dependency array to refetch data if ID changes

  return { car, isLoading, error }; // Return car data, loading state, and error state
};
