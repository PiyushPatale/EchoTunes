import React from "react";
import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";

const AddToPlaylistModal = ({ closeModal, addSongToPlaylist }) => {
  const [myPlaylists, setMyPlaylists] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylists(response.data);
      // console.log(response.data);
    };
    getData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        width: "100vw",
        height: "100vh",
        opacity: "70%",
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={closeModal}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          backgroundColor: "#121212",
          padding: "14px",
          width: "33vw",
          borderRadius: "8px",
        }}
      >
        <div style={{ color: "white", marginBottom: "3px", fontSize: "20px" }}>
          Select Playlist
        </div>
        <div
          className="space-y-4 d-flex flex-column"
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {myPlaylists.map((item) => {
            return (
              <PlaylistListComponent
                info={item}
                addSongToPlaylist={addSongToPlaylist}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PlaylistListComponent = ({ info , addSongToPlaylist }) => {
  return (
    <div
    onClick={()=>{
        addSongToPlaylist(info._id)
    }}
      style={{
        padding: "3px",
        backgroundColor: "#121212",
        display: "flex",
        alignItems: "center",
        padding: "4px",
        cursor: "pointer",
        width: "100%",
      }}
      className="bg-app-black w-full flex items-center space-x-4 hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer p-3"
    >
      <div>
        <img
          src={info.thumbnail}
          className="w-10 h-10"
          alt="thumbnail"
          style={{
            marginRight: "18px",
            marginLeft: "12px",
            width: "50px",
            height: "50px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="text-white font-semibold text-sm">{info.name}</div>
    </div>
  );
};

export default AddToPlaylistModal;
