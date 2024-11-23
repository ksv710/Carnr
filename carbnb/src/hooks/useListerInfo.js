// Custom React Hook for Fetching Lister's Info
//
// This custom hook, `useListerInfo`, is used to fetch and manage the state of a lister's info
// based on the provided `listerId`. It handles the following:
// - `listerInfo`: State to store the lister's Info.
// - `error`: State to store any error message encountered during the fetch operation.
// - `isLoading`: State to track the loading status of the fetch operation.
//
// The hook makes an API call to retrieve the lister's info, updates the state accordingly,
// and returns the lister's info, loading status, and any errors encountered.

import { useState, useEffect } from "react";

export const useListerInfo = (listerId) => {
  // State to store the lister's info (first and last and email).
  const [listerInfo, setListerInfo] = useState({ first: "", last: "", email: "" });

  // State to store any error message encountered during the fetch operation.
  const [error, setError] = useState(null);

  // State to track the loading status of the fetch operation.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch the lister's info from the API.
    const fetchListerInfo = async () => {
      // Return early if no listerId is provided.
      if (!listerId) return;

      try {
        // Make an API request to fetch the lister's info.
        const response = await fetch(
          `http://localhost:4000/api/userRoutes/${listerId}`
        );

        // Throw an error if the response is not OK.
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Parse the response JSON and set the lister's info state.
        const data = await response.json();
        console.log('Fetched Data:', data); // Debugging line
        setListerInfo({ first: data.first, last: data.last, email: data.email});
      } catch (error) {
        // Set the error state if an error is encountered.
        setError(error.message);
      } finally {
        // Set the loading state to false after the fetch operation is complete.
        setIsLoading(false);
      }
    };

    // Call the fetch function.
    fetchListerInfo();
  }, [listerId]);

  // Return the lister's info, loading status, and any error encountered.
  return { listerInfo, isLoading, error };
};
