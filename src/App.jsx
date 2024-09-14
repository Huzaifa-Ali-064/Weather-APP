import { useEffect, useState } from "react";
import React from "react";
import Temprature from "./Components/Temprature";
import Highlights from "./Components/Highlights";
import FrontPage from "./Components/FrontPage";
import style from "./Components/Background.module.css";
import LoadingSpinner from "./Components/LoadingSpinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [City, setCity] = useState("Karachi");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [showFrontPage, setShowFrontPage] = useState(true);

  useEffect(() => {
    if (!showFrontPage) {
      fetchWeatherData();
    }
  }, [City, showFrontPage]);

  const fetchWeatherData = () => {
    setFetching(true);
    const apiURL = `https://api.weatherapi.com/v1/current.json?key=240a2fa9420a47ed9fe203350242708&q=${City}&aqi=no`;

    setLoading(true);
    setError(null);

    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
        setFetching(false);
      });
  };

  const handleStart = () => {
    setShowFrontPage(false);
  };

  return (
    <>
      <div
        className={style.myback}
        // Update the condition here
        style={showFrontPage ? {} : { backgroundColor: "#00006B" }}
      >
        {fetching && <LoadingSpinner />}
        {showFrontPage ? (
          <FrontPage onStart={handleStart} />
        ) : (
          <>
            <div>
              {!fetching && weatherData && weatherData.current ? (
                <Temprature
                  setCity={setCity}
                  stats={{
                    temp: weatherData.current.temp_c,
                    condition: weatherData.current.condition.text,
                    isDay: weatherData.current.is_day,
                    location: weatherData.location.name,
                    time: weatherData.location.localtime,
                  }}
                />
              ) : (
                <div>Loading....</div>
              )}
            </div>
            <br />
            <div>
              <h1 className="text-slate-200 text-2xl col-span-2">
                Today's Highlights
              </h1>

              {!fetching && weatherData && (
                <div className="highlightall">
                  <Highlights
                    stats={{
                      title: "Wind Status",
                      value: weatherData.current.wind_mph,
                      unit: "mph",
                      direction: weatherData.current.wind_dir,
                    }}
                  />
                  <Highlights
                    stats={{
                      title: "Air Pressure",
                      value: weatherData.current.pressure_mb,
                      unit: "mb",
                    }}
                  />
                  <Highlights
                    stats={{
                      title: "Visibility",
                      value: weatherData.current.vis_miles,
                      unit: "miles",
                    }}
                  />
                  <Highlights
                    stats={{
                      title: "Humidity",
                      value: weatherData.current.humidity,
                      unit: "%",
                    }}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
