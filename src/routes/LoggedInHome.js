import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import LoggedInContainer from "../containers/LoggedinContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import SingleSongCard from "../components/shared/SingleSongCard";
import songContext from "../contexts/songContext";

// const focusCardsData = [
//   {
//     title: "Agar Tum Saath Ho",
//     description: "Relax and indulge with beautiful piano pieces",
//     imgUrl:
//       "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
//   },
//   {
//     title: "Kesariya",
//     description: "Keep calm and focus with this music",
//     imgUrl:
//       "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
//   },
//   {
//     title: "Hawayein",
//     description: "Focus with soft study music in the background.",
//     imgUrl:
//       "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
//   },
//   {
//     title: "Kabhi Jo Badal Barse",
//     description: "Up tempo instrumental hip hop beats",
//     imgUrl:
//       "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//   },
//   {
//     title: "Humari Adhuri Kahani",
//     description: "Focus with deep techno and tech house",
//     imgUrl:
//       "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//   },
// ];

const Home = () => {
  const [focusCardsData, setfocusCardsData] = useState([]);
  const [focusCardsDataone, setfocusCardsDataone] = useState([]);
  const [focusCardsDatatwo, setfocusCardsDatatwo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/song/get/artist/66000508a10ea5f5be2be90e"
      );
      // console.log(response.data);
      setfocusCardsData(response.data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/song/get/artist/66000bc6a10ea5f5be2be937"
      );
      // console.log(response.data);
      setfocusCardsDataone(response.data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/song/get/artist/65f82373b5a7661ee8d58d4c"
      );
      // console.log(response.data);
      setfocusCardsDatatwo(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currActiveScreen="home">
      <PlaylistView titleText="Arijit Singh" cardsData={focusCardsData} />
      <PlaylistView titleText="Kishore Kumar" cardsData={focusCardsDataone} />
      <PlaylistView titleText="Piyush Mishra" cardsData={focusCardsDatatwo} />
    </LoggedInContainer>
  );
};

const PlaylistView = ({ titleText, cardsData }) => {
  
  return (
    <div style={{ color: "white", marginTop: "32px" }} 
    >
      <div
        style={{ fontSize: "2rem", fontWeight: "unset", marginBottom: "20px" }}
      >
        {titleText}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
          {cardsData.slice(0, 5).map((item, index) => (
            <Card
              key={index}
              title={item.name}
              // description={item.track}
              imgUrl={item.thumbnail}
              item={item}
            />
          ))}
      </div>
    </div>
  );
};

const Card = ({ title, imgUrl, item }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);
  return (
    <div
      onClick={()=>{
        // console.log(item);
       setCurrentSong(item);
      //  console.log(currentSong);
      }}
      style={{
        backgroundColor: "black",
        opacity: 0.8,
        width: "20%",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      <div style={{ paddingBottom: "16px", paddingTop: "8px", cursor:'pointer' }}>
        <img
          style={{ width: "100%", borderRadius: "4px" ,  height:"25vh", 
        objectFit: "cover"}}
          src={imgUrl}
          alt="label"
        />
      </div>
      <div style={{ color: "white", fontWeight: "bold", paddingTop: "12px" }}>
        {title}
      </div>
      {/* <div style={{ color: "gray", fontSize: "14px" }}>{description}</div> */}
    </div>
  );
};

export default Home;
