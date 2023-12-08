import {
  useConnectionStatus,
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useNFT,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const NFTDisplay = ({ contract, tokenId }) => {
  const { data: nft, isLoading, error } = useNFT(contract, tokenId);

  if (isLoading) return <div>Fetching NFT...</div>;
  if (error) return <div>Error fetching NFT</div>;
  if (!nft) return <div>NFT not found</div>;

  return (
    <div>
      <img src={nft.metadata.image} alt={`NFT ${tokenId}`} className={styles.imageContainer} />
      <h3>{nft.metadata.name}</h3>
    </div>
  );
};

export default function Home() {
  const connectionStatus = useConnectionStatus();
  const address = useAddress();
  const { contract } = useContract("0xA87CfC6393651cE7810A8451fab74f4022cEdA4D");
  const [ownedTokenIds, setOwnedTokenIds] = useState([]);

  useEffect(() => {
    const fetchOwnedTokenIds = async () => {
      if (address && contract) {
        try {
          const fetchedOwnedTokenIds = await contract.erc721.getOwnedTokenIds(address);
          setOwnedTokenIds(fetchedOwnedTokenIds);
        } catch (error) {
          console.error("Error fetching owned token IDs", error);
        }
      }
    };

    fetchOwnedTokenIds();
  }, [address, contract]);

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

      <h2>
      {connectionStatus == "connected" && (
          <>Your owned NFT</>
        )}
      </h2>

      {ownedTokenIds.length > 0 ? (
        <div className={styles.nftContainer}>
          {ownedTokenIds.map((tokenId) => (
            <div key={tokenId} className={styles.nftItem}>
              <NFTDisplay contract={contract} tokenId={tokenId} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.nftContainer}>
          <div className={styles.customParagraph2}>
          {connectionStatus == "connected" && (
          <>NFT not found</>
        )}
          </div>
        </div>
      )}

      <p className={styles.customParagraph2} onClick={handleLogoClick}>
        ▷back to official site◁
      </p>
    </div>
  );
}
