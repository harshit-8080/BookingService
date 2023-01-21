const bookingService = require("../services/booking.service");
const bookingObj = new bookingService();
const axios = require("axios");
const {
  FlightService_GetFlightDetail,
  REMINDER_BINDING_KEY,
} = require("../config/server.config");
const { createChannel, publish } = require("../utils/channel");

class BookingController {
  async sendDataToQueue(req, res) {
    try {
      const channel = await createChannel();
      const data = { message: "scucess" };
      publish(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
      return res.status(200).json({
        response: "published successfully",
      });
    } catch (error) {
      return res.status(500).json({
        response: "Internal Server Error",
      });
    }
  }

  async createBooking(req, res) {
    try {
      // getting flight detail
      const response = await axios.get(
        `${FlightService_GetFlightDetail}${req.body.flightId}`
      );
      const flightDetails = response.data.data;

      if (flightDetails.totalSeats < req.body.noOfSeats) {
        return res.status(500).json({
          data: "Not sufficient seats available",
          sucess: true,
          message: "Booking Created Failed",
          err: {},
        });
      }
      const data = {
        flightID: req.body.flightId,
        userID: req.body.userID,
        status: "InProgress",
        noOfSeats: req.body.noOfSeats,
        totalCost: req.body.noOfSeats * flightDetails.price,
      };
      const result = await bookingObj.createBooking(data);

      // updating total seat of flight
      await axios.patch(`${FlightService_GetFlightDetail}${data.flightID}`, {
        totalSeats: flightDetails.totalSeats - result.noOfSeats,
      });

      result.status = "Booked";
      await result.save();

      return res.status(201).json({
        data: result,
        sucess: true,
        message: "Booking Created and flight seat updated Sucessfully",
        err: {},
      });
    } catch (error) {
      console.log("Error = ", error);
      return res.status(500).json({
        msg: "internal server error",
      });
    }
  }

  async getBookingDetail(req, res) {
    try {
      const response = await bookingObj.getBookingDetail(req.params.bookingId);
      return res.status(201).json({
        data: response,
        sucess: true,
        message: "Booking Fetched Sucessfully",
        err: {},
      });
    } catch (error) {
      console.log("Error = ", error);
      return res.status(500).json({
        msg: "internal server error",
      });
    }
  }

  async getAllBooking(req, res) {
    try {
      const response = await bookingObj.getAllBooking();
      return res.status(201).json({
        data: response,
        sucess: true,
        message: "All Booking Fetched Sucessfully",
        err: {},
      });
    } catch (error) {
      console.log("Error = ", error);
      return res.status(500).json({
        msg: "internal server error",
      });
    }
  }

  async cancelBooking(req, res) {
    try {
      const response = await bookingObj.cancelBooking(req.params.bookingId);
      return res.status(201).json({
        data: response,
        sucess: true,
        message: "Booking Cancelled and Flight Seat Updated Sucessfully",
        err: {},
      });
    } catch (error) {
      console.log("Error = ", error);
      return res.status(500).json({
        msg: "internal server error",
      });
    }
  }
}

module.exports = new BookingController();
