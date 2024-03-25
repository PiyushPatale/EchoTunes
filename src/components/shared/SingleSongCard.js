import React, { useContext, useState } from "react";
import "./SingleSongCard.css";
import songContext from "../../contexts/songContext";

const SingleSongCard = ({ info, playSound }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  // console.log(info.Duration);
  return (
    <div
      onClick={() => {
        setCurrentSong(info);
        // console.log(info);
      }}
      style={{
        backgroundColor: "#121212",
        opacity: "0.8",
        borderRadius: "20px",
        marginBottom: "8px",
      }}
      className="song-Card d-flex p-2"
    >
      <div
        className="img"
        style={{
          width: "50px",
          height: "50px",
          paddingLeft: "10px",
          marginRight: "20px",
          backgroundImage: `url("${info.thumbnail}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="d-flex" style={{ width: "100%" }}>
        <div
          className="text-white flex justify-center flex-col pl-4"
          style={{ justifyContent: "center", width: "80%", color: "white" }}
        >
          <div style={{ cursor: "pointer" }}>{info.name}</div>
          <div
            className="text-xs text-gray-400"
            style={{ cursor: "pointer", color: "gray" }}
          >
            {info.artist.firstName + " " + info.artist.lastName}
          </div>
        </div>
        <div
          className="d-flex"
          style={{
            width: "20%",
            alignItems: "center",
            justifyContent: "center",
            color: "gray",
          }}
        >
          <div>{info.Duration}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;
