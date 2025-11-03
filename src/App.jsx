import "./App.css";
import { useWeatherData } from "./useWeartherData";
import { weatherDictionary } from "./weatherDictionary";

import {
  Sunrise,
  Sunset,
  SunDim,
  Droplet,
  Thermometer,
  Wind,
  WindArrowDown,
  Eye,
} from "lucide-react";

export default function App() {
  const [
    dataReadyState,
    dataError,
    weatherData,
    { showDetails, setShowDetails, selectedDate, setSelectedDate },
  ] = useWeatherData();

  if (dataReadyState === "loading") {
    return <div>Loading...</div>;
  }

  if (dataReadyState === "error") {
    return <div>{dataError}</div>;
  }

  const handleShowDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <main>
      <section>
        <section className="temperature-main-container">
          <h1>Thunder Buddy</h1>
          <section className="main-info-container">
            <div>
              <div className="temperature">
                {weatherData.currentTemperature2m}
              </div>
              <div className="time">{`${weatherData.currentDayName}, ${weatherData.currentDate} ${weatherData.currentHour}`}</div>
              <div>
                <span>
                  {weatherDictionary[weatherData.currentWeatherCode].icon}
                </span>
                <span>
                  {" "}
                  {weatherData.currentMaxTemp}
                  {" / "}
                  {weatherData.currentMinTemp}
                </span>
              </div>
              <div>
                <span>{weatherData.location}</span>
              </div>
            </div>
          </section>

          <section className="hourly-container">
            <section>
              {weatherData.dataForNext24Hours.map((data) => {
                return (
                  <div className="hourly-data-item" key={data.time}>
                    <div>{data.time}</div>
                    <div>{weatherDictionary[data.weatherCode].icon}</div>
                    <div>{data.temperature}</div>
                  </div>
                );
              })}
            </section>
          </section>
        </section>

        <section className="daily-container">
          <table>
            <tbody>
              {weatherData.dataForNext6Days.map((date, index) => {
                return (
                  <tr key={crypto.randomUUID()}>
                    <td>{weatherData.dataForNext6Days[index].date}</td>
                    <td>
                      {
                        weatherDictionary[
                          weatherData.dataForNext6Days[index].weatherCode
                        ].icon
                      }
                    </td>
                    <td>
                      {weatherData.dataForNext6Days[index].minTemp}
                      <span style={{ opacity: 0.4 }}> / </span>
                      {weatherData.dataForNext6Days[index].maxTemp}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="additional-info">
          <div>
            <SunDim className="icon" />
            <div>UV index</div>
            <div>{weatherData.currentUVIndex}</div>
          </div>
          <div>
            <Thermometer className="icon" />
            <div>Feels like</div>
            <div>{weatherData.currentApparentTemperature}</div>
          </div>
          <div>
            <Droplet className="icon" />
            <div>Humidity</div>
            <div>{weatherData.currentRelativeHumidity}</div>
          </div>
          <div>
            <Wind className="icon" />
            <div>Wind speed</div>
            <div>{weatherData.currentWindSpeed}</div>
          </div>
          <div>
            <WindArrowDown className="icon" />
            <div>Air pressure</div>
            <div>{weatherData.currentAirPressure}</div>
          </div>
          <div>
            <Eye className="icon" />
            <div>Visibility</div>
            <div>{weatherData.currentVisibility}</div>
          </div>
        </section>

        <section className="sun-position-container">
          <div className="sun-position-title">
            <div>
              <Sunrise />
              <div>Sunrise</div>
            </div>
            <div>
              <Sunset />
              <div>Sunset</div>
            </div>
          </div>
          <div className="sun-position-hours">
            <div>{weatherData.currentSunriseHour}</div>
            <div>{weatherData.currentSunsetHour}</div>
          </div>
        </section>

        <button onClick={handleShowDetails}>Show next 7 days</button>
      </section>
      {showDetails && (
        <section className="details-menu-container">
          {weatherData.dateForNext7Days.map((date) => {
            return (
              <div
                key={crypto.randomUUID()}
                onClick={() => {
                  setSelectedDate(date.unformattedDate);
                }}
              >
                {date.formattedDate}
              </div>
            );
          })}
        </section>
      )}

      {showDetails && selectedDate !== null && (
        <table className="details-table">
          <thead>
            <tr>
              <th>Hour</th>
              <th>Weather</th>
              <th>Temp.</th>
              <th>Apparent temp.</th>
              <th>Rain</th>
              <th>Showers</th>
              <th>Snowfall</th>
              <th>Relative humidity</th>
              <th>Wind speed</th>
              <th>Wind direction</th>
              <th>Air pressure</th>
              <th>Visibility</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.hourlyNext7Days[selectedDate].map((hour) => {
              return (
                <tr key={crypto.randomUUID()}>
                  <td>{hour.time}</td>
                  <td>{weatherDictionary[hour.weather_code].icon}</td>
                  <td>{hour.temperature}</td>
                  <td>{hour.apparent_temperature}</td>
                  <td>{hour.rain}</td>
                  <td>{hour.showers}</td>
                  <td>{hour.snowfall}</td>
                  <td>{hour.relative_humidity}</td>
                  <td>{hour.wind_speed}</td>
                  <td>{hour.wind_direction}</td>
                  <td>{hour.air_pressure}</td>
                  <td>{hour.visibility}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}
