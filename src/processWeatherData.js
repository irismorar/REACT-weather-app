export function processWeatherData(weatherDataJson, reverseGeocodingJson) {
  console.log("weatherDataJson:", weatherDataJson);
  console.log("reverseGeocodingJson:", reverseGeocodingJson);

  const monthName = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const dayName = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const {
    current: {
      temperature_2m: temperature_2m_temperature,
      apparent_temperature: apparent_temperature_temperature,
      is_day: is_day,
      pressure_msl: air_pressure,
      relative_humidity_2m: relative_humidity,
      time: current_time,
      weather_code: weather_code,
      wind_speed_10m: wind_speed_10m,
    },
    current_units: {
      temperature_2m: temperature_2m_unit,
      apparent_temperature: apparent_temperature_unit,
      pressure_msl: air_pressure_unit,
      relative_humidity_2m: relative_humidity_unit,
      wind_speed_10m: wind_speed_10m_unit,
    },
    daily: {
      sunrise: sunrise,
      sunset: sunset,
      time: time_7_days,
      temperature_2m_max: temperature_2m_max,
      temperature_2m_min: temperature_2m_min,
      uv_index_max: uv_index_max,
      weather_code: weather_code_7_days,
    },
    daily_units: {
      temperature_2m_max: temperature_2m_max_unit,
      temperature_2m_min: temperature_2m_min_unit,
      uv_index_max: uv_index_max_unit,
    },
    hourly,
    hourlyUnits,
  } = weatherDataJson;

  const {
    address: { city, village, county, country },
  } = reverseGeocodingJson;

  const current_sunrise_hour = sunrise[0].slice(-5);
  const current_sunset_hour = sunset[0].slice(-5);

  const time_6_days = time_7_days
    .slice(1, 7)
    .map(
      (date) =>
        new Date(date).getDate() +
        " " +
        monthName[new Date(date).getMonth() + 1]
    );

  const max_temp_6_days = time_7_days
    .slice(1, 7)
    .map((_, index) => temperature_2m_max[index] + temperature_2m_max_unit);

  const min_temp_6_days = time_7_days
    .slice(1, 7)
    .map((_, index) => temperature_2m_min[index] + temperature_2m_min_unit);

  return {
    location: `${city || village}, ${county}, ${country}`,
    currentTemperature2m: `${temperature_2m_temperature}${temperature_2m_unit}`,
    currentApparentTemperature: `${apparent_temperature_temperature}${apparent_temperature_unit}`,
    isDay: is_day === 0 ? "night" : "day",
    currentAirPressure: `${air_pressure}${air_pressure_unit}`,
    currentRelativeHumidity: `${relative_humidity}${relative_humidity_unit}`,
    currentDate: `${new Date(current_time).getDate()}${" "}${
      monthName[new Date(current_time).getMonth() + 1]
    }`,
    currentDayName: `${dayName[new Date(current_time).getDay()]}`,
    currentWeatherCode: weather_code,
    currentWindSpeed: `${wind_speed_10m}${wind_speed_10m_unit}`,
    currentSunriseHour: current_sunrise_hour,
    currentSunsetHour: current_sunset_hour,
    currentMaxTemp: `${temperature_2m_max[0]}${temperature_2m_max_unit}`,
    currentMinTemp: `${temperature_2m_min[0]}${temperature_2m_min_unit}`,
    currentUVIndex: `${uv_index_max[0]}${uv_index_max_unit}`,
    time6Days: time_6_days,
    maxTemp6Days: max_temp_6_days,
    minTemp6Days: min_temp_6_days,
  };
}
