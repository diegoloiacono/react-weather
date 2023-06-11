/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerHalf,
  faTemperatureArrowUp,
  faTemperatureArrowDown,
  faTint,
  faWind,
  faDownLong,
  faAnglesDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  getWeatherIconUrl,
  getWindDirection,
  getRotationStyle,
  getTemperatureClass,
  dateBuilder,
} from "../logic/utils";

const WeatherDetails = ({ weatherData }) => {
  const { name, main, weather, wind } = weatherData;
  const [temperatureClass, setTemperatureClass] = useState("");

  useEffect(() => {
    setTemperatureClass(getTemperatureClass(main?.temp));
    updateBodyBackground(temperatureClass);
  }, [main?.temp, temperatureClass]);

  const updateBodyBackground = (className) => {
    document.body.className = className;
  };

  return (
    <div>
      <img
        src={getWeatherIconUrl(weather[0].icon)}
        alt={weather[0]?.description}
      />
      <h2>{name}</h2>
      <p>{dateBuilder(new Date())}</p>
      <p>{main?.temp.toFixed()}° C</p>
      <p>Description: {weather[0]?.description}</p>
      <table>
        <tr>
          <td>
            <FontAwesomeIcon icon={faThermometerHalf} />
          </td>
          <td>Feels like: {main?.feels_like.toFixed()}° C</td>
        </tr>
        <tr>
          <td>
            <FontAwesomeIcon icon={faTemperatureArrowDown} />
          </td>
          <td>Min Temperature: {main?.temp_min.toFixed()}° C</td>
        </tr>
        <tr>
          <td>
            <FontAwesomeIcon icon={faTemperatureArrowUp} />
          </td>
          <td>Max Temperature: {main?.temp_max.toFixed()}° C</td>
        </tr>
        <tr>
          <td>
            <FontAwesomeIcon icon={faAnglesDown} />
          </td>
          <td>Pressure: {main?.pressure} mb</td>
        </tr>
        <tr>
          <td>
            <FontAwesomeIcon icon={faTint} />
          </td>
          <td>Humidity: {main?.humidity}%</td>
        </tr>
        <tr>
          <td>
            <FontAwesomeIcon icon={faWind} />
          </td>
          <td>Wind Speed: {wind?.speed} km/h</td>
        </tr>
        <tr>
          <td>
            <FontAwesomeIcon
              icon={faDownLong}
              style={getRotationStyle(wind?.deg)}
            />
          </td>
          <td>
            Wind Direction: {wind?.deg}° ({getWindDirection(wind?.deg)})
          </td>
        </tr>
      </table>
    </div>
  );
};

export default WeatherDetails;
