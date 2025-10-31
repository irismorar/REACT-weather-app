import { useWeatherData } from "./useWeartherData";
import "./App.css";
import {
  Sunrise,
  Sunset,
  Sun,
  Cloud,
  CloudSun,
  Cloudy,
  CloudFog,
  CloudDrizzle,
  CloudHail,
  CloudSnow,
  CloudRain,
  CloudRainWind,
  Snowflake,
  SunSnow,
  CloudLightning,
  Zap,
  SunDim,
  Droplet,
  Thermometer,
  Wind,
  WindArrowDown,
  Eye,
} from "lucide-react";

const weatherDictionary = {
  0: {
    name: "clear sky",
    icon: <Sun />,
  },
  1: {
    name: "mainly clear",
    icon: <CloudSun />,
  },
  2: {
    name: "partly cloudy",
    icon: <Cloud />,
  },
  3: {
    name: "overcast",
    icon: <Cloudy />,
  },
  45: {
    name: "fog",
    icon: <CloudFog />,
  },
  48: {
    name: "depositing rime fog",
    icon: <CloudFog />,
  },
  51: {
    name: "light drizzle",
    icon: <CloudDrizzle />,
  },
  53: {
    name: "moderate drizzle",
    icon: <CloudDrizzle />,
  },
  55: {
    name: "dense drizzle",
    icon: <CloudHail />,
  },
  56: {
    name: "light freezing drizzle",
    icon: <CloudSnow />,
  },
  57: {
    name: "dense freezing drizzle",
    icon: <CloudSnow />,
  },
  61: {
    name: "slight rain",
    icon: <CloudRain />,
  },
  63: {
    name: "moderate rain",
    icon: <CloudRain />,
  },
  65: {
    name: "heavy rain",
    icon: <CloudRainWind />,
  },
  66: {
    name: "light freezing rain",
    icon: <CloudSnow />,
  },
  67: {
    name: "heavy freezing rain",
    icon: <CloudSnow />,
  },
  71: {
    name: "slight snow fall",
    icon: <SunSnow />,
  },
  73: {
    name: "moderate snow fall",
    icon: <Snowflake />,
  },
  75: {
    name: "heavy snow fall",
    icon: <Snowflake />,
  },
  77: {
    name: "snow grains",
    icon: <CloudSnow />,
  },
  80: {
    name: "slight rain showers",
    icon: <CloudRain />,
  },
  81: {
    name: "moderate rain showers",
    icon: <CloudRain />,
  },
  82: {
    name: "violent rain showers",
    icon: <CloudRainWind />,
  },
  85: {
    name: "slight snow showers",
    icon: <SunSnow />,
  },
  86: {
    name: "heavy snow showers",
    icon: <Snowflake />,
  },
  95: {
    name: "thunderstorm",
    icon: <Zap />,
  },
  96: {
    name: "slight hail thunderstorm",
    icon: <CloudLightning />,
  },
  99: {
    name: "heavy hail thunderstorm",
    icon: <Zap />,
  },
};

