const jwt = require("jsonwebtoken");

function generateToken(id) {
  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  return { accessToken: accessToken };
}

module.exports = { generateToken };
