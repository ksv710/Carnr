//
// This file defines the routes for car-related operations in the web application.
//
// Routes include:
// - POST /list: Validates and lists a new car.
// - GET /getCar: Retrieves all cars.
// - POST /getlisterCars: Retrieves cars listed by a specific user.
// - POST /getBookedCars: Retrieves cars that are currently booked.
// - PUT /booked: Marks a car as booked.
// - PUT /Unbooked: Marks a car as unbooked.
// - DELETE /deleteList: Deletes a car listing.
// - GET /:id: Retrieves details of a specific car by its ID.
//
// The routes are connected to respective controller functions
import express from "express";
import {
  validateCar,
  listCar,
  getallCar,
  getCar,
  getlisterCars,
  booked,
  getBookedCars,
  Unbooked,
  deleteList,
  getallCarbylocation,
} from "../controllers/carController.js";

// Creating an instance of the Express Router
const router = express.Router();

// Route to list a new car (POST request with car validation)
router.post("/list", validateCar, listCar);

// Route to get all cars (GET request)
router.get("/getCar", getallCar);

router.post("/getCarbylocation", getallCarbylocation);

// Route to get cars listed by the user (POST request)
router.post("/getlisterCars", getlisterCars);

// Route to get cars that are booked (POST request)
router.post("/getBookedCars", getBookedCars);

// Route to mark a car as booked (PUT request)
router.put("/booked", booked);

// Route to mark a car as unbooked (PUT request)
router.put("/Unbooked", Unbooked);

// Route to delete a car listing (DELETE request)
router.delete("/deleteList", deleteList);

// Route to get details of a specific car by ID (GET request)
router.get("/:id", getCar);

// Exporting the router to be used in the main application file
export default router;
