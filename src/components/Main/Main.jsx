import React from "react";
import "./Main.css";
import { assets } from "../../assets/assets";

const Main = () => {
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        <div className="greet">
          <p>
            <span>Hello, Aarsh...</span>
          </p>
          <p>How can i help you today</p>
        </div>

        {/* cards */}
        <div className="cards">
          <div className="card">
            <p>Brainstorm creative project ideas</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Write professional email drafts</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>Suggest places to eat while on trip</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Get coding help and solutions</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>

        {/* main-bottom */}
        <div className="main-bottom">
            <div className="search-box">
                <input type="text" placeholder='Enter a prompt here'/>
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    <img src={assets.send_icon} alt="" />
                </div>
            </div>
            <p className="bottom-info">
                Gemini may display inaccurate info, including about people, so double-check its responses.
            </p>
        </div>
        
      </div>
    </div>
  );
};

export default Main;
