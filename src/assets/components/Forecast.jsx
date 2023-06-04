/* eslint-disable react/prop-types */

import Accordion from "./Accordion";

const Forecast = ({ forecastData, isLoading, error }) => {
  return (
    <div>
      <h2 className="forecast-title">Forecast</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && <Accordion forecastData={forecastData} />}
    </div>
  );
};

export default Forecast;
