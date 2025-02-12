import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";

dotenv.config();

// Authenticate using OAuth 1.0a (App Key & Secret)
const twitterServices = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

export default twitterServices;
