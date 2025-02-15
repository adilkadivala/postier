// import express from "express";
// import env from "dotenv";
// import cors from "cors";
// import bodyParser from "body-parser";
// import session from "express-session";
// import twitterServices from "./src/services/twitter.js";
// import CronJob from "cron";

// env.config();

// const app = express();
// const PORT = process.env.SERVER_PORT || 8000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "default-secret",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// const tweet = async () => {
//   try {
//     await twitterServices.v2.tweet("Hello world!");
//   } catch (error) {
//     console.log(error);
//   }
// };

// tweet();

// app.listen(PORT, () => {
//   console.log(`server is running on http://localhost:${PORT}`);
// });

import express from "express";
import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
import session from "express-session";
import crypto from "crypto";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();



const corsOptions = {
  credentials: "true",
  methods: "GET,POST,PUT,DELETE",
  origin: "http://localhost:3000",
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
const PORT = process.env.SERVER_PORT || 8000;



app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json())




app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

const twitterClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const CALLBACK_URL =
  process.env.CALLBACK_URL || "http://localhost:8000/callback";

// Step 1: Create the authorization URL (OAuth 2.0 - Corrected)
app.get("/auth", async (req, res) => {
  console.log("auth hited")
  const state = crypto.randomBytes(32).toString("hex");

  try {
    const { url, codeVerifier } = twitterClient.generateOAuth2AuthLink(
      CALLBACK_URL,
      {
        state: state,
        scope: ["tweet.read", "tweet.write", "offline.access", "users.read"],
      }
    );

    req.session.state = state;
    req.session.codeVerifier = codeVerifier; // Store code verifier
    req.session.save(); // Ensure session is saved

    res.redirect(url);
  } catch (error) {
    console.error("Error generating auth URL:", error);
    res.status(500).send("Error generating auth URL.");
  }
});


app.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  console.log("callback hited")

  if (state !== req.session.state) {
      return res.status(400).send('Invalid state parameter.');
  }

  try {
      const codeVerifier = req.session.codeVerifier;

      if (!codeVerifier) {
          return res.status(500).send("Code verifier not found in session.");
      }

      const requestClient = new TwitterApi({ 
          clientId: process.env.TWITTER_CLIENT_ID, 
          clientSecret: process.env.TWITTER_CLIENT_SECRET 
      });

      const { client: loggedClient, accessToken, refreshToken } = await requestClient.loginWithOAuth2({
          code,
          codeVerifier: codeVerifier,
          redirectUri: CALLBACK_URL,
      });


      req.session.accessToken = accessToken;
      req.session.refreshToken = refreshToken;

      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);

      res.redirect('/success');
  } catch (error) {
      console.error('Error getting access token:', error);

      if (error.response) {
          console.error("Twitter API Error Response:", error.response.data);
      }
      res.status(500).send({ message: "Error getting access token.", error: error.message });
  }
});


// Step 3: Success page
app.get("/success", (req, res) => {
  console.log("success hited")
  res.send(
    "Successfully authenticated! Access token is available (but should be stored securely)."
  );
  res.redirect("/tweet")
});

// Step 4: Route to post a tweet (after authentication)
app.post("/tweet", async (req, res) => {
  console.log("tweet hited")
  try {
    if (!req.session.accessToken) {
      return res
        .status(401)
        .send("Not authenticated. Go to /auth to authenticate.");
    }

    const authenticatedClient = new TwitterApi(req.session.accessToken);
    await authenticatedClient.v2.tweet(
      req.body.tweetText || "Hello world! (OAuth 2.0 - Corrected)"
    );
    res.send({ message: "Tweet posted successfully!" });
  } catch (error) {
    console.error("Error tweeting:", error);
    res.status(500).send("Error posting tweet.");
  }
});

app.get("/", (req, res) =>{
  res.send("welcome")
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
