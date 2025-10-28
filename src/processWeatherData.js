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
      temperature_2m: current_temperature_2m,
      apparent_temperature: current_apparent_temperature,
      is_day: is_day,
      pressure_msl: current_air_pressure,
      relative_humidity_2m: current_relative_humidity,
      time: current_time,
      weather_code: current_weather_code,
      wind_speed_10m: current_wind_speed_10m,
    },
    current_units: {
      temperature_2m: temperature_2m_unit,
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
    daily_units: { uv_index_max: uv_index_unit },
    hourly: {
      time: hourly_time,
      temperature_2m: hourly_temperature_2m,
      visibility: hourly_visibility,
      weather_code: hourly_weather_code,
      apparent_temperature: hourly_apparent_temperature,
      rain: hourly_rain,
      showers: hourly_showers,
      snowfall: hourly_snowfall,
      relative_humidity_2m: hourly_relative_humidity_2m,
      wind_speed_10m: hourly_wind_speed_10m,
      wind_direction_10m: hourly_wind_direction_10m,
      pressure_msl: hourly_pressure_msl,
    },
    hourly_units: {
      visibility: visibility_unit,
      rain: rain_unit,
      showers: showers_unit,
      snowfall: snowfall_unit,
      wind_direction_10m: wind_direction_10m_unit,
    },
  } = weatherDataJson;

  const {
    address: { city, village, county, country },
  } = reverseGeocodingJson;

  const current_sunrise_hour = sunrise[0].slice(-5);
  const current_sunset_hour = sunset[0].slice(-5);

  const data_for_next_6_days = time_7_days.slice(1, 7).map((date, index) => {
    return {
      date: `${date.slice(-2)} ${monthName[Number(date.slice(5, 7))]}`,
      weatherCode: weather_code_7_days[index],
      maxTemp: `${temperature_2m_max[index]}${temperature_2m_unit}`,
      minTemp: `${temperature_2m_min[index]}${temperature_2m_unit}`,
    };
  });

  const index_of_current_hour = hourly_time
    .slice(0, 24)
    .findIndex(
      (itemIndex) => new Date().getHours() === new Date(itemIndex).getHours()
    );
  const start_index = index_of_current_hour !== -1 ? index_of_current_hour : 0;
  const next_24_Hours = hourly_time.slice(start_index, start_index + 24);
  const data_for_next_24_hours = next_24_Hours.map((hour, index) => {
    return {
      time: hour.slice(-5),
      weatherCode: hourly_weather_code[start_index + index],
      temperature:
        hourly_temperature_2m[start_index + index] + temperature_2m_unit,
    };
  });

  const current_visibility =
    hourly_visibility[index_of_current_hour] / 1000 + "km";

  const date_for_next_7_days = time_7_days.map((date) => {
    return {
      formattedDate: `${date.slice(-2)} ${monthName[Number(date.slice(5, 7))]}`,
      unformattedDate: `${date}`,
    };
  });

  return {
    location: `${city || village}, ${county}, ${country}`,
    currentTemperature2m: `${current_temperature_2m}${temperature_2m_unit}`,
    currentApparentTemperature: `${current_apparent_temperature}${temperature_2m_unit}`,
    isDay: is_day === 0 ? "night" : "day",
    currentAirPressure: `${current_air_pressure}${air_pressure_unit}`,
    currentRelativeHumidity: `${current_relative_humidity}${relative_humidity_unit}`,
    currentDate: date_for_next_7_days[0].formattedDate,
    currentDayName: `${dayName[new Date(current_time).getDay()]}`,
    currentWeatherCode: current_weather_code,
    currentWindSpeed: `${current_wind_speed_10m}${wind_speed_10m_unit}`,
    currentSunriseHour: current_sunrise_hour,
    currentSunsetHour: current_sunset_hour,
    currentMaxTemp: `${temperature_2m_max[0]}${temperature_2m_unit}`,
    currentMinTemp: `${temperature_2m_min[0]}${temperature_2m_unit}`,
    currentUVIndex: `${uv_index_max[0]}${uv_index_unit}`,
    currentVisibility: current_visibility,
    dataForNext6Days: data_for_next_6_days,
    dataForNext24Hours: data_for_next_24_hours,
    dateForNext7Days: date_for_next_7_days,
  };
}
