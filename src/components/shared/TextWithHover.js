import React from "react";
import { Link } from "react-router-dom";

const TextWithHover = ({ displayText, active, targetLink }) => {
  return (
    <Link to={targetLink} style={{ textDecoration: "none" }}>
      <div
        className="d-flex"
        style={{
          alignItems: "center",
          justifyContent: "start",
          cursor: "pointer",
          color: active ? "white" : "gray",
          fontSize: "500",
        }}
      >
        {displayText}
      </div>
    </Link>
  );
};

export default TextWithHover;
