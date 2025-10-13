import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const weatherDictionary = {
    0: "clear sky",
    1: "mainly clear",
    2: "partly cloudy",
    3: "overcast",
    45: "fog",
    48: "depositing rime fog",
    51: "light drizzle",
    53: "moderate drizzle",
    55: "dense drizzle",
    56: "light freezing drizzle",
    57: "dense freezing drizzle",
    61: "slight rain",
    63: "moderate rain",
    65: "heavy rain",
    66: "light freezing rain",
    67: "heavy freezing rain",
    71: "slight snow fall",
    73: "moderate snow fall",
    75: "heavy snow fall",
    77: "snow grains",
    80: "slight rain showers",
    81: "moderate rain showers",
    82: "violent rain showers",
    85: "slight snow showers",
    86: "heavy snow showers",
    95: "thunderstorm",
    96: "slight hail thunderstorm",
    99: "heavy hail thunderstorm",
  };
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=46.75&longitude=23.5&daily=sunrise,sunset,uv_index_max,temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,visibility&current=temperature_2m,is_day,wind_speed_10m,relative_humidity_2m,apparent_temperature,pressure_msl,weather_code&timezone=Europe%2FBerlin"
      );
      const data = await response.json();
      setWeatherData({
        latitude: data.latitude,
        longitude: data.longitude,
        currentData: data.current,
        currentUnitsData: data.current_units,
        dailyData: data.daily,
        dailyUnitsData: data.daily_units,
        hourlyData: data.hourly,
        hourlyUnitsData: data.hourly_units,
      });
      console.log(data);
      setIsLoading(false);
    } catch (errorObject) {
      setError(`⚠️ Could not load weather data. ${errorObject.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  useEffect(() => {
    if (weatherData.currentData?.is_day !== 0) {
      document.body.setAttribute("data-isday", "true");
    } else {
      document.body.setAttribute("data-isday", "false");
    }

    return () => {
      document.body.removeAttribute("data-isday");
    };
  }, [weatherData.currentData?.is_day]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main>
      <h1>Thunder Buddy</h1>
      <section>
        <section className="main-info-container">
          <div className="temperature">
            {weatherData.currentData.temperature_2m +
              weatherData.currentUnitsData.temperature_2m}
          </div>
          <div className="time">
            {weatherData.currentData.time.replace("T", " ")}
          </div>
        </section>
        <section className="additional-info">
          <h2>Mother Nature’s Tantrums</h2>
          <section className="current-container">
            <h3>Current info</h3>
            <p>
              Latitude: <span>{weatherData.latitude}</span>
            </p>
            <p>
              Longitude: <span>{weatherData.longitude}</span>
            </p>
            <p>
              Weather:
              <span>
                {" "}
                {weatherDictionary[weatherData.currentData.weather_code]}
              </span>
            </p>
            <p>
              Max temperature:
              <span>
                {" "}
                {weatherData.dailyData.temperature_2m_max[0] +
                  weatherData.dailyUnitsData.temperature_2m_max}
              </span>
            </p>
            <p>
              Min temperature:
              <span>
                {" "}
                {weatherData.dailyData.temperature_2m_min[0] +
                  weatherData.dailyUnitsData.temperature_2m_min}
              </span>
            </p>
            <p>
              UV index:
              <span>
                {" "}
                {weatherData.dailyData.uv_index_max[0] +
                  weatherData.dailyUnitsData.uv_index_max}
              </span>
            </p>
            <p>
              Wind speed:
              <span>
                {" "}
                {weatherData.currentData.wind_speed_10m +
                  weatherData.currentUnitsData.wind_speed_10m}
              </span>
            </p>
            <p>
              Humidity:
              <span>
                {" "}
                {weatherData.currentData.relative_humidity_2m +
                  weatherData.currentUnitsData.relative_humidity_2m}
              </span>
            </p>
            <p>
              Air pressure:
              <span>
                {" "}
                {weatherData.currentData.pressure_msl +
                  weatherData.currentUnitsData.pressure_msl}
              </span>
            </p>
            <p>
              Feels like:
              <span>
                {" "}
                {weatherData.currentData.apparent_temperature +
                  weatherData.currentUnitsData.apparent_temperature}
              </span>
            </p>
          </section>
          <section className="daily-container">
            <h3>Daily info</h3>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Max</th>
                  <th>Min</th>
                  <th>Sunrise</th>
                  <th>Sunset</th>
                  <th>UV index</th>
                </tr>
              </thead>
              <tbody>
                {weatherData.dailyData.time.map((date, index) => {
                  return (
                    <tr key={date}>
                      <td>{date}</td>
                      <td>
                        {weatherData.dailyData.temperature_2m_max[index] +
                          weatherData.dailyUnitsData.temperature_2m_max}
                      </td>
                      <td>
                        {weatherData.dailyData.temperature_2m_min[index] +
                          weatherData.dailyUnitsData.temperature_2m_min}
                      </td>
                      <td>
                        {`${new Date(
                          weatherData.dailyData.sunrise[index]
                        ).getHours()}:${new Date(
                          weatherData.dailyData.sunrise[index]
                        ).getMinutes()}`}
                      </td>
                      <td>
                        {`${new Date(
                          weatherData.dailyData.sunset[index]
                        ).getHours()}:${new Date(
                          weatherData.dailyData.sunset[index]
                        ).getMinutes()}`}
                      </td>
                      <td>{weatherData.dailyData.uv_index_max[index]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
          <section className="hourly-container">
            <h3>Hourly info</h3>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Temperature</th>
                  <th>Visibility</th>
                </tr>
              </thead>
              <tbody>
                {weatherData.hourlyData.time.map((time, index) => {
                  return (
                    <tr key={time}>
                      <td>{time.replace("T", " ")}</td>
                      <td>
                        {weatherData.hourlyData.temperature_2m[index] +
                          weatherData.hourlyUnitsData.temperature_2m}
                      </td>
                      <td>
                        {weatherData.hourlyData.visibility[index] +
                          weatherData.hourlyUnitsData.visibility}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </section>
      </section>
    </main>
  );
}
