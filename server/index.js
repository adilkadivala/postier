import express from "express";
import env from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// constant
const app = express();
env.config();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// port
const PORT = process.env.SERVER_PORT || 8000;

// test
app.get("/", (req, res) => {
  res.send("hey! welcome");
});

app.get("/server", (req, res) => {
  return res.status(200).json("new server attached");
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
