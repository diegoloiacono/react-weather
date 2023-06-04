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

const WeatherDetails = ({ weatherData }) => {
  const { name, main, weather, wind } = weatherData;
  const [temperatureClass, setTemperatureClass] = useState("");

  useEffect(() => {
    setTemperatureClass(getTemperatureClass(main?.temp));
    updateBodyBackground(temperatureClass);
  }, [main?.temp, temperatureClass]);

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

  const getTemperatureClass = (temperature) => {
    if (temperature <= 10) {
      return "blue-gradient";
    } else if (temperature > 10 && temperature <= 30) {
      return "orange-gradient";
    } else {
      return "red-gradient";
    }
  };

  const updateBodyBackground = (className) => {
    document.body.className = className;
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div>
      <img
        src={getWeatherIconUrl(weather[0].icon)}
        alt={weather[0]?.description}
      />
      <h2 className="city-name">{name}</h2>
      <p>{dateBuilder(new Date())}</p>
      <p className="main-temp">{main?.temp.toFixed()}° C</p>
      <p>Description: {weather[0]?.description}</p>
      <table>
        <tbody>
          <tr>
            <td className="weather-icons">
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
        </tbody>
      </table>
    </div>
  );
};

export default WeatherDetails;
