require('dotenv').config();
const jwt = require("jsonwebtoken");
// Generate JWT access token
function generateAccessToken(email) {
  return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "1800s", });
}

module.exports = generateAccessToken;