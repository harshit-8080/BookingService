const bookingService = require("../services/booking.service");
const bookingObj = new bookingService();
const axios = require("axios");
const {FlightService_GetFlightDetail} = require("../config/server.config");


exports.createBooking = async (req, res) => {

    try {

        // getting flight detail
        const response = await axios.get(`${FlightService_GetFlightDetail}${req.body.flightId}`);
        const flightDetails = response.data.data

        if(flightDetails.totalSeats < req.body.noOfSeats){
            return res.status(500).json({
                data:"Not sufficient seats available",
                sucess:true,
                message:"Booking Created Failed",
                err:{}

            })
        }
        const data = {
            flightID:req.body.flightId,
            userID:req.body.userID,
            status:"InProgress",
            noOfSeats:req.body.noOfSeats,
            totalCost:req.body.noOfSeats * flightDetails.price
        };
        const result = await bookingObj.createBooking(data);

        // updating total seat of flight
        await axios.patch(`${FlightService_GetFlightDetail}${data.flightID}`,{
            totalSeats:flightDetails.totalSeats - result.noOfSeats
        })

        result.status = "Booked";
        await result.save();
        
        return res.status(201).json({

            data:result,
            sucess:true,
            message:"Booking Created and flight seat updated Sucessfully",
            err:{}

        })

    } catch (error) {
        console.log("Error = ",error);
        return res.status(500).json({
            "msg":"internal server error"
        })
    }
}