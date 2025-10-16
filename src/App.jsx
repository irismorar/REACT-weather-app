import { useEffect, useState } from "react";
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

  const indexOfCurrentHour = weatherData.hourlyData.time
    .slice(0, 24)
    .findIndex((item) => new Date().getHours() === new Date(item).getHours());

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
              {weatherDictionary[weatherData.currentData.weather_code].name}
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

        <section className="hourly-container">
          <section>
            {weatherData.hourlyData.time.slice(0, 24).map((time, index) => {
              return (
                <div className="hourly-data-container" key={time}>
                  <div>{time.slice(-5)}</div>
                  <div>
                    {
                      weatherDictionary[weatherData.currentData.weather_code]
                        .icon
                    }
                  </div>
                  <div>
                    {weatherData.hourlyData.temperature_2m[index] +
                      weatherData.hourlyUnitsData.temperature_2m}
                  </div>
                </div>
              );
            })}
          </section>
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
                        ].icon
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
            <SunDim />
            <div>UV index</div>
            <div>
              {weatherData.dailyData.uv_index_max[0] +
                weatherData.dailyUnitsData.uv_index_max}
            </div>
          </div>
          <div>
            <Thermometer />
            <div>Feels like</div>
            <div>
              {weatherData.currentData.apparent_temperature +
                weatherData.currentUnitsData.apparent_temperature}
            </div>
          </div>
          <div>
            <Droplet />
            <div>Humidity</div>
            <div>
              {weatherData.currentData.relative_humidity_2m +
                weatherData.currentUnitsData.relative_humidity_2m}
            </div>
          </div>
          <div>
            <Wind />
            <div>Wind speed</div>
            <div>
              {weatherData.currentData.wind_speed_10m +
                weatherData.currentUnitsData.wind_speed_10m}
            </div>
          </div>
          <div>
            <WindArrowDown />
            <div>Air pressure</div>
            <div>
              {weatherData.currentData.pressure_msl +
                weatherData.currentUnitsData.pressure_msl}
            </div>
          </div>
          <div>
            <Eye />
            <div>Visibility</div>
            <div>
              {weatherData.hourlyData.visibility[indexOfCurrentHour] +
                weatherData.hourlyUnitsData.visibility}
            </div>
          </div>
        </section>
        <section className="sun-position-container">
          <div>
            <Sunrise />
            <div>Sunrise</div>
            <div>{`${new Date(
              weatherData.dailyData.sunrise[0]
            ).getHours()}:${new Date(
              weatherData.dailyData.sunrise[0]
            ).getMinutes()}`}</div>
          </div>
          <div>
            <Sunset />
            <div>Sunset</div>
            <div>{`${new Date(
              weatherData.dailyData.sunset[0]
            ).getHours()}:${new Date(
              weatherData.dailyData.sunset[0]
            ).getMinutes()}`}</div>
          </div>
        </section>
      </section>
    </main>
  );
}
