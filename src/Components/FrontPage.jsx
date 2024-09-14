import React from "react";
import { BsArrowRightShort } from "react-icons/bs";

export const FrontPage = ({ onStart }) => {
  return (
    <center className="mainBody">
      <button className="Startbtn" onClick={onStart}>
        Get Start
        <span>
          <BsArrowRightShort />
        </span>
      </button>
    </center>
  );
};

export default FrontPage;
