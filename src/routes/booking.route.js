const express = require("express");
const bookingController = require("../controllers/booking.controller");


const bookingRouter = express.Router();

bookingRouter.post("/book", bookingController.createBooking);

module.exports = bookingRouter;