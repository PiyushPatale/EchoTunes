import React, { useState } from "react";
import { Icon } from "@iconify/react";
import LoggedInContainer from "../containers/LoggedinContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import SingleSongCard from "../components/shared/SingleSongCard";
// import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const [isInputFocused, setisInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);

  const searchSong = async () => {
    const response = await makeAuthenticatedGETRequest(
      "/song/get/songname/" + searchText
    );
    setSongData(response.data);
  };

  return (
    <LoggedInContainer currActiveScreen="search">
      <div style={{ width: "100%" }}>
        <div
          style={{
            border: isInputFocused ? "1px solid #d9d9d9" : "",
            display: "flex",
            width: "40vw",
            margin: "10px",
            padding: "10px",
            paddingLeft: "19px",
            fontSize: "15px",
            alignItems: "center",
            borderRadius: "20px",
            backgroundColor: "#0d0d0d",
            color: "white",
            marginTop: "22px",
          }}
        >
          <div>
            <Icon icon="icomoon-free:search" style={{ color: "white" }} />
          </div>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for tracks or artists..."
            onFocus={() => {
              setisInputFocused(true);
            }}
            onBlur={() => {
              setisInputFocused(false);
            }}
            // placeholder="What do you want to listen?"
            style={{
              marginLeft: "14px",
              backgroundColor: "#0d0d0d",
              width: "100%",
              border: "none",
              outline: "none",
              color: "white",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchSong();
              }
            }}
          />
        </div>
        {
            songData.length > 0 ?
            <div style={{margin:'15px'}}>
                <div style={{color:'white' , margin:'2px', marginBottom:'12px'}}>
                    Showing search results for " {searchText} " : 
                </div>
            {songData.map(item => {
                return (
                    <SingleSongCard
                    info={item}
                    key={JSON.stringify(item)}
                    playSound={() => {}}
                    />
                    );
                    })}
            </div> : <div style={{color:'GrayText' , marginLeft:'22px'}}>
                Nothing to Show here. Please Search.
                <div>Please Try Searching "Aarambh", "Humdard".</div>
                <div>Please Type correct spelling Only 🙂</div>
            </div>
        }
      </div>
    </LoggedInContainer>
  );
};

export default SearchPage;
