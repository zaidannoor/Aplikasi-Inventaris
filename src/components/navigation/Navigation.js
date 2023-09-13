import React from "react";
import { Link } from "react-router-dom";
import { FaPowerOff, FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Navigation({ hidden, toggleHidden, logout }) {
  return (
    <nav
      className="navbar px-4 d-flex justify-content-between"
      style={{ backgroundColor: "#f4f8f9" }}
    >
      <div onClick={toggleHidden}>
        {hidden ? (
          <button className="btn">
            <FaArrowRight
              style={{ minWidth: "30px", minHeight: "30px", color: "black" }}
            />
          </button>
        ) : (
          <button className="btn">
            <FaArrowLeft
              style={{ minWidth: "30px", minHeight: "30px", color: "black" }}
            />
          </button>
        )}
      </div>
      <div onClick={logout}>
        <button className="btn btn-danger">
          <FaPowerOff
            
            style={{ minWidth: "30px", minHeight: "30px" }}
          />
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
