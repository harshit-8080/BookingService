const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

module.exports = {
    PORT,
    FlightService_GetFlightDetail:process.env.FlightService_GetFlightDetail
}