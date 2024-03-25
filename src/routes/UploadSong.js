import { React, useState } from "react";
import "./Home.css";
import TextInput from "../components/shared/TextInput";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
import {useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedinContainer";

const UploadSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [Duration, setDuration] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState("");
  const navigate = useNavigate();

  const submitSong = async () => {
   
    const data = { name, thumbnail, track: playlistUrl , Duration };
    try {
      const response = await makeAuthenticatedPOSTRequest("/song/create", data);
      if (response && !response.error) {
        console.log(response);
        navigate("/home");
      } else {
        alert("Failed to Create Song. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred. Please try again later.");
    }
  };
  
  return (
    <LoggedInContainer>
      <div style={{ padding: "8px", paddingTop: "0", overflow: "auto" }}>
        <div
          style={{
            marginBottom: "5px",
            marginTop: "8px",
            color: "white",
            fontSize: "30px",
          }}
        >
          Upload Your Music
        </div>
        <div className="d-flex" style={{ color: "white" }}>
          <TextInput
            label="Name"
            placeholder="Enter a Song Name"
            value={name}
            setValue={setName}
          />
          <TextInput
            label="Thumbnail"
            placeholder="Thumbnail"
            value={thumbnail}
            setValue={setThumbnail}
          />
        </div>
      </div>
      <div className="pt-2 py-4">
        {uploadedSongFileName ? (
          <div
            style={{
              paddingLeft: "20px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "15px",
              width: "20%",
            }}
          >
            Track Selected : {uploadedSongFileName}
          </div>
        ) : (
          <CloudinaryUpload
            setUrl={setPlaylistUrl}
            setName={setUploadedSongFileName}
            setDuration={setDuration}
          />
        )}
      </div>
      <div
        style={{
          backgroundColor: "white",
          width: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px",
          borderRadius: "40px",
          cursor: "pointer",
        }}
        onClick={submitSong}
      >
        Submit Song
      </div>
    </LoggedInContainer>
  );
};

export default UploadSong;
