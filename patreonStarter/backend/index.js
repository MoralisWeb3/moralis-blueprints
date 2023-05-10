const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(cors());
app.use(express.json());


app.get("/extraMonth", async (req, res) => {
    return res.status(200).json({});
  });



app.listen(port, () => {
  console.log(`Listening for API Calls`);
});
