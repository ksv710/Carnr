//
//Custom Hook for Deleting a Car Listing
//
//This file exports a custom hook `useDeleteList` which provides a function
//`deleteList` for sending a DELETE request to remove a car listing.
//
// - `deleteList(cid)`: Sends a DELETE request to the server with the car ID (`cid`) to remove the car from the listings.
// - On success, it returns the server's response in JSON format.
// - On failure, it returns an error message.
// - In case of a network error, it returns a descriptive error message.
//
export const useDeleteList = () => {
  const deleteList = async (cid) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/carRoutes/deleteList",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cid }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        return json;
      } else {
        return "Failed to unlist car.";
      }
    } catch (error) {
      return "An error occurred: " + error.message;
    }
  };

  return { deleteList };
};
