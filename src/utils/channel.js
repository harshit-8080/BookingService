const amqplib = require("amqplib");
const {
  BROKER_URL,
  EXCHANGE_NAME,
  QUEUE_NAME,
} = require("../config/server.config");

const createChannel = async () => {
  try {
    const connection = await amqplib.connect(BROKER_URL);
    const channel = await connection.createChannel();

    // ! exchange broker (distribute to different channels queue) using binding keys
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);

    return channel;
  } catch (error) {
    throw error;
  }
};

const publish = async (channel, binding_key, message) => {
  try {
    await channel.assertQueue(QUEUE_NAME);
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {}
};

const subscribe = async (channel, binding_key, service) => {
  try {
    const applicationQueue = await channel.assertQueue(QUEUE_NAME);
    channel.bindQueue(applicationQueue.queue, (msg) => {
      console.log("received data");
      console.log(msg.content.toString());
      channel.ack(msg);
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createChannel,
  publish,
  subscribe,
};

//  http://localhost:15672 ==> rabbitmq url