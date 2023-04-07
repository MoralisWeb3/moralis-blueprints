import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ConnectWalletButton from "./components/ConnectButton";
import ImageGenerator from "./components/ImageGenerator";
import MyNfts from "./components/MyNfts"; // import the component that will replace ImageGenerator
import styles from "./styles/Home.module.css";
import logo from "./img/moralis.png";
import { useMetamaskState } from "./hooks/ConnectWallet";

function App() {
  const { isConnected, account, signer, connectToMetamask } =
    useMetamaskState();

  return (
    <Router>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logos}>
            <Link to="/">
              <img src={logo} alt="Logo" className={styles.logo} />
            </Link>
            {isConnected ? (
              <Link to="/my-nfts" className={styles.my_nfts_button}>
                <span>My NFTs</span>
              </Link>
            ) : (
              <></>
            )}
          </div>
          <ConnectWalletButton
            isConnected={isConnected}
            account={account}
            signer={signer}
            connectToMetamask={connectToMetamask}
          />
        </header>
        <Switch>
          <Route exact path="/">
            <ImageGenerator
              isConnected={isConnected}
              account={account}
              signer={signer}
              connectToMetamask={connectToMetamask}
            />
          </Route>
          <Route path="/my-nfts">
            <MyNfts account={account} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
