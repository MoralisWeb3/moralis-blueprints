import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";

import { CONTRACT_ADDRESS, ABI } from "../contracts/index.js";

export default function Staking() {
  const { isConnected, address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const [walletBalance, setWalletBalance] = useState("");

  const [stakingTab, setStakingTab] = useState(true);
  const [unstakingTab, setUnstakingTab] = useState(false);
  const [unstakeValue, setUnstakeValue] = useState(0);

  const [assetIds, setAssetIds] = useState([]);
  const [assets, setAssets] = useState([]);
  const [amount, setAmount] = useState(0);

  const toWei = (ether) => ethers.utils.parseEther(ether);
  const toEther = (wei) => ethers.utils.formatEther(wei);

  useEffect(() => {
    async function getWalletBalance() {
      await axios
        .get("http://localhost:5001/getwalletbalance", {
          params: { address },
        })
        .then((response) => {
          setWalletBalance(response.data.balance);
        });
    }

    if (isConnected) {
      getWalletBalance();
    }
  }, [isConnected]);

  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    signerOrProvider: signer || provider,
  });

  const switchToUnstake = async () => {
    if (!unstakingTab) {
      setUnstakingTab(true);
      setStakingTab(false);
      const assetIds = await getAssetIds(address, signer);
      setAssetIds(assetIds);

      getAssets(assetIds, signer);
    }
  };

  const switchToStake = () => {
    if (!stakingTab) {
      setStakingTab(true);
      setUnstakingTab(false);
    }
  };

  const getAssetIds = async (address) => {
    const assetIds = await contract.getPositionIdsForAddress(address);
    return assetIds;
  };

  const calcDaysRemaining = (unlockDate) => {
    const timeNow = Date.now() / 1000;
    const secondsRemaining = unlockDate - timeNow;
    return Math.max((secondsRemaining / 60 / 60 / 24).toFixed(0), 0);
  };

  const getAssets = async (ids) => {
    const queriedAssets = await Promise.all(
      ids.map((id) => contract.getPositionById(id))
    );

    queriedAssets.map(async (asset) => {
      const parsedAsset = {
        positionId: asset.positionId,
        percentInterest: Number(asset.percentInterest) / 100,
        daysRemaining: calcDaysRemaining(Number(asset.unlockDate)),
        etherInterest: toEther(asset.weiInterest),
        etherStaked: toEther(asset.weiStaked),
        open: asset.open,
      };

      setAssets((prev) => [...prev, parsedAsset]);
    });
  };

  const stakeEther = async (stakingLength) => {
    const wei = toWei(String(amount));
    const data = { value: wei };
    await contract.stakeEther(stakingLength, data);
  };

  const withdraw = (positionId) => {
    contract.closePosition(positionId);
  };

  return (
    <section className={styles.stakingContainer}>
      <section>
        <section className={styles.stakeUnstakeTab}>
          <section
            className={`${stakingTab ? styles.stakingType : ""}`}
            id="stake"
            onClick={switchToStake}
          >
            Stake
          </section>
          <section
            className={`${unstakingTab ? styles.stakingType : ""}`}
            id="unstake"
            onClick={switchToUnstake}
          >
            Unstake
          </section>
        </section>
        <section className={styles.stakingSection}>
          <span className={styles.apy}>7% APY</span>
          {stakingTab ? (
            <section className={styles.stakingBox}>
              <h2>Stake</h2>
              <input
                className={styles.inputField}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                id="inputField"
                maxLength="120"
                placeholder="Enter Amount"
                required
              />
              <section className={styles.stakingInfo}>
                <p>
                  Balance:{" "}
                  <span>{(walletBalance / 10 ** 18).toLocaleString()}</span>
                </p>
                <p>Exchange Rate: 1.03582967</p>
                {/* <p>Transaction Cost</p> */}
              </section>
              <button
                className={styles.stakeBtn}
                onClick={() => stakeEther(0, "7%")}
              >
                STAKE
              </button>
            </section>
          ) : (
            <section className={styles.stakingBox}>
              <h2>Unstake</h2>
              <input
                className={styles.inputField}
                value={unstakeValue}
                onChange={(e) => setUnstakeValue(e.target.value)}
                type="number"
                id="inputField"
                maxLength="120"
                placeholder="Enter Amount"
                required
              />
              <section className={styles.stakingInfo}>
                <p>
                  Balance:{" "}
                  {assets.length > 0 &&
                    assets.map((a, id) => {
                      if (a.open) {
                        return <span key={id}>{a.etherStaked}</span>;
                      } else {
                        return <span></span>;
                      }
                    })}
                </p>
                {/* <p>Transaction Cost</p> */}
                <p>
                  You Receive: {unstakeValue == 0 ? "" : unstakeValue * 1.07}
                </p>
              </section>
              <button
                className={styles.stakeBtn}
                onClick={() => withdraw(assets[assets.length - 1].positionId)}
              >
                UNSTAKE
              </button>
            </section>
          )}
        </section>
      </section>
      <section>
        <section className={styles.stakingInfoSection}>
          <section className={styles.stakingInfo}>
            <h2>Locked Staking</h2>
            <section className={styles.lockedStaking}>
              <span>Locked 30 days</span>
              <span className={styles.lockedStakingAPY}>8% API</span>
              <input
                className={styles.inputField}
                type="number"
                id="inputField"
                maxLength="120"
                placeholder="Enter Amount"
                required
              />
            </section>
            <section className={styles.lockedStaking}>
              <span>Locked 60 days</span>
              <span className={styles.lockedStakingAPY}>9% API</span>
              <input
                className={styles.inputField}
                type="number"
                id="inputField"
                maxLength="120"
                placeholder="Enter Amount"
                required
              />
            </section>
            <section className={styles.lockedStaking}>
              <span>Locked 90 days</span>
              <span className={styles.lockedStakingAPY}>12% API</span>
              <input
                className={styles.inputField}
                type="number"
                id="inputField"
                maxLength="120"
                placeholder="Enter Amount"
                required
              />
            </section>
          </section>
          <button className={styles.stakeBtn}>STAKE</button>
        </section>
      </section>
    </section>
  );
}
