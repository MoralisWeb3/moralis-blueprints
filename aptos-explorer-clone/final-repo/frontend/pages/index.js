import Head from "next/head";

import Header from "../components/header.js";
import Main from "../components/main.js";

export default function Home() {
  return (
    <section className="font-mono min-h-screen bg-[#131615]">
      <Head>
        <title>Aptos Explorer</title>
      </Head>
      <Header />
      <Main />
    </section>
  );
}
