const { TwitterApi } = require("twitter-api-v2");


// posting
const tweet = async (req, res) => {
  try {
    if (!req.session.accessToken) {
      return res
        .status(401)
        .send("Not authenticated. Go to /auth to authenticate.");
    }

    const authenticatedClient = new TwitterApi(req.session.accessToken);
    await authenticatedClient.v2.tweet(
      req.body.tweetText || "Hello world! this is auto-post project \n #ai \n #development"
    );
    res.send({ message: "Tweet posted successfully!" });
  } catch (error) {
    console.error("Error tweeting:", error);
    res.status(500).send("Error posting tweet.");
  }
};


module.exports = {tweet}