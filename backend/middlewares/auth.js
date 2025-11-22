const jwt = require("jsonwebtoken");
const prisma = require("../prisma");

async function auth(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ status: false, msg: "No token provided" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ status: false, msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res
      .status(401)
      .json({ status: false, msg: "Invalid or expired token" });
  }
}

module.exports = auth;
