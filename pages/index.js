import { useConnectionStatus, ConnectWallet, Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const connectionStatus = useConnectionStatus();

  const handleLogoClick = () => {
    window.location.href = "https://mashkuma.studio.site";
  };

  const shouldShowWeb3Button = connectionStatus === "connected";

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>ましゅくまアイコンをもらおう！</h1>
      <p className={styles.customParagraph1}>↓Get it from here!↓</p>
      <div className={styles.buttonContainer}>
        <div className={styles.walletContainer}>
          <ConnectWallet />
        </div>

        {shouldShowWeb3Button && (
          <div className={styles.buttonWrapper}>
            <Web3Button
              contractAddress="0xA87CfC6393651cE7810A8451fab74f4022cEdA4D"
              action={(contract) => contract.erc721.claim(1)}
              onSuccess={() => alert("Claimed!")}
              onError={() => alert("Something went wrong")}
            >
              GET
            </Web3Button>
          </div>
        )}
      </div>

      <p className={styles.customParagraph2}>
        {connectionStatus !== "connected" && (
          <>アカウントを作成、またはログインしてください。</>
        )}
      </p>
      <p className={styles.customParagraph2} onClick={handleLogoClick}>
        ▷back to offical site◁
      </p>
    </div>
  );
}
