import { Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

export default function Home() {

  return (
    <div className={styles.container}>
      <Web3Button
        contractAddress="0xA87CfC6393651cE7810A8451fab74f4022cEdA4D"
        action={(contract) => contract.erc721.claim(1)}
        onSuccess={() => alert("Claimed!")}
        onError={() => alert("Something went wrong")}
      >
        Claim
      </Web3Button>
    </div>
  );
}
