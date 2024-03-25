import React from "react";
import { Icon } from "@iconify/react";
import "./icontext.css";
import { Link } from "react-router-dom";

const IconText = ({ iconName, displayText, active, targetLink, onClick }) => {
  return (
    <Link to={targetLink} style={{ textDecoration: "none" }}>
      <div
        onClick={onClick}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <div className="px-2 py-2 icontext" style={{ fontSize: "25px" }}>
          <Icon icon={iconName} style={{ color: active ? "white" : "gray" }} />
        </div>
        <div style={{ color: active ? "white" : "gray", fontSize: "20px" }}>
          {displayText}
        </div>
      </div>
    </Link>
  );
};

export default IconText;
