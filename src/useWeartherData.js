import { useEffect, useState } from "react";
import { processWeatherData } from "./processWeatherData";

export function useWeatherData() {
  const [dataReadyState, setDataReadyState] = useState("loading"); // 'loading' | 'error' | 'ready'
  const [dataError, setDataError] = useState(""); // string
  const [weatherData, setWeatherData] = useState(null); // object | null
  const [showDetails, setShowDetails] = useState(false); // true | false
  const [showDetailsForDate, setShowDetailsForDate] = useState(null); // object | null

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const weatherDataPromise = fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset,uv_index_max,temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,visibility,relative_humidity_2m,apparent_temperature,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl&current=temperature_2m,is_day,wind_speed_10m,relative_humidity_2m,apparent_temperature,pressure_msl,weather_code&timezone=Europe%2FBerlin`
        );
        const reverseGeocodingPromise = fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );

        const [weatherDataResponse, reverseGeocodingResponse] =
          await Promise.all([weatherDataPromise, reverseGeocodingPromise]);

        if (!weatherDataResponse.ok || !reverseGeocodingResponse.ok) {
          setDataReadyState("error");
          setDataError("Failed to fetch weather or location data.");
          return;
        }

        const [weatherDataJson, reverseGeocodingJson] = await Promise.all([
          weatherDataResponse.json(),
          reverseGeocodingResponse.json(),
        ]);

        setWeatherData(
          processWeatherData(weatherDataJson, reverseGeocodingJson)
        );

        setDataReadyState("ready");
      },
      (error) => {
        setDataError(`Could not get current lat/long. ${error.message}`);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (weatherData !== null && weatherData.isDay !== 0) {
      document.body.setAttribute("data-isday", "true");
    } else {
      document.body.setAttribute("data-isday", "false");
    }

    return () => {
      document.body.removeAttribute("data-isday");
    };
  }, [weatherData]);

  return [
    dataReadyState,
    dataError,
    weatherData,
    { showDetails, setShowDetails, showDetailsForDate, setShowDetailsForDate },
  ];
}
