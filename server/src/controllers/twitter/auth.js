const crypto = require("crypto");
const twitterClientService = require("../../services/twitter");

const auth = async (req, res) => {
    const state = crypto.randomBytes(32).toString("hex");
    try {
        const { url, codeVerifier } = twitterClientService.generateOAuth2AuthLink(
          CALLBACK_URL = process.env.CALLBACK_URL,
          {
            state: state,
            scope: ["tweet.read", "tweet.write", "offline.access", "users.read", "block.read", "block.write", "bookmark.read", "bookmark.write", "dm.read","dm.write","follows.read", "follows.write","like.read", "like.write", "list.read", "list.write", "mute.read", "mute.write", "space.read", "tweet.moderate.write", ],
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
}

module.exports = {auth}