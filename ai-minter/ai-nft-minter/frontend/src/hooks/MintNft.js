import { ethers } from "ethers";
import contractAddress from "../chain-info/deployments/map.json";
import contractAbi from "../chain-info/contracts/AINFTS.json";

export function useMintNFt() {
  const contract = contractAddress["11155111"]["AINFTS"][0];
  const abi = contractAbi.abi;

  async function mintNFT({ signer, tokenUri }) {
    try {
      const nftContract = new ethers.Contract(contract, abi, signer);
      let tx = await nftContract.mintAiNft(tokenUri, {
        gasLimit: 1000000,
      });
      await tx.wait(1);
    } catch (err) {
      console.log(err);
    }
  }

  return { mintNFT };
}
