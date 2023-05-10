import Moralis from "moralis";

const config = {
  domain: process.env.APP_DOMAIN,
  statement: "Web Login.",
  uri: process.env.NEXTAUTH_URL,
  timeout: 60,
};

export default async function handler(req, res) {
  const { address, chain } = req.body;

  try {
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  } catch (e) {
    console.log("Moralis Started Already");
  }
  try {
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      ...config,
    });

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error });
    console.error(error);
  }
}
