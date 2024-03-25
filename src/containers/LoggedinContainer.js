import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
// import jwt from "jsonwebtoken"
import { Howl } from "howler";
import logo from "../images/echotunes-high-resolution-logo-transparent.png";
import IconText from "../components/shared/IconText";
// import "./Home.css";
import TextWithHover from "../components/shared/TextWithHover";
import { Icon } from "@iconify/react";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import {
  makeAuthenticatedPOSTRequest,
  removeToken,
} from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";

// import Login from "../routes/Login";

const getToken = () => {
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return accessToken;
};

const handleLogout = async () => {
  const token = getToken();
  try {
    const response = await makeAuthenticatedPOSTRequest("/auth/logout", {});
    if (response) {
      removeToken();
      alert("Log Out SuccessFul");
    } else {
      console.error("Logout failed:", response.data.message);
      // Handle logout failure
    }
  } catch (error) {
    console.error("Error logging out:", error);
    // Handle network or server error
  }
};

const LoggedInContainer = ({ children, currActiveScreen }) => {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);

  const firstUpdate = useRef(true);

  // useEffect(() => {
  //   setFfname(Login.fName);
  // })

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;

    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );

    if (response._id) {
      setAddToPlaylistModalOpen(false);
    }
  };

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#121212" }}
    >
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <div
        style={{
          display: "flex",
          height: currentSong ? "91vh" : "100vh",
          width: "100vw",
          backgroundColor: "blue",
        }}
      >
        <div
          className="d-flex flex-column"
          style={{ width: "20%", height: "100%", backgroundColor: "black" }}
        >
          <div className="Logo p-3">
            <img
              style={{ width: "235px", height: "50px" }}
              src={logo}
              alt="EchoTunes Logo"
            />
          </div>
          <div
            className="icontext px-3 my-2 mx-2"
            style={{
              backgroundColor: "#121212",
              borderRadius: "20px",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <IconText
              iconName={"material-symbols:home-outline"}
              displayText={"Home"}
              targetLink={"/home"}
              active={currActiveScreen === "home"}
            />
            <IconText
              iconName={"material-symbols:search"}
              displayText={"Search"}
              targetLink={"/search"}
              active={currActiveScreen === "search"}
            />
            <IconText
              iconName={"uil:books"}
              displayText={"Library"}
              targetLink={"/library"}
              active={currActiveScreen === "library"}
            />
            <IconText
              iconName={"entypo:folder-music"}
              displayText={"My Music"}
              targetLink="/myMusic"
              active={currActiveScreen === "myMusic"}
            />
          </div>
          <div
            className="px-3 my-2 mx-2"
            style={{ backgroundColor: "#121212", borderRadius: "20px" }}
          >
            <IconText
              iconName={"ph:plus-fill"}
              displayText={"Create Playlist"}
              onClick={() => {
                setCreatePlaylistModalOpen(true);
              }}
            />
            <IconText iconName={"mdi:heart"} displayText={"Liked Songs"} />
          </div>
        </div>
        <div
          className="d-flex flex-column"
          style={{ width: "80%", height: "100%", backgroundColor: "#121212" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
              height: "10%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "22%",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {/* <TextWithHover displayText={"Premium"} /> */}
              <TextWithHover displayText={"Support"} />
              <TextWithHover displayText={"Download"} />
            </div>
            <div style={{ height: "50%", borderRight: "2px solid white" }}>
              |
            </div>
            <div
              style={{
                display: "flex",
                width: "21%",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TextWithHover
                displayText={"Upload Song"}
                active={currActiveScreen === "uploadSong"}
                targetLink={"/uploadSong"}
              />
              <div
                style={{
                  height: "66%",
                  padding: "4px 6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "999px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                <Icon
                  icon="mingcute:user-4-fill"
                  style={{ color: "white", fontSize: "30px" }}
                />
              </div>
              <div>
                <button onClick={handleLogout} navigate={"/login"}>
                  LogOut
                </button>
              </div>
            </div>
          </div>

          <div style={{ padding: "8px", paddingTop: "0", overflow: "auto" }}>
            {children}
          </div>
        </div>
      </div>
      {currentSong && (
        <div
          className="d-flex px-4"
          style={{
            width: "100vw",
            height: "9vh",
            backgroundColor: "#121212",
            color: "white",
            alignItems: "center",
          }}
        >
          <div style={{ width: "33vw", display: "flex", alignItems: "center" }}>
            <img
              style={{ height: "60px", width: "60px" }}
              src={currentSong.thumbnail}
              alt="CurrentSongThumbnail"
            />
            <div style={{ paddingLeft: "30px" }}>
              <div style={{ fontSize: "20px" }}>{currentSong.name}</div>
              <div style={{ color: "#828282", fontWeight: "400" }}>
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>
          <div
            style={{
              height: "62px",
              width: "34vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "23vw",
                justifyContent: "space-between",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              {/* <div
                className="progress-bar-container"
                style={{
                  width: "100%",
                  height: "10px",
                  backgroundColor: "#444",
                  position: "relative",
                }}
              >
                <progress
                  className="progress-bar"
                  value={progress}
                  max="100"
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                    appearance: "none",
                  }}
                ></progress>
                <div
                  className="filled-progress"
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    backgroundColor: "blue",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                ></div>
              </div> */}

              <Icon
                icon="ph:shuffle-fill"
                style={{ color: "white", fontSize: "27px", cursor: "pointer" }}
              />
              <Icon
                icon="mdi:skip-previous-circle"
                style={{ color: "white", fontSize: "27px", cursor: "pointer" }}
              />
              <Icon
                icon={isPaused ? "gravity-ui:play" : "gravity-ui:pause"}
                style={{ color: "white", fontSize: "37px", cursor: "pointer" }}
                onClick={togglePlayPause}
              />
              <Icon
                icon="mdi:skip-next-circle"
                style={{ color: "white", fontSize: "27px", cursor: "pointer" }}
              />
              <Icon
                icon="bi:repeat"
                style={{ color: "white", fontSize: "27px", cursor: "pointer" }}
              />
            </div>
          </div>
          <div
            style={{
              width: "33vw",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              paddingRight: "12px",
            }}
          >
            <Icon
              icon="tabler:playlist-add"
              onClick={() => {
                setAddToPlaylistModalOpen(true);
              }}
              style={{
                color: "white",
                fontSize: "32px",
                cursor: "pointer",
                marginRight: "12px",
                marginLeft: "12px",
              }}
            />
            <Icon
              icon="ion:heart-outline"
              style={{
                color: "white",
                fontSize: "27px",
                cursor: "pointer",
                marginRight: "12px",
                marginLeft: "12px",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInContainer;
