const mqtt = require('mqtt');

const { updateData } = require('../controllers/roomController');
const { connections } = require('./websocket');

const options = {};

const broker = 'mqtt://broker.mqttdashboard.com:1883';

const connectMQTTAndSubcribe = (topic) => {
  try {
    const client = mqtt.connect(broker, options);

    console.log('MQTT connected!');
    client.on('connect', () => {
      client.subscribe(topic);
    });
    client.on('message', (tp, msg) => {
      var data = JSON.parse(msg);

      console.log('Received MQTT msg: ', data);

      updateData(data);

      connections.forEach((connect) => {
        connect.sendUTF(JSON.stringify(data));
      });
    });
  } catch (err) {
    console.log({
      result: 'fail',
      message: 'connect MQTT fail',
      err: err.message,
    });
  }
};

module.exports = connectMQTTAndSubcribe;
