var express = require("express");
const dotenv = require("dotenv");
dotenv.config();
var router = express.Router();
const { OAuth2Client } = require("google-auth-library");

async function getUserData(access_token) {
  const responce = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await responce.json();
  return data;
}

router.get("/oauth", async function (req, res, next) {
  const code = req.query.code;
  try {
    const redirectURL = "http://127.0.0.1:3000/login";
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectURL
    );
    const response = await client.getToken(code);
    await client.setCredentials(response.tokens);
    console.log("tokens access");
    const userData = client.credentials;
    console.log(userData);
    await getUserData(userData.access_token);
  } catch (error) {
    console.log(error);
  }
});
