const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

module.exports = {
  PORT,
  FlightService_GetFlightDetail: process.env.FlightService_GetFlightDetail,
  BROKER_URL: process.env.BROKER_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  QUEUE_NAME: process.env.QUEUE_NAME,
  REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
};
