/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureArrowUp,
  faTemperatureArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const Forecast = ({ forecastData, isLoading, error }) => {
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/w/${iconCode}.png`;
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const displayedForecastData = forecastData.list.slice(0, 10);

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Icon</th>
              <th>Description</th>
              <th>
                <FontAwesomeIcon icon={faTemperatureArrowDown} />
                Min Temp
              </th>
              <th>
                <FontAwesomeIcon icon={faTemperatureArrowUp} />
                Max Temp
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedForecastData.map((item) => {
              const date = new Date(item.dt_txt);
              const formattedTime = `${date
                .getHours()
                .toString()
                .padStart(2, "0")}:00`;

              return (
                <tr key={item.dt_txt}>
                  <td>{item.dt_txt.slice(5, 10)}</td>
                  <td>{formattedTime}</td>
                  <td>
                    <img
                      src={getWeatherIconUrl(item.weather[0].icon)}
                      alt={item.weather[0].description}
                    />
                  </td>
                  <td>{item.weather[0].description}</td>
                  <td>{Math.round(item.main.temp_min)}°C</td>
                  <td>{Math.round(item.main.temp_max)}°C</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Forecast;
