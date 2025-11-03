import {
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
} from "lucide-react";

export const weatherDictionary = {
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
