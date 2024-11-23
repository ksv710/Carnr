//
//CarModel.sj component
//
//This file defines a Mongoose schema and model for managing car listings in the CaRnR web application.
//
//The Car schema includes fields to describe various attributes of a car, such as make, model, year,
//odometer reading, transmission type, fuel type, seating capacity, color, description, and daily rental rate.
//It also includes fields for location coordinates, availability dates and times, a photo URL, and identifiers
//for the lister and renter. The 'booked' field indicates whether the car is currently booked.
//
//
import mongoose from "mongoose";
import Email from "../controllers/mail.js";
const Schema = mongoose.Schema;

// Define the car schema with fields and their types
const carSchema = new Schema({
  // The make of the car (e.g., Toyota, Honda)
  make: {
    type: String,
  },

  // The model of the car (e.g., Corolla, Civic)
  model: {
    type: String,
  },

  // The year of manufacture of the car
  year: {
    type: Number,
  },

  // The car's odometer reading
  odometer: {
    type: Number,
  },

  // Type of transmission (e.g., automatic, manual)
  transmission: {
    type: String,
  },

  // Type of fuel used by the car (e.g., gasoline, diesel, electric)
  fuelType: {
    type: String,
  },

  // Seating capacity of the car
  seatingCapacity: {
    type: Number,
  },

  // Color of the car
  color: {
    type: String,
  },

  // Description of the car (additional details)
  description: {
    type: String,
  },

  // Daily rental rate for the car
  dailyRate: {
    type: Number,
  },

  // Latitude coordinate for the car's location
  lat: {
    type: String,
  },

  // Longitude coordinate for the car's location
  long: {
    type: String,
  },

  // Start date for car availability
  fromDate: {
    type: String,
  },

  // End date for car availability
  toDate: {
    type: String,
  },

  // Start time for car availability
  fromTime: {
    type: String,
  },

  // End time for car availability
  toTime: {
    type: String,
  },

  // URL or path to a photo of the car
  photo: {
    type: String,
  },

  // Identifier for the lister of the car (person listing the car)
  listerid: {
    type: String,
  },

  // Identifier for the renter of the car (person renting the car)
  renterid: {
    type: String,
  },

  // Whether the car is currently booked or not
  booked: {
    type: Boolean,
  },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
  },
});

carSchema.index({ location: "2dsphere" });
// Create a Mongoose model for the Car schema
const Car = mongoose.model("Car", carSchema);

class CarModel {
  static observers = [];

  static addObserver(observer) {
    this.observers.push(observer);
  }

  static removeObserver(observer) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  static notifyObservers(data) {
    this.observers.forEach((observer) => observer.update(data));
  }

  static async bookcar(cid, rid) {
    const cars = await Car.findById(cid);

    if (!cars) {
      throw Error("Not Found");
    }
    cars.booked = true;
    cars.renterid = rid;
    await Car.replaceOne({ _id: cid }, cars);

    this.notifyObservers({ cid, rid });
  }
}

const email = new Email();
CarModel.addObserver(email);

export { Car, CarModel };
