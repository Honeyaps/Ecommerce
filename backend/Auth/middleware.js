const jwt = require("jsonwebtoken");
require("dotenv").config();

function Auth(req, res, next) {
  const header = req.headers.authorization;
  try {
    const token = jwt.verify(header,process.env.SECRET);
    if (!token) {
      return res.status(403).json({ msg: "cannot perform operation" });
    }
    req.userId = token;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ msg: "cannot perform operation" });
  }
}

module.exports = Auth
