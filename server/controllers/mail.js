import nodemailer from "nodemailer";
import observer from "./observer.js";
import User from "../models/userModel.js";
import { Car } from "../models/carModel.js";
class Email extends observer {
  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "carnrbot@gmail.com",
        pass: "vfrlpadqpaqsbyyu",
      },
    });
  }

  async update(data) {
    const { cid, rid } = data;
    const car = await Car.findById(cid);
    const renter = await User.findById(rid);
    const lister = await User.findById(car.listerid);
    const rmail = {
      from: "CaRnRBot@gmail.com",
      to: renter.email,
      subject: "Car Booking Confirmation",
      text: `Your booking for a ${car.year} ${car.make} has been confirmed.`,
    };

    const lmail = {
      from: "CaRnRBot@gmail.com",
      to: lister.email,
      subject: "Your car has been booked",
      text: `Your ${car.year} ${car.make} has been booked by ${renter.first} ${renter.last}.`,
    };
    try {
      await this.transporter.sendMail(rmail);
      await this.transporter.sendMail(lmail);
      console.log("Email sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

export default Email;
