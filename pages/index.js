import { Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

export default function Home() {

  const handleLogoClick = () => {
    // ましゅくまの文字をクリックしたときの処理
    window.location.href = "https://mashkuma.studio.site";
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>
        ましゅくまアイコンをもらおう！
      </h1>
      <img src="/icon-sample.png" alt="サンプル画像" className={styles.image} />
      <p className={styles.customParagraph1}>
        ↓Get it from here!↓
      </p>
      <div className={styles.buttonContainer}>
        <Web3Button
          contractAddress="0xA87CfC6393651cE7810A8451fab74f4022cEdA4D"
          action={(contract) => contract.erc721.claim(1)}
          onSuccess={() => alert("Claimed!")}
          onError={() => alert("Something went wrong")}
        >
          Claim
        </Web3Button>
      </div>
      <p className={styles.customParagraph2}>
        メタマスクなどのウォレットが必要です。
      </p>
      <p className={styles.customParagraph2} onClick={handleLogoClick}>
        ▷back to offical site◁
      </p>
    </div>
  );
}