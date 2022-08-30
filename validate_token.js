const jwt = require("jsonwebtoken");
// Validate JWT access token

function validateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(authHeader, token, req.headers);
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.tokenData = decoded;
      next();
    });
  }

    module.exports = validateToken;