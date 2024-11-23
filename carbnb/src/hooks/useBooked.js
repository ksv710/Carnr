// useBooked.js
//
//Custom hook for booking a car route.
//Utilizes the user context to get the current user and send a PUT request
//to update the booking status of a car route.
//

import { useUserContext } from "./useUserContext";

export const useBooked = () => {
  // Retrieve the user information from the user context
  const { user } = useUserContext();
  //Marks a car route as booked by sending a PUT request to the API.
  const booked = async (cid) => {
    // Get the user ID from the context
    const rid = user.id;
    try {
      // Send a PUT request to the API to book the car route
      const response = await fetch(
        "http://localhost:4000/api/carRoutes/booked",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cid, rid }),
        }
      );

      // Parse the JSON response
      const json = await response.json();

      // Check if the request was successful
      if (response.ok) {
        return json;
      } else {
        return "Failed to list car.";
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error("Error booking car route:", error);
      return "An error occurred while booking the car.";
    }
  };

  // Return the `booked` function to be used by components
  return { booked };
};
