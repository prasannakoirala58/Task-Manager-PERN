const prisma = require("../prisma");

exports.getProfile = async (req, res) => {
  try {
    // req.user is already set by auth middleware from the JWT
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }

    return res.status(200).json({
      user,
      status: true,
      msg: "Profile loaded successfully",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};
