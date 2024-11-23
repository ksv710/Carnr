//Customer hook for unbooking functionality.
//
// This hook provides a function to mark a car as unbooked by sending a PUT request to the server.
// The server is expected to handle the unbooking logic and respond with the result.
// It exports a function `useUnbooked` that includes:
// - An `Unbooked` function to send a PUT request to the server with the car ID.
// - The `Unbooked` function returns the server's response or an error message.

export const useUnbooked = () => {
  // Function to unbook a car given its ID (cid)
  const Unbooked = async (cid) => {
    // Send a PUT request to the server to unbook the car
    const response = await fetch(
      "http://localhost:4000/api/carRoutes/Unbooked",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cid }),
      }
    );

    // Parse the JSON response from the server
    const json = await response.json();

    // Return the result if the request was successful, otherwise return an error message
    if (response.ok) {
      return json;
    } else {
      return "Failed to unbook car.";
    }
  };

  // Return the Unbooked function so it can be used by components
  return { Unbooked };
};
