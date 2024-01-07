const SensorRegistration = require('./SensorRegistration');

async function registerSensor(id, name, type) {
  try {
    const sensor = new SensorRegistration({ id, name, type });
    const savedSensor = await sensor.save();
    return savedSensor;
  } catch (error) {
    throw new Error('Error registering sensor');
  }
}

module.exports = {
  registerSensor,
};
