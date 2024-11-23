//
//Custom Hook: useListCar
//
//This custom React hook manages the listing of a car. It provides functionality to:
// - Manage error and loading states.
// - Perform a POST request to the backend API to list a car with details and a photo.
//
//The hook uses the `useUserContext` to get the current user's ID and includes it in the request.
//It returns an object with the `listCar` function, error state, and loading state.
//
import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useListCar = () => {
  // State variables to manage error and loading states
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useUserContext();

  // Function to list a car, accepting car details and a photo
  const listCar = async (carDetails, carPhoto) => {
    setIsLoading(true);
    setError(null);

    // Construct the data object
    const data = {
      ...carDetails,
      photo: carPhoto,
      listerid: user.id,
      booked: false,
    };

    try {
      const response = await fetch("http://localhost:4000/api/carRoutes/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // Send as JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error(errorData.errors.map((err) => err.msg).join(", "));
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error listing car:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { listCar, error, isLoading };
};
