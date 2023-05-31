import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./TextInput.css";

const TextInput = ({ onCityChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const handleChange = async (e) => {
    setInputValue(e.target.value);
    filterCityOptions(e.target.value);
  };

  const filterCityOptions = async (value) => {
    try {
      const url = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "1d85af3a9amsh3359b996a734930p16ae83jsn0480b52ddb39",
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      };
      const response = await fetch(`${url}?namePrefix=${value}`, options);
      const data = await response.json();
      setCityOptions(data.data || []);
      setShowMenu(true);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const handleOptionClick = (cityName) => {
    setInputValue(cityName);
    onCityChange(cityName);
    setCityOptions([]);
    setShowMenu(false);
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="input-container">
      <input
        className="search-box"
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleChange}
      />
      {showMenu && cityOptions.length > 0 && (
        <ul className="city-options" ref={menuRef}>
          {cityOptions.map((city) => (
            <li
              key={city.id}
              onMouseDown={() => handleOptionClick(city.name)}
              className="option"
            >
              {city.name}, {city.region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

TextInput.propTypes = {
  onCityChange: PropTypes.func.isRequired,
};

export default TextInput;
