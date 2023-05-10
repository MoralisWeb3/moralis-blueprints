import React from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function Header() {
  const { push } = useRouter();
  const { status } = useSession();

  async function connectwalletHandler() {
    const provider = new ethers.BrowserProvider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();

    const userData = { address: signer.address, chain: 80001 };

    const { data } = await axios.post("/api/auth/request-message", userData, {
      headers: {
        "content-type": "application/json",
      },
    });

    const message = data.message;

    let signature = await signer.signMessage(message);

    const { url } = await signIn("credentials", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/",
    });

    push("/");
  }

  return (
    <header className={styles.header}>
      <div className={styles.leftH}>
        <img src="/moralis-logo.svg" alt="logo" className={styles.logo} />
        <div className={styles.headerItem}>Product</div>
        <div className={styles.headerItem}>Creators</div>
        <div className={styles.headerItem}>Pricing</div>
        <div className={styles.headerItem}>Resources</div>
      </div>
      <div className={styles.rightH}>
        {status === "authenticated" ? (
          <div
            className={styles.connectButton}
            onClick={() => {
              signOut();
            }}
          >
            Disconnect
          </div>
        ) : (
          <div className={styles.connectButton} onClick={connectwalletHandler}>
            Connect
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
