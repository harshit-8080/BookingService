const bookingService = require("../services/booking.service");
const bookingObj = new bookingService();
const axios = require("axios");

exports.createBooking = async (req, res) => {

    try {
        const response = await axios.get(`http://localhost:3000/api/v1.0/flight/${req.body.flightId}`);
        const flightDetails = response.data.data

        const data = {
            flightID:req.body.flightId,
            userID:req.body.userID,
            status:"Booked",
            noOfSeats:req.body.noOfSeats,
            totalCost:req.body.noOfSeats * flightDetails.price
        };
        const result = await bookingObj.createBooking(data);

        return res.status(201).json({

            data:result,
            sucess:true,
            message:"Booking Created Sucessfully",
            err:{}

        })

    } catch (error) {
        console.log("Error = ",error);
        return res.status(500).json({
            "msg":"internal server error"
        })
    }
}