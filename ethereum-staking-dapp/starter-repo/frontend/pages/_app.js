import "@/styles/globals.css";
import { configureChains, sepolia, WagmiConfig, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

export default function App({ Component, pageProps }) {
  const { provider, webSocketProvider } = configureChains(
    [sepolia],
    [publicProvider()]
  );

  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
