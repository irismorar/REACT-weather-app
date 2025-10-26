export function processWeatherData(weatherDataJson, reverseGeocodingJson) {
  console.log("weatherDataJson:", weatherDataJson);
  console.log("reverseGeocodingJson:", reverseGeocodingJson);

  const {
    current: {
      temperature_2m: temperature_2m_temperature,
      apparent_temperature: apparent_temperature_temperature,
    },
    current_units: {
      temperature_2m: temperature_2m_unit,
      apparent_temperature: apparent_temperature_unit,
    },
    daily,
    dailyUnits,
    hourly,
    hourlyUnits,
  } = weatherDataJson;

  const {
    address: { city, village, county, country },
  } = reverseGeocodingJson;

  return {
    location: `${city || village}, ${county}, ${country}`,
    temperature2m: `${temperature_2m_temperature}${temperature_2m_unit}`,
    apparentTemperature: `${apparent_temperature_temperature}${apparent_temperature_unit}`,
  };
}
