import React from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

function Header() {
  const { push } = useRouter();


  async function connectwalletHandler() {
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
          <div className={styles.connectButton} onClick={connectwalletHandler}>
            Connect
          </div>
      </div>
    </header>
  );
}


export default Header;
