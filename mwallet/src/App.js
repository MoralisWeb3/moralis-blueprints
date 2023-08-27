import "./App.css";
import { useState } from "react";
import logo from "./ensLogo.png";
import { Select } from "antd";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import RecoverAccount from "./components/RecoverAccount";
import WalletView from "./components/WalletView";
import { WagmiConfig, configureChains, createConfig, sepolia } from "wagmi";
import {
  avalanche,
  goerli,
  mainnet,
  polygon,
  polygonMumbai,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

function App() {
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectedChain, setSelectedChain] = useState("0x1");

  const chains = [mainnet, goerli, polygonMumbai, polygon, avalanche];
  const { publicClient } = configureChains(chains, [publicProvider()]);

  const wagmiConfig = createConfig({
    publicClient,
  });
  return (
    <WagmiConfig config={wagmiConfig}>
      <div className="App">
        <header>
          <img src={logo} className="headerLogo" alt="logo" />
          <Select
            onChange={(val) => setSelectedChain(val)}
            value={selectedChain}
            options={[
              {
                label: "Ethereum",
                value: "0x1",
              },
              {
                label: "Mumbai Testnet",
                value: "0x13881",
              },
              {
                label: "Goerli Testnet",
                value: "0x5",
              },
              {
                label: "Polygon",
                value: "0x89",
              },
              {
                label: "Avalanche",
                value: "0xa86a",
              },
            ]}
            className="dropdown"
          ></Select>
        </header>
        {wallet && seedPhrase ? (
          <Routes>
            <Route
              path="/yourwallet"
              element={
                <WalletView
                  wallet={wallet}
                  setWallet={setWallet}
                  seedPhrase={seedPhrase}
                  setSeedPhrase={setSeedPhrase}
                  selectedChain={selectedChain}
                />
              }
            />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/recover"
              element={
                <RecoverAccount
                  setSeedPhrase={setSeedPhrase}
                  setWallet={setWallet}
                />
              }
            ></Route>
            <Route
              path="/yourwallet"
              element={
                <CreateAccount
                  setSeedPhrase={setSeedPhrase}
                  setWallet={setWallet}
                />
              }
            ></Route>
          </Routes>
        )}
      </div>
    </WagmiConfig>
  );
}

export default App;
