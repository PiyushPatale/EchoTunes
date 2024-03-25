import React, { useState } from "react";
import TextInput from "../components/shared/TextInput";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";

const CreatePlaylistModal = ({ closeModal }) => {

    const [playlistName, setPlaylistName] = useState("");
    const [playlistThumbnail, setPlaylistThumbnail] = useState("");

   const createPlaylist = async ()=>{
    const response = await makeAuthenticatedPOSTRequest(
        "/playlist/create",
        {name: playlistName, thumbnail: playlistThumbnail, songs: []}
    );
    if (response._id) {
        closeModal();
    }
   };

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
        onClick={(e)=>{
            e.stopPropagation();
        }}
        style={{
          backgroundColor: "#121212",
          padding: "14px",
          width:'33vw',
          borderRadius: "8px",
        }}
      > 
        <div style={{color:'white', marginBottom:'3px', fontSize:'20px'}}>
            Create Playlist
        </div>
        <div className="space-y-4 d-flex flex-column" 
            style={{
                justifyContent:'center',
                alignItems:'center'
            }}
        >
        <TextInput
                label="Name"
                placeholder="Playlist Name"
                labelClassName={"text-white py-2 w-50"}
                  value={playlistName}
                  setValue={setPlaylistName}
                />
        <TextInput
                label="Thumbnail"
                placeholder="Thumbnail"
                labelClassName={"text-white py-2 w-100"}
                  value={playlistThumbnail}
                  setValue={setPlaylistThumbnail}
            />
        <div
            onClick={createPlaylist}
            style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                paddingTop:'3px',
                paddingBottom:'3px',
                width:'33%',
                borderRadius:'20px' ,
                backgroundColor:'white',
                margin:'10px',
                cursor:'pointer'
            }}
            >Create</div>
      </div>
    </div>
    </div>
  );
};

export default CreatePlaylistModal;
