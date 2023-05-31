import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationApi = `https://ipapi.co/json/`;
        const res = await fetch(locationApi);
        const data = await res.json();
        setCityName(data.city);
      } catch (error) {
        console.error("Error fetching geolocation data:", error);
      }
    };

    fetchData();
  }, []);

  return cityName;
};

export default useGeolocation;
