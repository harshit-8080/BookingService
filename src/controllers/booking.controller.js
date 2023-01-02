const bookingService = require("../services/booking.service");
const bookingObj = new bookingService();

exports.createBooking = async (req, res) => {

    try {
        const data = {};
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