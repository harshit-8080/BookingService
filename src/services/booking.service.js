const {booking} = require("../models/index");

class bookingService {

    async createBooking(data){

        try {

            const response = await booking.create(data);
            return response;

        } catch (error) {

            throw error;
        }

    }

}

module.exports = bookingService;