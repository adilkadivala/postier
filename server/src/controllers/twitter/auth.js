const crypto = require("crypto");
const twitterClientService = require("../../services/twitter");
const { TwitterApi } = require("twitter-api-v2");

const CALLBACK_URL = process.env.CALLBACK_URL;

const auth = async (req, res) => {
  const state = crypto.randomBytes(32).toString("hex");
  try {
    const { url, codeVerifier } = twitterClientService.generateOAuth2AuthLink(
      CALLBACK_URL,
      {
        state: state,
        scope: [
          "tweet.read",
          "tweet.write",
          "offline.access",
          "users.read",
          "block.read",
          "block.write",
          "bookmark.read",
          "bookmark.write",
          "dm.read",
          "dm.write",
          "follows.read",
          "follows.write",
          "like.read",
          "like.write",
          "list.read",
          "list.write",
          "mute.read",
          "mute.write",
          "space.read",
          "tweet.moderate.write",
        ],
      }
    );

    req.session.state = state;
    req.session.codeVerifier = codeVerifier;
    req.session.save();

    res.redirect(url);
  } catch (error) {
    console.error("Error generating auth URL:", error.message);
    res.status(500).send("Error generating auth URL.");
  }
};

const callBack = async (req, res) => {
  const { code, state } = req.query;

  if (state !== req.session.state) {
    return res.status(400).send("Invalid state parameter.");
  }

  try {
    const codeVerifier = req.session.codeVerifier;

    if (!codeVerifier) {
      return res.status(500).send("Code verifier not found in session.");
    }

    const requestClient = new TwitterApi({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    });

    const {
      client: loggedClient,
      accessToken,
      refreshToken,
    } = await requestClient.loginWithOAuth2({
      code,
      codeVerifier: codeVerifier,
      redirectUri: CALLBACK_URL,
    });

    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;

    res.redirect("http://localhost:3000/schedule");
  } catch (error) {
    console.error("Error getting access token:", error);

    if (error.response) {
      console.error("Twitter API Error Response:", error.response.data);
    }
    res
      .status(500)
      .send({ message: "Error getting access token.", error: error.message });
  }
};

module.exports = { auth, callBack };
