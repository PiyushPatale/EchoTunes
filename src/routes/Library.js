import React from "react";
import { useState, useEffect } from "react";
import LoggedInContainer from "../containers/LoggedinContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const [myPlaylists, setMyPlaylists] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylists(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currActiveScreen={"library"}>
      <div
        style={{
          color: "white",
          fontSize: "25px",
          margin: "20px",
          padding: "10px",
          overflow: "hidden",
        }}
      >
        My Playlists
      </div>
      <div
        className="gap-5 row row-cols-5"
        style={{
          padding: "26px",
          overflow: "hidden",
          width: "100%",
          cursor: "pointer",
        }}
      >
        {myPlaylists.map((item) => {
          return (
            <Card
              key={JSON.stringify(item)}
              title={item.name}
              description=""
              imgUrl={item.thumbnail}
              playlistId={item._id}
            />
          );
        })}
      </div>
    </LoggedInContainer>
  );
};

const Card = ({ title, description, imgUrl, playlistId }) => {
    const navigate = useNavigate();
  return (
    <div
      style={{
        width: "20%",
        backgroundColor: "black",
        opacity: 0.8,
        padding: "16px",
        borderRadius: "8px",
      }}

      onClick={()=>{
        navigate("/playlist/"+playlistId);
      }}
    >
      <div style={{ paddingBottom: "16px", paddingTop: "8px" }}>
        <img
          style={{ width: "100%", borderRadius: "4px" }}
          src={imgUrl}
          alt="label"
        />
      </div>
      <div style={{ color: "white", fontWeight: "bold", paddingTop: "12px" }}>
        {title}
      </div>
      <div style={{ color: "gray", fontSize: "14px" }}>{description}</div>
    </div>
  );
};

export default Library;
