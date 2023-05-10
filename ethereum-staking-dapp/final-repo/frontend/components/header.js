import { useEffect, useState } from "react";
import { Beans } from "@web3uikit/icons";
import styles from "../styles/Home.module.css";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (!isConnected) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isConnected]);

  return (
    <section className={styles.header}>
      <section className={styles.header_logoSection}>
        <h1 className={styles.title}>Beans Staking </h1>
        <Beans fontSize="20px" className={styles.beans} />
      </section>
      <section className={styles.header_btn}>
        {!isLoggedIn ? (
          <button className={styles.connectBtn} onClick={disconnect}>
            DISCONNECT WALLET
          </button>
        ) : (
          <>
            {connectors.map((connector) => (
              <button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
                className={styles.connectBtn}
              >
                CONNECT WALLET
              </button>
            ))}
          </>
        )}
      </section>
    </section>
  );
}
