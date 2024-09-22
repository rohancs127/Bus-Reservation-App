const jwt = require("jsonwebtoken");
const pool = require("../db");

const authenticate = async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authenticated, please login",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      decodedToken.user.email,
    ]);

    if (!user.rows[0]) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user.rows[0];
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Request. Token is not valid",
    });
  }
}

module.exports = authenticate ;
