const express = require("express");
const twitterPost = express.Router();
const twitte = require("../../controllers/twitter/twitte-post");

twitterPost.route("/tweet").post(twitte.tweet);

module.exports = twitterPost;
