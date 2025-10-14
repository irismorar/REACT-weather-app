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
          <div>
            <span>
              {weatherDictionary[weatherData.currentData.weather_code]}
            </span>
            <span>
              {" "}
              {weatherData.dailyData.temperature_2m_max[0] +
                weatherData.dailyUnitsData.temperature_2m_max}
              {" / "}
              {weatherData.dailyData.temperature_2m_min[0] +
                weatherData.dailyUnitsData.temperature_2m_min}
            </span>
          </div>
          <div>
            Latitude: <span>{weatherData.latitude} </span>
            Longitude: <span> {weatherData.longitude}</span>
          </div>
        </section>

        <section className="daily-container">
          <table>
            <tbody>
              {weatherData.dailyData.time.map((date, index) => {
                return (
                  <tr key={date}>
                    <td>{date}</td>
                    <td>
                      {
                        weatherDictionary[
                          weatherData.dailyData.weather_code[index]
                        ]
                      }
                    </td>
                    <td>
                      {weatherData.dailyData.temperature_2m_max[index] +
                        weatherData.dailyUnitsData.temperature_2m_max}
                      {" / "}
                      {weatherData.dailyData.temperature_2m_min[index] +
                        weatherData.dailyUnitsData.temperature_2m_min}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="additional-info">
          <div>
            <div>logo</div>
            <div>UV index</div>
            <div>
              {weatherData.dailyData.uv_index_max[0] +
                weatherData.dailyUnitsData.uv_index_max}
            </div>
          </div>
          <div>
            <div>logo</div>
            <div>Feels like</div>
            <div>
              {weatherData.currentData.apparent_temperature +
                weatherData.currentUnitsData.apparent_temperature}
            </div>
          </div>
          <div>
            <div>logo</div>
            <div>Humidity</div>
            <div>
              {weatherData.currentData.relative_humidity_2m +
                weatherData.currentUnitsData.relative_humidity_2m}
            </div>
          </div>
          <div>
            <div>logo</div>
            <div>Wind speed</div>
            <div>
              {weatherData.currentData.wind_speed_10m +
                weatherData.currentUnitsData.wind_speed_10m}
            </div>
          </div>
          <div>
            <div>logo</div>
            <div>Air pressure</div>
            <div>
              {weatherData.currentData.pressure_msl +
                weatherData.currentUnitsData.pressure_msl}
            </div>
          </div>
        </section>
        <section className="sun-position-container">
          <span>
            Sunrise:{" "}
            {`${new Date(
              weatherData.dailyData.sunrise[0]
            ).getHours()}:${new Date(
              weatherData.dailyData.sunrise[0]
            ).getMinutes()}`}{" "}
          </span>
          <span>
            Sunset:{" "}
            {`${new Date(
              weatherData.dailyData.sunset[0]
            ).getHours()}:${new Date(
              weatherData.dailyData.sunset[0]
            ).getMinutes()}`}
          </span>
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
    </main>
  );
}
