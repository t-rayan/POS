const jwt = require("jsonwebtoken");

const authHandler = async (req, res, next) => {
  try {
    let token = await req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (!decoded) {
      return res.status(400).json({ message: "Failed to authenticate" });
    }
    next();
  } catch (error) {
    console.log(error.message);
    // return res.status(400).json({ message: "Token in not valid" });
  }
};
module.exports = authHandler;
