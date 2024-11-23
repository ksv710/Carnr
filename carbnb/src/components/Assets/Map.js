//
//MyMap Component
//
//This file defines the `MyMap` component that integrates Google Maps functionality into a React application.
//It handles rendering the map, selecting user locations, and updating the map and marker based on user input.
//The component uses several sub-components and hooks:
//
//-MyMap: The main component that manages the map rendering, user location, and selected place. It utilizes
//        `useState` to store latitude, longitude, and selected place, and uses the `useEffect` hook to fetch the user's
//        current position and update the map.
//-MapHandler: A sub-component that updates the map viewport and marker position when a new place is selected
//             from the autocomplete input.
//
//-PlaceAutocomplet: A sub-component that integrates Google Places API for place autocomplete functionality,
//                   allowing users to search and select places.
//
//-useEffect for Geolocation: Fetches the user's current location when the component mounts using the Geolocation API.
//
//-Map and APIProvider: Renders the map centered on the user's current or default location and provides the Google
//                      Maps API key using the `APIProvider` component.
//
"use client";
import "../Styles/MapStyles.css";
import React, { useState, useEffect, useRef } from "react";
import {
  APIProvider,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

// This component handles the map rendering and user location selection
const MyMap = ({ onLocationSelect }) => {
  const [Lat, setLat] = useState(null); // State to store latitude
  const [Long, setLong] = useState(null); // State to store longitude

  const [selectedPlace, setSelectedPlace] = useState(null); // State to store selected place from autocomplete
  const [markerRef, marker] = useAdvancedMarkerRef(); // Reference to the map marker

  // Component to handle map and marker updates when a place is selected
  const MapHandler = ({ place, marker }) => {
    const map = useMap(); // Access the map instance

    useEffect(() => {
      if (!map || !place || !marker) return;

      // If the place has a viewport, adjust the map to fit it
      if (place.geometry?.viewport) {
        map.fitBounds(place.geometry?.viewport);
      }

      // Update the marker position to the selected place location
      marker.position = place.geometry?.location;

      const position = place.geometry?.location;
      if (position) {
        const lat = position.lat();
        const lng = position.lng();

        // Update the state if the new position is different from the current state
        if (lat !== Lat || lng !== Long) {
          setLat(lat);
          setLong(lng);
          onLocationSelect({ lat, lng }); // Call the callback with the new location
        }
      }
    }, [map, place, marker]);

    return null;
  };

  // Component to handle place autocomplete using Google Places API
  const PlaceAutocomplete = ({ onPlaceSelect }) => {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null); // State for the autocomplete instance
    const inputRef = useRef(null); // Reference to the input element
    const places = useMapsLibrary("places"); // Load the places library

    useEffect(() => {
      if (!places || !inputRef.current) return;

      const options = {
        fields: ["geometry", "name", "formatted_address"],
      };

      // Create a new autocomplete instance
      setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    useEffect(() => {
      if (!placeAutocomplete) return;

      // Add a listener to handle place selection
      placeAutocomplete.addListener("place_changed", () => {
        onPlaceSelect(placeAutocomplete.getPlace());
      });
    }, [onPlaceSelect, placeAutocomplete]);

    return (
      <div className="autocomplete-container">
        <input ref={inputRef} /> {/* Input element for place autocomplete */}
      </div>
    );
  };

  // Fetch the user's current position when the component mounts
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  return (
    <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
      {" "}
      {/* Provide the Google Maps API key whicvh is stopred in .env file */}
      <div style={{ height: "50vh", width: "50%" }}>
        <Map
          defaultZoom={14}
          defaultCenter={{ lat: Lat || 0, lng: Long || 0 }} // Center the map to the current or default location
          mapId={process.env.REACT_APP_MAP_KEY} // Provide the map ID
        >
          <AdvancedMarker ref={markerRef} position={null} />{" "}
          {/* Add an advanced marker to the map */}
        </Map>
        <MapControl position={ControlPosition.TOP}>
          <div className="autocomplete-control">
            <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />{" "}
            {/* Autocomplete input for place selection */}
          </div>
        </MapControl>
        <MapHandler place={selectedPlace} marker={marker} />{" "}
        {/* Handle map and marker updates */}
      </div>
    </APIProvider>
  );
};

export default MyMap;
