import React from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

import { useMintNFt } from "../hooks/MintNft";

const MintNFTButton = ({ image, signer }) => {
  const { mintNFT } = useMintNFt();

  const handleMintNFT = async () => {
    try {
      // Step 1: Upload the image to IPFS
      const requestBody = {
        content: image.replace("data:image/png;base64,", ""),
      };

      const ipfsResponse = await axios.post(
        "http://127.0.0.1:5002/uploadToIpfs",
        JSON.stringify(requestBody),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const imagePath = ipfsResponse.data[0].path;
      console.log("IPFS upload result:", ipfsResponse.data);

      // Step 2: Upload the URI
      const uriResponse = await axios.post("http://127.0.0.1:5002/uploadUri", {
        img: imagePath,
      });

      console.log("URI upload result:", uriResponse.data);

      // Step 3: Mint the NFT
      const tokenUri = uriResponse.data[0].path;
      await mintNFT({ signer, tokenUri });
    } catch (error) {
      console.error("Error uploading image and URI:", error);
    }
  };

  return (
    <button onClick={handleMintNFT} className={styles.button}>
      Mint NFT
    </button>
  );
};

export default MintNFTButton;
