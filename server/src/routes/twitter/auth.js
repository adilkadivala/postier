const express = require("express");
const  xRoutes = require("../../controllers/twitter/auth")


const router = express.Router();

router.route("/auth").get(xRoutes.auth);
router.route("/callback").get(xRoutes.callBack);

module.exports = router