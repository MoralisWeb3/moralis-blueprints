const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(cors());
app.use(express.json());


const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket("xxx");

function uploadFile(tokenId, startDate){

  const fileRef = storageRef.file(`metadata/${tokenId}.json`);


  const data = {
    attributes: [
      {
        trait_type: "expiry",
        value: (Number(startDate) + 2592000000),
      },
    ],
    description:
      "Full Access to Julie Smith's exclusive content, custom rewards and an inside scoop into the world of Web3",
    image:
      "xxx",
  
  }

  const dataString = JSON.stringify(data);

  const stream = fileRef.createWriteStream();
  stream.write(dataString);
  stream.end();

  stream.on("error", (error) => {
    console.error("Error updating patron metadata:", error);
  });

  stream.on("finish", () => {
    console.log("Patron metadata updated succesfully");
  });


}


app.get("/extraMonth", async (req, res) => {
  const { query } = req;

  let startDate = Date.now();

  if (query.expiry) {
    startDate = query.expiry;
  }

  uploadFile(query.id, startDate);

  return res.status(200).json({});
});

app.listen(port, () => {
  console.log(`Listening for API Calls`);
});
