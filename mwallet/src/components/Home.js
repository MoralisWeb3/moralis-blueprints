import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import header from "../header.png";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="content">
        <img src={header} alt="logo" />
        <h2>Greetings!</h2>
        <h4 className="h4">Step into your Web3 Wallet Experience</h4>
        <Button
          onClick={() => navigate("/yourwallet")}
          className="frontPageButton"
          type="primary"
        >
          Create A Wallet
        </Button>
        <Button
          onClick={() => navigate("/recover")}
          className="frontPageButton"
          type="default"
        >
          Sign In With Seed Phrase
        </Button>
      </div>
    </>
  );
}

export default Home;
