import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ConnectWalletButton from "./components/ConnectButton";
import ImageGenerator from "./components/ImageGenerator";
import MyNfts from "./components/MyNfts"; // import the component that will replace ImageGenerator
import styles from "./styles/Home.module.css";
import logo from "./img/moralis.png";

function App() {
  return (
    <Router>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logos}>
            <Link to="/">
              <img src={logo} alt="Logo" className={styles.logo} />
            </Link>

            <Link to="/my-nfts" className={styles.my_nfts_button}>
              <span>My NFTs</span>
            </Link>
          </div>
          <ConnectWalletButton />
        </header>
        <Switch>
          <Route exact path="/">
            <ImageGenerator />
          </Route>
          <Route path="/my-nfts">
            <MyNfts />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
