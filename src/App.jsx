import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=46.7873443398859&longitude=23.54228778363968&current=temperature_2m,is_day,rain,showers,snowfall,wind_speed_10m"
      );
      const data = await response.json();
      if (data) {
        setError(null);
        setIsLoading(false);
      }
      setWeatherData({
        latitude: data.latitude,
        longitude: data.longitude,
        currentData: data.current,
        currentUnitsData: data.current_units,
      });
      console.log(data);
    } catch (errorMessage) {
      console.error(errorMessage);
      setError("⚠️ Could not load weather data");
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
      document.body.removeAttribute(false);
    };
  }, [weatherData.currentData?.is_day]);

  return (
    <main>
      <h1>Thunder Buddy</h1>

      {isLoading && <div>Loading...</div>}
      {error && <div className="error_container">{error}</div>}

      {!error && !isLoading && (
        <section>
          <section className="current-info-container">
            <div className="temperature">
              {weatherData.currentData?.temperature_2m +
                weatherData.currentUnitsData?.temperature_2m}
            </div>
            <div className="time">
              {weatherData.currentData?.time.replace("T", " ")}
            </div>
          </section>
          <section className="additional-info">
            <h3>Mother Nature’s Tantrums</h3>
            <div>
              <p>
                Wind speed:
                <span> {weatherData.currentData?.wind_speed_10m}</span>
                <span> {weatherData.currentUnitsData?.wind_speed_10m}</span>
              </p>
              <p>
                Rain:<span> {weatherData.currentData?.rain}</span>
                <span> {weatherData.currentUnitsData?.rain}</span>
              </p>
              <p>
                Showers:<span> {weatherData.currentData?.showers}</span>
                <span> {weatherData.currentUnitsData?.showers}</span>
              </p>
              <p>
                Snowfall:<span> {weatherData.currentData?.snowfall}</span>
                <span> {weatherData.currentUnitsData?.snowfall}</span>
              </p>
            </div>
          </section>
          <p>
            What a fine{" "}
            {weatherData.currentData?.is_day === 0 ? "night " : "day "}
            to be lost at <span>{weatherData.latitude} latitude</span>
            <span> and {weatherData.longitude} longitude</span>
          </p>
        </section>
      )}
    </main>
  );
}