export default function App() {
  const [
    dataReadyState,
    dataError,
    weatherData,
    { showDetails, setShowDetails, showDetailsForDate, setShowDetailsForDate },
  ] = useWeatherData();

  console.log("data ready state:", dataReadyState);
  console.log("data error:", dataError);
  console.log("weather data:", weatherData);
  console.log("------------------------------");

  // ---------------------------------------------------------------------------

  // const [weatherData, setWeatherData] = useState({});
  // const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [currentPosition, setCurrentPosition] = useState({});
  // const [deviceLocation, setDeviceLocation] = useState({});

  // const fetchWeatherData = useCallback(async () => {
  //   if (
  //     currentPosition.latitude === undefined ||
  //     currentPosition.longitude === undefined
  //   ) {
  //     return;
  //   }
  //   try {
  //     const response = await fetch(
  //       `https://api.open-meteo.com/v1/forecast?latitude=${currentPosition.latitude}&longitude=${currentPosition.longitude}&daily=sunrise,sunset,uv_index_max,temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,visibility,relative_humidity_2m,apparent_temperature,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl&current=temperature_2m,is_day,wind_speed_10m,relative_humidity_2m,apparent_temperature,pressure_msl,weather_code&timezone=Europe%2FBerlin`
  //     );
  //     const data = await response.json();
  //     setWeatherData({
  //       currentData: data.current,
  //       currentUnitsData: data.current_units,
  //       dailyData: data.daily,
  //       dailyUnitsData: data.daily_units,
  //       hourlyData: data.hourly,
  //       hourlyUnitsData: data.hourly_units,
  //     });
  //     setIsLoading(false);
  //   } catch (errorObject) {
  //     setError(`⚠️ Could not load weather data. ${errorObject.message}`);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [currentPosition.latitude, currentPosition.longitude]);

  // const fetchLocation = useCallback(async () => {
  //   if (
  //     currentPosition.latitude === undefined ||
  //     currentPosition.longitude === undefined
  //   ) {
  //     return;
  //   }
  //   try {
  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/reverse?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}&format=json`
  //     );
  //     const data = await response.json();
  //     setDeviceLocation({
  //       country: data.address.country,
  //       county: data.address.county,
  //       locality: data.address.village || data.address.city,
  //     });
  //   } catch (errorObj) {
  //     setError(`⚠️ Could not load position data. ${errorObj.message}`);
  //   }
  // }, [currentPosition.latitude, currentPosition.longitude]);

  // useEffect(() => {
  //   fetchWeatherData();
  //   fetchLocation();
  // }, [fetchWeatherData, fetchLocation]);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       setCurrentPosition({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //     },
  //     (errorMessage) => {
  //       // console.log(errorMessage);
  //     },
  //     { enableHighAccuracy: true }
  //   );
  // }, []);

  if (dataReadyState === "loading") {
    return <div>Loading...</div>;
  }

  if (dataReadyState === "error") {
    return <div>{dataError}</div>;
  }

  // const indexOfCurrentHour = weatherData.hourlyData.time
  //   .slice(0, 24)
  //   .findIndex(
  //     (itemIndex) => new Date().getHours() === new Date(itemIndex).getHours()
  //   );

  // const startIndex = indexOfCurrentHour !== -1 ? indexOfCurrentHour : 0;
  // const next24Hours = weatherData.hourlyData.time.slice(
  //   startIndex,
  //   startIndex + 24
  // );

  const handleShowDetails = () => {
    setShowDetails((prev) => !prev);
  };

  // const selectedDateFirstHourIndex = weatherData.hourlyData.time.findIndex(
  //   (date) => {
  //     return new Date(specificDateData).getDate() === new Date(date).getDate();
  //   }
  // );

  // const sunsetMinutes =
  //   new Date(weatherData.dailyData.sunset[0]).getHours() * 60 +
  //   new Date(weatherData.dailyData.sunset[0]).getMinutes();
  // // console.log("sunset in minutes:", sunsetMinutes);

  // const sunriseMinutes =
  //   new Date(weatherData.dailyData.sunrise[0]).getHours() * 60 +
  //   new Date(weatherData.dailyData.sunrise[0]).getMinutes();
  // // console.log("sunrise in minutes:", sunriseMinutes);

  // const minutesBetweenSunriseAndSunset = sunsetMinutes - sunriseMinutes;
  // // console.log(
  // //   "minutes between sunrise and sunset",
  // //   minutesBetweenSunriseAndSunset,
  // // );

  // const currentHourMinutes =
  //   new Date().getHours() * 60 + new Date().getMinutes();
  // // console.log("current hour in minutes:", currentHourMinutes);

  // const minutesBetweenCurrentHourAndSunrise =
  //   currentHourMinutes - sunriseMinutes;
  // // console.log(
  // //   "minutes between current hour and sunrise:",
  // //   minutesBetweenCurrentHourAndSunrise,
  // // );

  // const currentSunPositionPercent =
  //   (minutesBetweenSunriseAndSunset / minutesBetweenCurrentHourAndSunrise) *
  //   100;
  // // console.log("the percent:", currentSunPositionPercent);

  return (
    <main>
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
                <div className="hourly-data-container" key={data.time}>
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
                    {weatherData.dataForNext6Days[index].maxTemp}
                    {" / "}
                    {weatherData.dataForNext6Days[index].minTemp}
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
        <div className="sun-position-bar">
          <div
            className="progress-bar-white"
            // style={{ width: `${currentSunPositionPercent}%` }}
          ></div>
          <div className="progress-bar-grey"></div>
        </div>
        <div className="sun-position-hours">
          <div>{weatherData.currentSunriseHour}</div>
          <div>{weatherData.currentSunsetHour}</div>
        </div>
      </section>

      <button onClick={handleShowDetails}>Show details</button>
      {showDetails && (
        <section className="details-menu-container">
          {weatherData.dateForNext7Days.map((date) => {
            return (
              <div
                key={crypto.randomUUID()}
                onClick={() => {
                  setShowDetailsForDate(date.unformattedDate);
                }}
              >
                {date.formattedDate}
              </div>
            );
          })}
        </section>
      )}

      {showDetails && showDetailsForDate !== null && (
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
            {weatherData.dateForNext7Days.map(({ unformattedDay }) => {
              weatherData.hourlyNext7Days[unformattedDay].map((hour) => {
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
              });
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}
