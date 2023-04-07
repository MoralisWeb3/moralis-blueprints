import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/ImageGenerator.module.css";
import MintNFTButton from "./MintNFTButton";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const resetImage = () => {
    setImage(null);
    setPrompt("");
    setIsGenerated(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Generate new Image</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className={styles.input}
          placeholder="Enter prompt"
        />
        {!isGenerated ? (
          <button
            onClick={() => {}}
            className={styles.generateButton}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Generate"}
          </button>
        ) : (
          <></>
        )}
      </div>
      {image && (
        <div className={styles.imageContainer}>
          <img src={image} alt="Generated" />
        </div>
      )}
    </div>
  );
}
