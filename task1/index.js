const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Importing services
const sensorRegistrationService = require('./sensorRegistrationService');
const sensorDataService = require('./sensorDataService');

const app = express();
app.use(bodyParser.json());

// MongoDB connection string
const MONGODB_URI = 'mongodb://localhost:27017';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Endpoint for registering sensors
app.post('/register-sensor', async (req, res) => {
  try {
    const { id, name, type } = req.body;
    const newSensor = await sensorRegistrationService.registerSensor(id, name, type);
    res.json({ message: 'Sensor registered', sensor: newSensor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Endpoint to receive sensor data
app.post('/send-data/:id', async (req, res) => {
  try {
    const sensorId = req.params.id;
    const data = req.body;
    await sensorDataService.storeSensorData(sensorId, data);
    res.json({ message: 'Data received and stored successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Endpoint to access stored sensor data
app.get('/sensor-data/:id', async (req, res) => {
  try {
    const sensorId = req.params.id;
    const sensorData = await sensorDataService.getSensorData(sensorId);
    res.json({ sensorId, data: sensorData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
