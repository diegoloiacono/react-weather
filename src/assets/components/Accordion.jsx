/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureArrowUp,
  faTemperatureArrowDown,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";

const Accordion = ({ forecastData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const groupForecastByDay = () => {
    const groupedData = {};
    forecastData.list.forEach((item) => {
      const date = new Date(item.dt_txt).toLocaleDateString("en-US");
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });
    return groupedData;
  };

  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/w/${iconCode}.png`;
  };

  const groupedForecastData = groupForecastByDay();

  return (
    <div className="forecast-container">
      {Object.keys(groupedForecastData).map((date, index) => (
        <div key={date}>
          <div onClick={() => handleClick(index)}>
            <h3>
              {date}{" "}
              {activeIndex === index ? (
                <FontAwesomeIcon icon={faSortUp} />
              ) : (
                <FontAwesomeIcon icon={faSortDown} />
              )}
            </h3>
          </div>
          {activeIndex === index && (
            <table>
              <tbody>
                {groupedForecastData[date].map((item) => (
                  <tr key={item.dt_txt}>
                    <td>{item.dt_txt.slice(-8, -3)}</td>
                    <td>{item.weather[0].description}</td>
                    <td>
                      <FontAwesomeIcon icon={faTemperatureArrowDown} />
                    </td>
                    <td>{Math.round(item.main.temp_min)}°C</td>
                    <td>
                      <FontAwesomeIcon icon={faTemperatureArrowUp} />
                    </td>
                    <td>{Math.round(item.main.temp_max)}°C</td>
                    <td>
                      <img
                        src={getWeatherIconUrl(item.weather[0].icon)}
                        alt={item.weather[0].description}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
