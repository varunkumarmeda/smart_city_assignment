const mongoose = require('mongoose');

const sensorRegistrationSchema = new mongoose.Schema({
  id: { type: int, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
});

const SensorRegistration = mongoose.model('SensorRegistration', sensorRegistrationSchema);

module.exports = SensorRegistration;
