import { useEffect, useState } from "react";
import TextInput from "./assets/components/TextInput";
import useGeolocation from "./assets/logic/useGeoLocation";
import useWeatherData from "./assets/logic/useWeatherData";
import WeatherDetails from "./assets/components/WeatherDetails";
import Forecast from "./assets/components/Forecast";

const apiKey = "4344c6891856a76722a404893740656f";

const App = () => {
  const defaultCity = useGeolocation();
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    setCityName(defaultCity);
  }, [defaultCity]);

  const handleCityChange = (newCity) => {
    setCityName(newCity);
  };

  const { weatherData, forecastData, isLoading, error } = useWeatherData(
    cityName,
    apiKey
  );

  if (Object.keys(weatherData).length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <TextInput onCityChange={handleCityChange} />

      <WeatherDetails weatherData={weatherData} />
      <Forecast
        forecastData={forecastData}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default App;
