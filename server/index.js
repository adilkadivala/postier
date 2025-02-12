import express from "express";
import env from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import twitterServices from "./src/services/twitter.js";

env.config();

// Initialize Express
const app = express();
const PORT = process.env.SERVER_PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send(`
    <h1>Twitter Auth Demo</h1>
    <a href="/auth/twitter">Login with Twitter</a>
  `);
});

// 1. Initiate OAuth Flow
app.get("/auth/twitter", async (req, res) => {
  try {
    const { url, oauth_token, oauth_token_secret } =
      await twitterServices.generateAuthLink(process.env.CALLBACK_URL);

    // Store temporary credentials in session
    req.session.oauth_token = oauth_token;
    req.session.oauth_token_secret = oauth_token_secret;

    res.redirect(url);
  } catch (error) {
    console.error("Auth initiation error:", error);
    res.status(500).send("Authentication failed");
  }
});

// 2. Handle Callback
app.get("/auth/callback", async (req, res) => {
  try {
    const { oauth_token, oauth_verifier } = req.query;

    // Retrieve stored temp credentials
    const { oauth_token: storedToken, oauth_token_secret } = req.session;

    if (!storedToken || storedToken !== oauth_token) {
      throw new Error("OAuth token mismatch");
    }

    // Get permanent credentials
    const { client: authedClient } = await twitterServices.loginWithOAuth1({
      oauthToken: oauth_token,
      oauthVerifier: oauth_verifier,
      oauthTokenSecret: oauth_token_secret,
    });

    // Store authenticated client in session
    req.session.twitterClient = authedClient;

    res.send(`
      <h1>Authenticated!</h1>
      <a href="/tweet">Post Test Tweet</a>
    `);
  } catch (error) {
    console.error("Callback error:", error);
    res.status(500).send("Authentication failed");
  }
});

// 3. Tweet Endpoint (Protected)
app.get("/tweet", async (req, res) => {
  try {
    if (!req.session.twitterClient) {
      return res.status(401).send("Not authenticated");
    }

    const tweet = await req.session.twitterClient.v2.tweet(
      "Hello from authenticated user!"
    );
    res.json({ success: true, tweet });
  } catch (error) {
    console.error("Tweet error:", error);
    res.status(500).json({ error: "Tweet failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
