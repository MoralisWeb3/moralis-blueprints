import styles from "../styles/Home.module.css";
import { Card } from "antd";
import { message } from "antd";
import { getSession } from "next-auth/react";
import Moralis from "moralis";
import axios from "axios";
import { ethers, parseEther } from "ethers";

function patrons({ nft, expiry }) {
  const [messageApi, contextHolder] = message.useMessage();

  async function addMonth() {
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const connectedWallet = await provider.getSigner();

    let tx = await connectedWallet.sendTransaction({
      to: "xxx",
      value: parseEther("0.5"),
    });

    tx.wait().then(async (r)=>{

      const res = await axios.get(`http://localhost:3001/extraMonth`, {
        params: { id: nft.token_id, expiry: expiry },
      });

      messageApi.success("Subscription Extended - Reloading Page in 4 seconds");

      setTimeout(()=>{
        location.reload();
      },4000)

    })

  }

  return (
    <>
      {contextHolder}
      <img className={styles.bannerImg} alt="bannerImg" src="/banner.png" />
      <span className={styles.imgshoutout}>
        Photo by{" "}
        <a href="https://unsplash.com/@jontyson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Jon Tyson
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/s/photos/banner?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </span>
      <div className={styles.patronContent}>
        <div className={styles.creatorInfo}>
          <img
            src="/creator.png"
            alt="creator"
            className={styles.creatorProfileImg}
          />
          <div className={styles.creatorProfileName}>Julie Smith</div>
          <div className={styles.creatorProfileOccupation}>Web3 Influencer</div>
          <img className={styles.socials} alt="socials" src="/socials.png" />
          <div className={styles.numOfPatrons}>231</div>
          <div className={styles.numOfPatronsTitle}>Patrons</div>
        </div>
        <div className={styles.feed}>
          <div className={styles.feedTitle}>Exclusive Feed</div>
          <div className={styles.feedItems}>
            <h2 style={{ textAlign: "left", width: "100%" }}>
              Token Burn Tutorial
            </h2>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/MNHYwbZIC5E"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className={styles.feedItems}>
            <h2 style={{ textAlign: "left", width: "100%" }}>
              My Life as A Web3 Nomad
            </h2>
            <p style={{ lineHeight: "20px", letterSpacing: "1px" }}>
              Today was another beautiful day here in Bali. I woke up early and
              headed to my favorite co-working space to start my workday as a
              web3 developer. Being a digital nomad has its challenges, but I'm
              grateful for the flexibility and freedom it provides. I spent the
              morning coding and debugging my latest project, which I'm really
              excited about. In the afternoon, I took a break to go for a swim
              in the ocean and catch up with some fellow nomads. We talked about
              our latest crypto investments and shared our experiences living
              and working abroad. It's always inspiring to connect with
              like-minded people. As the sun set over the rice paddies, I
              wrapped up my work and headed to a nearby warung for some
              delicious nasi goreng. Life is good here in Bali, and I feel so
              fortunate to be able to live and work in such a beautiful and
              vibrant place...
            </p>
          </div>
          <div className={styles.feedItems}>
            <h2 style={{ textAlign: "left", width: "100%" }}>
              Supabase with Web3 Tutorial
            </h2>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/m6mZ4xhi3kc"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className={styles.feedItems}>
            <h2>Web3 Career Opportunities Live Stream</h2>
            <p style={{ lineHeight: "20px", letterSpacing: "1px" }}>
              Dear Patrons, I'm excited to invite you all to my upcoming live
              stream this Sunday, where I'll be sharing my insights and
              experiences as a web3 developer and digital nomad living in Bali.
              During the stream, I'll be discussing the latest trends in web
              careers, the tools and technologies I use on a daily basis, and my
              tips for building a successful career in the web development
              industry. Whether you're just starting out in your career or
              you're a seasoned pro looking to up your game, there will be
              something for everyone in this stream.
            </p>
          </div>
        </div>
        <div className={styles.subInfo}>
          <div className={styles.timeLeft}>Patron Status</div>
          <Card title="Memeber" className={styles.yourMembership}>
            <div className={styles.cardTitle}>Number</div>
            <div>{nft.token_id}</div>
            <div className={styles.cardTitle}>Expiry</div>
            <div>{(new Date(expiry).toLocaleDateString())}</div>
            <div className={styles.cardTitle}>Scope</div>
            <div>
              Full Access to Julie Smith's exclusive content, custom rewards and
              an inside scoop into the world of Web3
            </div>
            <div className={styles.extend} onClick={addMonth}>
              Add 1 Month
            </div>
            <div
              className={styles.opensea}
              onClick={() => {
                window.open(
                  `https://testnets.opensea.io/assets/mumbai/xxx/${nft.token_id}`
                );
              }}
            >
              {" "}
              View on Opensea
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps(context) {

  const session = await getSession(context);

  //check if logged in
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  } catch (e) {
    console.log("Moralis Started Already");
  }

  const response = await Moralis.EvmApi.nft.getNFTOwners({
    chain: "0x13881",
    format: "decimal",
    mediaItems: false,
    address: "xxx",
  });

  //check if logged in user in patrons
  const nft = response.raw.result.find(
    (e) => e.owner_of.toLowerCase() === session.user.address.toLowerCase()
  );


  if(nft){
    const metadata = await axios.get(nft.token_uri);

    if (metadata.data.attributes[0].value >= Date.now()) {
      return {
        props: {
          expiry: metadata.data.attributes[0].value,
          nft: nft,
        },
      };
    }
  }else{
    console.log("no valid subscription")
  }

  //redirect to home page
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };

  

}


export default patrons;
