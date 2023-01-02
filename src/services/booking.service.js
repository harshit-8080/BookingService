const {Booking} = require("../models/index");
const axios = require("axios");
const {FlightService_GetFlightDetail} = require("../config/server.config");
class bookingService {

    async createBooking(data){

        try {

            const response = await Booking.create(data);
            return response;

        } catch (error) {

            throw error;
        }

    }

    async getBookingDetail(bookingId){

        try {

            const response = await Booking.findByPk(bookingId);
            return response;

        } catch (error) {

            throw error;
        }

    }

    async getAllBooking(bookingId){

        try {

            const response = await Booking.findAll();
            return response;

        } catch (error) {

            throw error;
        }

    }

    async cancelBooking(bookingId){

        try {

            const booking = await Booking.findByPk(bookingId);
            booking.status = "Cancelled";
            await booking.save();

                    // getting flight detail
            const response = await axios.get(`${FlightService_GetFlightDetail}${booking.flightID}`);
            const flightDetails = response.data.data

            await axios.patch(`${FlightService_GetFlightDetail}${booking.flightID}`,{
                totalSeats:flightDetails.totalSeats + booking.noOfSeats
            })

            return "Cancelled";

        } catch (error) {

            throw error;
        }
    }

}

module.exports = bookingService;