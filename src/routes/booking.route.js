const express = require("express");
const bookingController = require("../controllers/booking.controller");


const bookingRouter = express.Router();

bookingRouter.post("/signup", bookingController.createBooking);

module.exports = bookingRouter;