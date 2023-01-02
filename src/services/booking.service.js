const {Booking} = require("../models/index");

class bookingService {

    async createBooking(data){

        try {

            const response = await Booking.create(data);
            return response;

        } catch (error) {

            throw error;
        }

    }

}

module.exports = bookingService;