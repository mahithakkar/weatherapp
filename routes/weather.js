const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).json({ error: 'City not found' });
    }

    const { latitude, longitude, name } = geoData.results[0];

    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    res.json({
      city: name,
      temperature: weatherData.current_weather.temperature,
      windspeed: weatherData.current_weather.windspeed
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

module.exports = router;
