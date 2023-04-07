import React from "react";

import styles from "../styles/Home.module.css";

const ConnectWalletButton = ({
  isConnected,
  account,
  signer,
  connectToMetamask,
}) => {
  const handleClick = () => {
    if (!isConnected) {
      connectToMetamask();
    }
  };

  const shortenedAccount = account?.slice(0, 6) + "...";

  return (
    <>
      {isConnected ? (
        <span className={styles.connectedAccount}>
          Connected to {shortenedAccount}
        </span>
      ) : (
        <button onClick={handleClick} className={styles.button}>
          {isConnected ? `Connected: ${shortenedAccount}` : "Connect Wallet"}
        </button>
      )}
    </>
  );
};

export default ConnectWalletButton;
