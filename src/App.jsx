import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=46.75&longitude=23.5&daily=sunrise,sunset,uv_index_max&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,rain,showers,snowfall,snow_depth,cloud_cover,visibility,wind_speed_10m&current=temperature_2m,is_day,rain,showers,snowfall,wind_speed_10m&timezone=Europe%2FBerlin"
      );
      const data = await response.json();
      setWeatherData({
        latitude: data.latitude,
        longitude: data.longitude,
        currentData: data.current,
        currentUnitsData: data.current_units,
        dailyData: data.daily,
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
              Wind speed:
              <span> {weatherData.currentData.wind_speed_10m}</span>
              <span> {weatherData.currentUnitsData.wind_speed_10m}</span>
            </p>
            <p>
              Rain:<span> {weatherData.currentData.rain}</span>
              <span> {weatherData.currentUnitsData.rain}</span>
            </p>
            <p>
              Showers:<span> {weatherData.currentData.showers}</span>
              <span> {weatherData.currentUnitsData.showers}</span>
            </p>
            <p>
              Snowfall:<span> {weatherData.currentData.snowfall}</span>
              <span> {weatherData.currentUnitsData.snowfall}</span>
            </p>
          </section>
          <section className="daily-container">
            <h3>Daily info</h3>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
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
                  <th>Apparent temperature</th>
                  <th>Visibility</th>
                  <th>Wind speed</th>
                  <th>Humidity</th>
                  <th>Precipitation probability</th>
                  <th>Cloud cover</th>
                  <th>Rain</th>
                  <th>Showers</th>
                  <th>Snowfall</th>
                  <th>Snow depth</th>
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
                        {weatherData.hourlyData.apparent_temperature[index] +
                          weatherData.hourlyUnitsData.apparent_temperature}
                      </td>
                      <td>
                        {weatherData.hourlyData.visibility[index] +
                          weatherData.hourlyUnitsData.visibility}
                      </td>
                      <td>
                        {weatherData.hourlyData.wind_speed_10m[index] +
                          weatherData.hourlyUnitsData.wind_speed_10m}
                      </td>
                      <td>
                        {weatherData.hourlyData.relative_humidity_2m[index] +
                          weatherData.hourlyUnitsData.relative_humidity_2m}
                      </td>
                      <td>
                        {weatherData.hourlyData.precipitation_probability[
                          index
                        ] +
                          weatherData.hourlyUnitsData.precipitation_probability}
                      </td>
                      <td>
                        {weatherData.hourlyData.cloud_cover[index] +
                          weatherData.hourlyUnitsData.cloud_cover}
                      </td>
                      <td>
                        {weatherData.hourlyData.rain[index] +
                          weatherData.hourlyUnitsData.rain}
                      </td>
                      <td>
                        {weatherData.hourlyData.showers[index] +
                          weatherData.hourlyUnitsData.showers}
                      </td>
                      <td>
                        {weatherData.hourlyData.snowfall[index] +
                          weatherData.hourlyUnitsData.snowfall}
                      </td>
                      <td>
                        {weatherData.hourlyData.snow_depth[index] +
                          weatherData.hourlyUnitsData.snow_depth}
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
