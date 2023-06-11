export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/w/${iconCode}.png`;
};

export const getWindDirection = (degrees) => {
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

export const getRotationStyle = (degrees) => {
  return {
    transform: `rotate(${degrees}deg)`,
  };
};

export const getTemperatureClass = (temperature) => {
  if (temperature <= 10) {
    return "blue-gradient";
  } else if (temperature > 10 && temperature <= 30) {
    return "orange-gradient";
  } else {
    return "red-gradient";
  }
};

export const dateBuilder = (d) => {
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
