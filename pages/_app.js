import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {

  return (
    <ThirdwebProvider
      activeChain="polygon"
      clientId="20d4b97fb1686bd8f88bab13eea50c6c"
      sdkOptions={{
        gasless: {
          openzeppelin: {
            relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL,
          },
        },
      }}
      desiredChainId={ChainId.Polygon}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
