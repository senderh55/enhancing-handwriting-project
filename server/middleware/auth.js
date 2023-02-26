const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); // header the client provides
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // validates the header
    const user = await User.findOne({
      // find the user
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error(); // triger catch
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(`auth.js error\n" ${e}`);
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
