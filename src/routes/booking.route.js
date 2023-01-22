const express = require("express");
const bookingController = require("../controllers/booking.controller");

const bookingRouter = express.Router();

bookingRouter.post("/publish", bookingController.sendTicketToUser);

bookingRouter.post("/book", bookingController.createBooking);

bookingRouter.get("/book/:bookingId", bookingController.getBookingDetail);

bookingRouter.get("/bookings", bookingController.getAllBooking);

bookingRouter.patch("/book/:bookingId", bookingController.cancelBooking);

module.exports = bookingRouter;
