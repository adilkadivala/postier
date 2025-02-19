require("dotenv").config();
const express = require("express");
const XAuthroutes = require("./src/routes/twitter/auth");
const XPostRoure = require("./src/routes/twitter/twitte-post");
const session = require("express-session");

const cors = require("cors");
const bodyParser = require("body-parser");

const corsOptions = {
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  origin: "http://localhost:3000",
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
const PORT = process.env.SERVER_PORT || 8000;

app.use(
  session({
    secret: process.env.SESSION_SECRET || "thisismymostlovableproject",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(cors(corsOptions));
app.use(express.json());
app.use(XAuthroutes);
app.use(XPostRoure);
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
