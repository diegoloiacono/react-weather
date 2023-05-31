import { useEffect, useState } from "react";
import TextInput from "./assets/components/TextInput";
import useGeolocation from "./assets/logic/useGeoLocation";
import {
  faThermometerHalf,
  faTemperatureArrowUp,
  faTemperatureArrowDown,
  faTint,
  faWind,
  faDownLong,
  faAnglesDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App = () => {
  const defaultCity = useGeolocation();
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState("");

  useEffect(() => {
    setCityName(defaultCity);
  }, [defaultCity]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "4344c6891856a76722a404893740656f";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
        const res = await fetch(apiUrl);
        const jsonData = await res.json();
        setWeatherData(jsonData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (cityName) {
      fetchData();
    }
  }, [cityName]);

  const handleCityChange = (newCity) => {
    setCityName(newCity);
  };

  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/w/${iconCode}.png`;
  };

  const getWindDirection = (degrees) => {
    if (degrees >= 0 && degrees < 45) {
      return "N";
    } else if (degrees >= 45 && degrees < 135) {
      return "E";
    } else if (degrees >= 135 && degrees < 225) {
      return "S";
    } else if (degrees >= 225 && degrees < 315) {
      return "W";
    } else {
      return "N";
    }
  };

  const getRotationStyle = (degrees) => {
    return {
      transform: `rotate(${degrees}deg)`,
    };
  };

  return (
    <div className="container">
      <TextInput onCityChange={handleCityChange} />
      {weatherData.weather ? (
        <div>
          <img
            src={getWeatherIconUrl(weatherData?.weather[0]?.icon)}
            alt={weatherData?.weather[0]?.description}
          />
          <h2 className="city-name">{weatherData?.name}</h2>
          <p className="main-temp">{weatherData?.main?.temp.toFixed()}° C</p>
          <p>Description: {weatherData?.weather[0]?.description}</p>
          <div className="weather-details">
            <table>
              <tbody>
                <tr>
                  <td className="weather-icons">
                    <FontAwesomeIcon icon={faThermometerHalf} />
                  </td>
                  <td>
                    Feels like: {weatherData?.main?.feels_like.toFixed()}° C
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faTemperatureArrowDown} />
                  </td>
                  <td>
                    Min Temperature: {weatherData?.main?.temp_min.toFixed()}° C
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faTemperatureArrowUp} />
                  </td>
                  <td>
                    Max Temperature: {weatherData?.main?.temp_max.toFixed()}° C
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faAnglesDown} />
                  </td>
                  <td>Pressure: {weatherData?.main?.pressure} mb</td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faTint} />
                  </td>
                  <td>Humidity: {weatherData?.main?.humidity}%</td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faWind} />
                  </td>
                  <td>Wind Speed: {weatherData?.wind?.speed} km/h</td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={faDownLong}
                      style={getRotationStyle(weatherData?.wind?.deg)}
                    />
                  </td>
                  <td>
                    Wind Direction: {weatherData?.wind?.deg}° (
                    {getWindDirection(weatherData?.wind?.deg)})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
