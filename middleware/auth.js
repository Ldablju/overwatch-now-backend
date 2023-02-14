const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(400).json({
      message: "The token has not been sent!",
      status: 400
    })
  
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
      if (err){
        return res.status(403).json({
          message: "Invalid token!",
          status: 403
        })
      }
      req.user = user
      next()
    })
  }

module.exports = authenticateToken;
