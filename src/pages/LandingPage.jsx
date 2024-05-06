import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./landingpage.css";

function LandingPage() {
  

  return (
    <>
      <Header />
      <div className="landing-page-wrapper">
        <div className="content-wrapper">
          <h1 className="landing-heading">Förvandla dina bilder till Lego&reg;-mästerverk med <span>Brick Canvas</span></h1>
          <div className="instructions-container">
            <h2 className="landing-sub-heading">Såhär funkar det</h2>
            <p className="landing-para">1. Ladda upp en bild</p>
            <p className="landing-para">2. Justera bilden efter önskemål</p>
            <p className="landing-para">3. Klart! Klicka dig vidare för att beställa hem ditt personliga Lego-kit</p>   
          </div>
          <Link to={"canvas"} className="landing-btn">Börja Här!</Link>
        </div>
      </div>
    </>
  );
}

export default LandingPage;