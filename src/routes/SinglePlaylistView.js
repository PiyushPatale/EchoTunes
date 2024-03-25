import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedinContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import SingleSongCard from "../components/shared/SingleSongCard";

const SinglePlaylistView = () => {
  const [playlistDetails, setPlaylistDetails] = useState({});
  const { playlistId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/playlist/get/playlist/" + playlistId
      );
      setPlaylistDetails(response);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currActiveScreen={"library"}>
      {playlistDetails._id && (
        <div>
          <div
            style={{
              color: "white",
              fontSize: "25px",
              margin: "20px",
              padding: "10px",
              overflow: "hidden",
            }}
          >
            {playlistDetails.name}
          </div>
          <div>
            <div style={{ margin: "15px" }}>
              {playlistDetails.songs.map(item => {
                return (
                    <SingleSongCard
                        info={item}
                        key={JSON.stringify(item)}
                        playSound={() => {}}
                    />
                    );
                })}
            </div>
          </div>
        </div>
      )}
    </LoggedInContainer>
  );
};

export default SinglePlaylistView;
