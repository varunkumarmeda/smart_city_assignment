const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  sensorId: { type: int, required: true },
  data: [{ type: int, required: true }], 
  timestamp: { type: Date, default: Date.now },
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;
