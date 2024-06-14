var express = require("express");
const dotenv = require("dotenv");
dotenv.config();
var router = express.Router();
const { OAuth2Client } = require("google-auth-library");

router.post("/login", async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  const redirectURL = "http://127.0.0.1:3000/login";

  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectURL
  );

  const auth = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/userinfo.profile openid"],
  });
  res.json({ url: auth });
});

module.exports = router;

