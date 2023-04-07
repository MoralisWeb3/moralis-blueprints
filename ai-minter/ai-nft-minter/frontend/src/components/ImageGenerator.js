import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/ImageGenerator.module.css";
import MintNFTButton from "./MintNFTButton";

export default function ImageGenerator({
  isConnected,
  account,
  signer,
  connectToMetamask,
}) {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const generateImage = async () => {
    if (prompt.trim() === "") {
      alert("Please enter a non-empty prompt");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://127.0.0.1:5002/generate?prompt=${encodeURIComponent(prompt)}`
      );
      setImage(`data:image/png;base64,${response.data.image}`);
      setIsGenerated(true);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
            onClick={generateImage}
            className={styles.generateButton}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Generate"}
          </button>
        ) : (
          <>
            <MintNFTButton
              image={image}
              signer={signer}
              className={styles.generateButton}
            />
            <button onClick={resetImage} className={styles.removeButton}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </>
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
