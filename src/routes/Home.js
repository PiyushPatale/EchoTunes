import React from "react";
import logo from "../images/echotunes-high-resolution-logo-transparent.png";
import { useLocation } from 'react-router-dom';
import IconText from "../components/shared/IconText";
import "./Home.css";
import TextWithHover from "../components/shared/TextWithHover";
import { useNavigate } from "react-router-dom";

const focusCardsData = [
  {
    title: "Agar Tum Saath Ho",
    description: "Relax and indulge with beautiful piano pieces",
    imgUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
  },
  {
    title: "Kesariya",
    description: "Keep calm and focus with this music",
    imgUrl:
      "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
  },
  {
    title: "Hawayein",
    description: "Focus with soft study music in the background.",
    imgUrl:
      "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  },
  {
    title: "Kabhi Jo Badal Barse",
    description: "Up tempo instrumental hip hop beats",
    imgUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    title: "Humari Adhuri Kahani",
    description: "Focus with deep techno and tech house",
    imgUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <div
        className="d-flex flex-column"
        style={{ width: "20%", height: "100%", backgroundColor: "black" }}
      >
        <div className="Logo p-3">
          <img
            style={{ width: "205px", height: "50px" }}
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
            active
          />
          <IconText
            iconName={"material-symbols:search"}
            displayText={"Search"}
          />
          <IconText iconName={"uil:books"} displayText={"Library"} />
        </div>
        <div
          className="px-3 my-2 mx-2"
          style={{ backgroundColor: "#121212", borderRadius: "20px" }}
        >
          <IconText iconName={"ph:plus-fill"} displayText={"Create Playlist"} />
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
            height: "95px",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "40%",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TextWithHover displayText={"Premium"} />
            <TextWithHover displayText={"Support"} />
            <TextWithHover displayText={"Download"} />
            <div style={{ height: "50%", borderRight: "2px solid white" }}>
              |
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "20%",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          > 
          <div onClick={()=>{
            navigate("/signup")
          }}>
            <TextWithHover displayText={"Sign up"} />
          </div>
            <div
              onClick={()=>{
                navigate( "/login");
              }}

              style={{
                backgroundColor: "white",
                height: "66%",
                padding: "2px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "999px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Log in
            </div>
          </div>
        </div>

        <div style={{ padding: "8px", paddingTop: "0", overflow: "auto" }}>
          <PlaylistView titleText="Arijit Singh" cardsData={focusCardsData} />
          <PlaylistView
            titleText="Spotify Playlists"
            cardsData={focusCardsData}
          />
          <PlaylistView titleText="Sound of India" cardsData={focusCardsData} />
        </div>
      </div>
    </div>
  );
};

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div style={{ color: "white", marginTop: "32px" }}>
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
        {cardsData.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            description={item.description}
            imgUrl={item.imgUrl}
          />
        ))}
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  return (
    <div
      style={{
        backgroundColor: "black",
        opacity: 0.8,
        width: "20%",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      <div style={{ paddingBottom: "16px", paddingTop: "8px" }}>
        <img
          style={{ width: "100%", borderRadius: "4px" }}
          src={imgUrl}
          alt="label"
        />
      </div>
      <div style={{ color: "white", fontWeight: "bold", paddingTop: "12px" }}>
        {title}
      </div>
      <div style={{ color: "gray", fontSize: "14px" }}>{description}</div>
    </div>
  );
};

export default Home;
