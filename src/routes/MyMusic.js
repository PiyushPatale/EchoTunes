import { React, useState, useEffect } from "react";
import "./Home.css";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import LoggedInContainer from "../containers/LoggedinContainer";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
      // console.log(response.data);
      setSongData(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currActiveScreen="myMusic">
      <div className="pb-4 pl-2" style={{ color: "white", fontSize: "40px" }}>
        My Songs
      </div>
      <div>
        {songData.map((item) => {
          return <SingleSongCard info={item} playSound={() => {}} />;
        })}
      </div>
    </LoggedInContainer>
  );
};

export default MyMusic;
