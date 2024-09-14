import React, { useState } from "react";
import { FiSun } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import "./WeatherApp.css";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiWeatherSunny } from "react-icons/ti";
import { TiWeatherStormy } from "react-icons/ti";

function Temprature({ setCity, stats }) {
  const [inputValue, setInputValue] = useState("");
  const handleCityChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCity(inputValue);
      setInputValue("");
      e.preventDefault();
    }
  };
  return (
    <>
      <div className="temprature">
        <input
          type="search"
          className="Search"
          placeholder="Search City "
          onChange={handleCityChange}
          onKeyDown={handleSearch}
        />
        <CiLocationOn className="filoca" />
        <hr />
      </div>
      <div>
        {stats.isDay !== 0 ? (
          <FiSun className="sun" />
        ) : (
          <IoMoonOutline className="moon " />
        )}
      </div>
      <div>
        <p className="degree">{stats.temp} &#176;C</p>
        <span></span>
      </div>

      {stats.condition === "Clear" ? (
        <TiWeatherSunny className="CloudyImg" />
      ) : stats.condition === "Moderate or heavy rain with thunder" ? (
        <TiWeatherStormy className="CloudyImg" />
      ) : (
        <TiWeatherPartlySunny className="CloudyImg" />
      )}

      <div className="">{stats.condition}</div>
      <br />
      <div className="">
        {stats.location} {stats.time}
      </div>
    </>
  );
}

export default Temprature;
