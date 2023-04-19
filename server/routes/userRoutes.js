const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const email = require("../utils/Email");

// CREATE User
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    // create verification code and send email
    const verificationCode = await user.createVerificationCode();
    await email.sendWelcomeEmail(user.email, user.name, verificationCode);
    res.status(201).send({ user, token });
  } catch (e) {
    let errorMessage = JSON.stringify(e.message);
    res.status(400).send(errorMessage);
  }
});

// LOGIN User
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token, isVerified: user.isVerified });
  } catch (e) {
    let errorMessage = JSON.stringify(e.message);
    if (e.message === "User not found") res.status(404).send(errorMessage);
    else if (e.message === "Incorrect password")
      res.status(401).send(errorMessage);
    else res.status(500).send(errorMessage);
  }
});

// Log out from current device
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      // remove the specific token from tokens array
      token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// Log out from all devices FIXME - not implemented yet in client
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// UPDATE User - update user's password
router.patch("/users/me", auth, async (req, res) => {
  // const allowedUpdates = ["name", "email", "password", "age"];
  // const isValidOperation = updates.every((update) =>
  //   allowedUpdates.includes(update)
  // );
  // if (!isValidOperation) {
  //   return res.status(400).send({ error: "Invalid updates!" });
  // }

  try {
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    const isMatch = await bcrypt.compare(
      // compare old password with password in DB
      req.body.password.oldPassword,
      req.user.password
    );
    if (!isMatch) {
      return res.status(401).send({ error: "Incorrect old password" });
    }
    // forEach for each upadte in updates array that we get from req.body
    //updates.forEach((update) => (req.user[update] = req.body[update]));
    req.user.password = req.body.password.newPassword; // update password in DB with new password
    await req.user.save(); // .save() automatically runs our validators by default
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e); // handle validation errors
  }
});

// verify user's email
router.patch("/users/emailVerification", async (req, res) => {
  try {
    // find user by email and verification code
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const { verificationCode } = req.body;
    if (!verificationCode)
      return res.status(400).send({ error: "Verification code is required" });
    const isMatch = user.verificationCode === verificationCode;
    if (!isMatch) {
      return res.status(401).send({ error: "Incorrect verification code" });
    }
    user.isVerified = true;
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e); // handle verification errors
  }
});

// resend verification code
router.patch("/users/resendVerificationCode", async (req, res) => {
  try {
    // find user by email and verification code
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    // create verification code and send email
    const verificationCode = await user.createVerificationCode();
    await email.sendWelcomeEmail(user.email, user.name, verificationCode);
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    // req.user accessible because auth middleware
    await req.user.remove(); // const user = await User.findByIdAndDelete(req.user._id);
    res.send(req.user);
  } catch (e) {
    return res.status(500).send();
  }
});

module.exports = router;
