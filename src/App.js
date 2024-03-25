import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import LoggedInHome from "./routes/LoggedInHome";
import songContext from "./contexts/songContext";
import { useState } from "react";
import { useCookies } from "react-cookie";
import UploadSong from "./routes/UploadSong";
import MyMusic from "./routes/MyMusic";
import SearchPage from "./routes/SearchPage";
import Library from "./routes/Library";
import SinglePlaylistView from "./routes/SinglePlaylistView";

const App = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <BrowserRouter>
          {cookie.token ? (
            // Logged In Routes
            <songContext.Provider
              value={{
                currentSong,
                setCurrentSong,
                soundPlayed,
                setSoundPlayed,
                isPaused,
                setIsPaused,
              }}
            >
              <Routes>
                <Route path="/home" element={<LoggedInHome />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/uploadSong" element={<UploadSong />} />
                <Route path="/myMusic" element={<MyMusic />} />
                <Route
                  path="/playlist/:playlistId"
                  element={<SinglePlaylistView />}
                />
                <Route path="/library" element={<Library />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            </songContext.Provider>
          ) : (
            // Loggedout routes
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
