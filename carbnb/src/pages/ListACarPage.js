//
//ListACarPage Component
//
//This React component provides a multi-step form for users to list their car for rent on the CaRnR platform.
//It includes the following steps:
// 1. Welcome Section: Introduction and start button.
// 2. Car Details: Form fields to input car specifications (make, model, year, etc.).
// 3. Photos: Option to upload a car photo.
// 4. Pricing & Availability: Form for pricing, availability, and location selection using a map.
//
//The component handles form navigation, file uploads, and form submission. It uses hooks for managing state
//and navigating between steps, and integrates with a custom hook for listing the car and handling errors.
import React, { useState } from "react";
import "../components/Styles/ListACarPage.css"; // Import custom styles
import Clock from "../components/Assets/Clock"; // Import Clock component
import Calender from "../components/Assets/Calender"; // Import Calendar component
import MyMap from "../components/Assets/Map"; // Import Map component
import { useListCar } from "../hooks/useListCar"; // Custom hook for listing cars
import { useNavigate } from "react-router-dom"; // Hook for navigation

// Main component for listing a car
const ListACarPage = () => {
  // State hooks
  const navigate = useNavigate(); // Hook for navigation
  const [currentStep, setCurrentStep] = useState(0); // Step in the form
  const [carDetails, setCarDetails] = useState({
    make: "",
    model: "",
    year: "",
    odometer: "",
    transmission: "",
    fuelType: "",
    seatingCapacity: "",
    color: "",
    description: "",
    dailyRate: "",
    lat: "",
    long: "",
    fromDate: new Date(),
    toDate: new Date(),
    fromTime: "10:00",
    toTime: "10:00",
    location: {
      type: "Point",
      coordinates: ["", ""], // Initialize coordinates
    },
  });
  const [carPhoto, setCarPhoto] = useState(null); // State for car photo
  const [errors, setErrors] = useState({}); // State for form errors

  const { listCar } = useListCar(); // Hook function for listing the car

  // Handle changes to input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  // Handle changes to date fields
  const handleDateChange = (name, value) => {
    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  // Handle changes to time fields
  const handleTimeChange = (name, value) => {
    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  // Move to the next step
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Move to the previous step
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Upload file to the cloudinary api server
  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", carPhoto);
    formData.append("upload_preset", "User images");
    try {
      let api = "https://api.cloudinary.com/v1_1/dzbppy2qi/image/upload";
      let response = await fetch(api, {
        method: "POST",
        body: formData,
      });
      let data = await response.json();
      return data.url;
    } catch (error) {
      console.error(error);
      throw new Error("File upload failed");
    }
  };

  // Handle the selection of location on the map
  const handleLocationSelect = ({ lat, lng }) => {
    console.log("Location which got selcted", lat, lng);

    setCarDetails((prevDetails) => ({
      ...prevDetails,
      lat: lat,
      long: lng,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
    }));
    console.log("Location Selected:", lat, lng);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Car Details:", carDetails);
    try {
      let imgURL = "";
      if (carPhoto) {
        imgURL = await uploadFile();
      }
      console.time("listCar");
      await listCar(carDetails, imgURL);
      console.timeEnd("listCar");
      setCarPhoto(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrors({ form: error.message });
    }
  };

  return (
    <div>
      {/* Conditional rendering based on the current step */}
      {currentStep === 0 ? (
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>Ready to List Your Car?</h1>
            <p>Share your vehicle with our community and start making money today!</p>
            <button className="btn fancy-button" onClick={handleNext}>
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <div className="list-car-page">
          {/* Step progress indicator */}
          <div className="step-progress">
            <div className={`step ${currentStep >= 1 ? "completed" : ""}`}>
              1. Car Details
            </div>
            <div className={`step ${currentStep >= 2 ? "completed" : ""}`}>
              2. Photos
            </div>
            <div className={`step ${currentStep >= 3 ? "completed" : ""}`}>
              3. Pricing & Availability
            </div>
          </div>
          {/* Display form errors */}
          {errors.form && (
            <div className="alert alert-danger">{errors.form}</div>
          )}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Car Details Form */}
            {currentStep === 1 && (
              <div className="step-content">
                <h2>Car Details</h2>
                <input
                  type="text"
                  name="make"
                  placeholder="Car Make"
                  className={`form-control ${errors.make ? "is-invalid" : ""}`}
                  value={carDetails.make}
                  onChange={handleChange}
                />
                {errors.make && (
                  <div className="invalid-feedback">{errors.make}</div>
                )}

                <input
                  type="text"
                  name="model"
                  placeholder="Car Model"
                  className={`form-control ${errors.model ? "is-invalid" : ""}`}
                  value={carDetails.model}
                  onChange={handleChange}
                />
                {errors.model && (
                  <div className="invalid-feedback">{errors.model}</div>
                )}

                <input
                  type="text"
                  name="year"
                  placeholder="Model Year"
                  className={`form-control ${errors.year ? "is-invalid" : ""}`}
                  value={carDetails.year}
                  onChange={handleChange}
                />
                {errors.year && (
                  <div className="invalid-feedback">{errors.year}</div>
                )}

                <input
                  type="text"
                  name="odometer"
                  placeholder="Odometer Reading"
                  className={`form-control ${
                    errors.odometer ? "is-invalid" : ""
                  }`}
                  value={carDetails.odometer}
                  onChange={handleChange}
                />
                {errors.odometer && (
                  <div className="invalid-feedback">{errors.odometer}</div>
                )}

                <input
                  type="text"
                  name="transmission"
                  placeholder="Transmission"
                  className={`form-control ${
                    errors.transmission ? "is-invalid" : ""
                  }`}
                  value={carDetails.transmission}
                  onChange={handleChange}
                />
                {errors.transmission && (
                  <div className="invalid-feedback">{errors.transmission}</div>
                )}

                <input
                  type="text"
                  name="fuelType"
                  placeholder="Fuel Type"
                  className={`form-control ${
                    errors.fuelType ? "is-invalid" : ""
                  }`}
                  value={carDetails.fuelType}
                  onChange={handleChange}
                />
                {errors.fuelType && (
                  <div className="invalid-feedback">{errors.fuelType}</div>
                )}

                <input
                  type="text"
                  name="seatingCapacity"
                  placeholder="Seating Capacity"
                  className={`form-control ${
                    errors.seatingCapacity ? "is-invalid" : ""
                  }`}
                  value={carDetails.seatingCapacity}
                  onChange={handleChange}
                />
                {errors.seatingCapacity && (
                  <div className="invalid-feedback">
                    {errors.seatingCapacity}
                  </div>
                )}

                <input
                  type="text"
                  name="color"
                  placeholder="Color"
                  className={`form-control ${errors.color ? "is-invalid" : ""}`}
                  value={carDetails.color}
                  onChange={handleChange}
                />
                {errors.color && (
                  <div className="invalid-feedback">{errors.color}</div>
                )}

                <textarea
                  name="description"
                  placeholder="Description"
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  value={carDetails.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
            )}

            {/* Photos Upload Form */}
            {currentStep === 2 && (
              <div className="step-content">
                <h2>Photos</h2>
                <input
                  type="file"
                  name="carPhoto"
                  className={`form-control ${
                    errors.carPhoto ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setCarPhoto(e.target.files[0])}
                  required
                />
                {errors.carPhoto && (
                  <div className="invalid-feedback">{errors.carPhoto}</div>
                )}
              </div>
            )}

            {/* Pricing & Availability Form */}
            {currentStep === 3 && (
              <div className="step-content">
                <h2>Pricing & Availability</h2>
                <div className="input-group mb-3">
                  <span className="input-group-text">$</span>
                  <input
                    type="text"
                    name="dailyRate"
                    className={`form-control ${
                      errors.dailyRate ? "is-invalid" : ""
                    }`}
                    placeholder="Daily Rate"
                    aria-label="Amount (to the nearest dollar)"
                    value={carDetails.dailyRate}
                    onChange={handleChange}
                  />
                </div>
                {errors.dailyRate && (
                  <div className="invalid-feedback">{errors.dailyRate}</div>
                )}
                <label>Choose Pickup and Dropoff Location</label>
                <div className="d-flex justify-content-center">
                  <MyMap
                    onLocationSelect={handleLocationSelect}
                    className="small-map"
                  />
                </div>
                {errors.lat && (
                  <div className="invalid-feedback">{errors.lat}</div>
                )}
                {errors.long && (
                  <div className="invalid-feedback">{errors.long}</div>
                )}
                <div className="date-time-picker">
                  <label>From Date</label>
                  <Calender
                    selected={carDetails.fromDate}
                    onChange={(date) => handleDateChange("fromDate", date)}
                  />
                  <label>To Date</label>
                  <Calender
                    selected={carDetails.toDate}
                    onChange={(date) => handleDateChange("toDate", date)}
                  />
                  <label>From Time</label>
                  <Clock
                    value={carDetails.fromTime}
                    onChange={(time) => handleTimeChange("fromTime", time)}
                  />
                  <label>To Time</label>
                  <Clock
                    value={carDetails.toTime}
                    onChange={(time) => handleTimeChange("toTime", time)}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="navigation-buttons mt-3 d-flex justify-content-between">
              {currentStep > 0 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePrev}
                >
                  Previous
                </button>
              )}
              {currentStep < 3 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                  style={{
                    backgroundColor: "#324b5f",
                    color: "#ffffff",
                    borderColor: "#001f3f",
                    width: "9%",
                  }}
                >
                  Next
                </button>
              )}
              {currentStep >= 3 && (
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ListACarPage;
