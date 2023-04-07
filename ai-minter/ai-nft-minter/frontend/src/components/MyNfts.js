import { useEffect, useState } from "react";
import contractAddress from "../chain-info/deployments/map.json";
import axios from "axios";
import styles from "../styles/Nfts.module.css";

function MyNfts({ account }) {
  const contract = contractAddress["11155111"]["AINFTS"][0];
  const [nfts, setNfts] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:5002/get_nfts", {
        params: {
          address: contract,
        },
      });
      console.log(response.data.result);
      setNfts(response.data.result);

      console.log(account);
    }
    fetchData();
  }, []);

  const renderedNFts =
    nfts &&
    Object.values(nfts).map((nft) => {
      if (nft.minter_address === account) {
        return (
          <div className={styles.nfts}>
            <div className={styles["horizontal-card"]}>
              <img alt="example" src={nft?.normalized_metadata?.image} />

              <div className={styles.info}>
                <h2 title={nft?.normalized_metadata?.name}>
                  {nft?.normalized_metadata?.name}
                </h2>
                <p>
                  <b>Token id:</b> {nft?.token_id}
                </p>
                <p>
                  <b>Description: </b>
                  {nft?.normalized_metadata?.description}
                </p>

                <div className={styles.traits}>
                  <p>
                    <b>Type: </b>
                    {nft?.normalized_metadata?.attributes[0]?.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });

  return (
    <div className={styles.container}>
      <h1>My NFTs</h1>
      <div className={styles["nfts-container"]}>{nfts && renderedNFts}</div>
    </div>
  );
}

export default MyNfts;
