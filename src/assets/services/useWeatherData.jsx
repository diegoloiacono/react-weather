import { useEffect, useState } from "react";

const useWeatherData = (cityName, apiKey) => {
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;

        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();
        setWeatherData(currentWeatherData);

        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (cityName) {
      fetchData();
    }
  }, [cityName, apiKey]);

  return { weatherData, forecastData, isLoading, error };
};

export default useWeatherData;
