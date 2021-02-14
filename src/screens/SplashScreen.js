import React from "react";
import "./LoginScreen.css";

function SplashScreen() {
  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <div className="loginScreen__gradient" />
        <div className="loginScreen__body">
          <h1>Loading Netflix...</h1>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
