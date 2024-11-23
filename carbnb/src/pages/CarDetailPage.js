//
//CarDetail Component
//
//This component fetches and displays details of a car. It provides functionalities
//for users to book, unbook, or delete a car listing. Users need to be logged in to
//perform these actions. The component also shows a modal for confirmation and alerts
//if a user needs to log in.

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Modal } from "react-bootstrap";
import SnackbarAlert from "../components/Navigation/SnackbarAlert";
import "../components/Styles/CarDetail.css";
import { useFetchCar } from "../hooks/usegetcar";
import { useUserContext } from "../hooks/useUserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheckCircle, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useBooked } from "../hooks/useBooked";
import { useListerInfo } from "../hooks/useListerInfo";
import { useUnbooked } from "../hooks/useUnbooked";
import { useDeleteList } from "../hooks/usedeleteList";

const CarDetail = () => {
  // Hooks and State Definitions
  const location = useLocation(); // Get the current location object
  const { id } = useParams(); // Get car ID from route parameters
  const navigate = useNavigate(); // Function to navigate programmatically
  const { car, isLoading, error } = useFetchCar(id); // Fetch car data using custom hook
  const { user } = useUserContext(); // Access user context for authentication info
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [city, setCity] = useState(""); // State to store the city name
  const { booked } = useBooked(); // Custom hook for booking a car
  const { Unbooked } = useUnbooked(); // Custom hook for unbooking a car
  const { deleteList } = useDeleteList(); // Custom hook for deleting a car listing
  const {
    listerInfo,
    isLoading: listerLoading,
    error: listerError,
  } = useListerInfo(car?.listerid); // Fetch lister's info using custom hook

  console.log(location);

  // Handle car booking action
  const handleRentClick = async () => {
    if (!user) {
      setShowAlert(true); // Show alert if user is not logged in
    } else if (car.listerid === user.id) {
      alert("You listed this car"); // Alert if user is the car lister
    } else {
      await booked(car._id); // Proceed with booking
      setShowModal(true); // Show confirmation modal
    }
  };

  // Handle car unbooking action
  const handleUnrentClick = async () => {
    if (!user) {
      setShowAlert(true); // Show alert if user is not logged in
    } else if (car.renterid !== user.id) {
      alert("You did not book this car"); // Alert if user did not book the car
    } else {
      // Unbooking logic
      await Unbooked(car._id); // Proceed with unbooking
      setShowModal(true); // Show confirmation modal
    }
  };

  // Handle car listing deletion action
  const handleUnlistClick = async () => {
    if (!user) {
      setShowAlert(true); // Show alert if user is not logged in
    } else if (car.listerid !== user.id) {
      alert("You did not list this car"); // Alert if user did not list the car
    } else {
      // Deleting listing logic
      await deleteList(car._id); // Proceed with deleting the listing
      setShowModal(true); // Show confirmation modal
    }
  };

  // Close the alert
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  // Close the modal and navigate back
  const handleCloseModal = () => {
    setShowModal(false);
    navigate(-1); // Navigate back to previous page
  };

  // Fetch city name based on latitude and longitude
  useEffect(() => {
    const fetchCityName = async () => {
      if (car && car.lat && car.long) {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${car.lat},${car.long}&key=AIzaSyBotUHtXai93ly5YG8OPEWTKKls5JpSCJ8`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          const results = data.results;
          if (results && results.length > 0) {
            const addressComponents = results[0].address_components;
            const cityComponent = addressComponents.find((component) =>
              component.types.includes("locality")
            );
            setCity(cityComponent ? cityComponent.long_name : "Unknown City");
          }
        } catch (error) {
          console.error("Error fetching city name:", error);
        }
      }
    };

    if (car) {
      fetchCityName();
    }
  }, [car]);

  // Render loading spinner if data is loading
  if (isLoading || listerLoading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  // Render error message if there's an error
  if (error || listerError) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <p>{error || listerError}</p>
      </Container>
    );
  }

  // Render car details
  return (
    <Container className="my-5 car-detail-container">
      <SnackbarAlert
        open={showAlert}
        message="You need to be logged in to book a car."
        onClose={handleCloseAlert}
      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          {user && user.id === car.renterid && (
            <Modal.Title>Booking Cancellation</Modal.Title>
          )}
          {user && user.id !== car.listerid && user.id !== car.renterid && (
            <Modal.Title>Booking Confirmation</Modal.Title>
          )}
          {user && user.id === car.listerid && (
            <Modal.Title>Listing deleted</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          Your request for {car.make} {car.model} has been confirmed!
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <div className="title-section">
        <h1 className="car-title">
          {car.make} {car.model} - {car.year}
        </h1>
      </div>
      <div className="image-section1">
        <img src={car.photo} className="car-photo1" alt="Car" />
      </div>
      <Row className="content-row">
        <Col md={8}>
          <Row>
            <Col md={12} className="more-info-section">
              <div className="info-item">
                <FontAwesomeIcon icon={faUser} className="info-icon" />
                <span>
                  <strong>Listed by:</strong> {listerInfo.first}{" "}
                  {listerInfo.last}
                </span>
              </div>
              <div className="info-item">
                <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
                <span>
                  <strong>Contact:</strong> {listerInfo.email? listerInfo.email : 'No email available'}
                </span>
              </div>
              <div className="info-item">
                <FontAwesomeIcon icon={faCheckCircle} className="info-icon" />
                <span>
                  <strong>Free Cancellation:</strong> Get a full refund if you
                  change your mind
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="car-detail-section">
              <h2 className="section-title">Car Details</h2>
              <hr className="fancy-line" />
              <Card.Text>
                <strong>Odometer:</strong> {car.odometer}
              </Card.Text>
              <Card.Text>
                <strong>Transmission:</strong> {car.transmission}
              </Card.Text>
              <Card.Text>
                <strong>Fuel Type:</strong> {car.fuelType}
              </Card.Text>
              <Card.Text>
                <strong>Seating Capacity:</strong> {car.seatingCapacity}
              </Card.Text>
              <Card.Text>
                <strong>Color:</strong> {car.color}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {car.description}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {city}
              </Card.Text>
              <Card.Text>
                <strong>Available From:</strong> {car.fromDate} {car.fromTime}
              </Card.Text>
              <Card.Text>
                <strong>Available To:</strong> {car.toDate} {car.toTime}
              </Card.Text>
            </Col>
          </Row>
        </Col>
        <Col md={4} className="price-breakdown-col">
          <div className="car-price-section">
            <h2 className="section-title">Price Breakdown</h2>
            <hr className="fancy-line" />
            <Card.Text>
              <strong>Daily Rate:</strong> ${car.dailyRate}
            </Card.Text>
            <Card.Text>
              <strong>Service Fee:</strong> ${Math.round(car.dailyRate * 0.1)}
            </Card.Text>
            <Card.Text>
              <strong>Total:</strong> ${Math.round(car.dailyRate * 1.1)}
            </Card.Text>
            {!user && (
              <button
                onClick={handleRentClick}
                className="btn"
                style={{
                  backgroundColor: "#324b5f",
                  color: "#ffffff",
                  borderColor: "#001f3f",
                  width: "100%",
                }}
              >
                Book Now
              </button>
            )}

            {user && user.id !== car.listerid && user.id !== car.renterid && (
              <button
                onClick={handleRentClick}
                className="btn"
                style={{
                  backgroundColor: "#324b5f",
                  color: "#ffffff",
                  borderColor: "#001f3f",
                  width: "100%",
                }}
              >
                Book Now
              </button>
            )}
            {user && user.id === car.renterid && (
              <button
                onClick={handleUnrentClick}
                className="btn"
                style={{
                  backgroundColor: "#324b5f",
                  color: "#ffffff",
                  borderColor: "#001f3f",
                  width: "100%",
                }}
              >
                Cancel Booking
              </button>
            )}

            {user && user.id === car.listerid && (
              <button
                onClick={handleUnlistClick}
                className="btn"
                style={{
                  backgroundColor: "#324b5f",
                  color: "#ffffff",
                  borderColor: "#001f3f",
                  width: "100%",
                }}
              >
                Delete Listing
              </button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CarDetail;
