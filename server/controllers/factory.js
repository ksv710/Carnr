import { Car } from "../models/carModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";

class Factory {
  static async createCar(data) {
    return await Car.create({
      make: data.body.make,
      model: data.body.model,
      year: data.body.year,
      odometer: data.body.odometer,
      transmission: data.body.transmission,
      fuelType: data.body.fuelType,
      seatingCapacity: data.body.seatingCapacity,
      color: data.body.color,
      description: data.body.description,
      dailyRate: data.body.dailyRate,
      lat: data.body.lat,
      long: data.body.long,
      fromDate: data.body.fromDate,
      toDate: data.body.toDate,
      fromTime: data.body.fromTime,
      toTime: data.body.toTime,
      photo: data.body.photo,
      listerid: data.body.listerid,
      booked: data.body.booked,
      location: {
        coordinates: [data.body.long, data.body.lat],
      },
    });
  }

  static async createUser(data) {
    const { first, last, email, password } = data.body;

    if (!first || !last || !email || !password) {
      throw new Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Email not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error("Password too weak");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      throw new Error("Email in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ first, last, email, password: hash });
    return user;
  }

  static createObject(type, data) {
    switch (type) {
      case "createCar":
        return this.createCar(data);
      case "createUser":
        return this.createUser(data);
      default:
        throw new Error("Invalid object type");
    }
  }
}

export default Factory;
