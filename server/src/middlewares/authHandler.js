const jwt = require("jsonwebtoken");

const authHandler = async (req, res, next) => {
  try {
    let token = await req.headers["x-access-token"];
    !token && res.status(401).json({ message: "No token provided" });

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    !decoded && res.status(400).json({ message: "Failed to authenticate" });
    next();
  } catch (error) {
    error && res.status(400).json({ message: "Token in not valid" });
  }
};
module.exports = authHandler;
