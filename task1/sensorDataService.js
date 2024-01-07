const SensorData = require('./SensorData');

async function storeSensorData(sensorId, data) {
  try {
    const sensorData = new SensorData({ sensorId, data });
    const savedData = await sensorData.save();
    return savedData;
  } catch (error) {
    throw new Error('Error storing sensor data');
  }
}

async function getSensorData(sensorId) {
  try {
    const sensorData = await SensorData.find({ sensorId });
    return sensorData;
  } catch (error) {
    throw new Error('Error retrieving sensor data');
  }
}

module.exports = {
  storeSensorData,
  getSensorData,
};
