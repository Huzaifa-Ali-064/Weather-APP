import React from "react";
import { VscSend } from "react-icons/vsc";
import "./WeatherApp.css";
function Highlights({ stats }) {
  return (
    <div className="highlight">
      <h5>{stats.title}</h5>
      <span> {stats.value}</span>
      {stats.unit}
      <br />
      {stats.direction ? (
        <span>
          <VscSend />
          {stats.direction}
        </span>
      ) : null}
    </div>
  );
}

export default Highlights;
