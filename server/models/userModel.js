const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");
const Profile = require("./profileModel");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
      validate(pass) {
        if (pass.toLowerCase().includes("password"))
          throw new Error(`PASSWORD cannot contain "password"`);
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      async validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    validationCode: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    tokens: [
      // server's way to invalidate specific tokens
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true, // createdAt, updatedAt fields
  }
);

userSchema.virtual("profiles", {
  //relationship between two entities
  ref: "Profile",
  localField: "_id", // field on User
  foreignField: "owner", // field to Profie
});
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.validationCode;
  delete userObject.isVerified;
  return userObject;
};
userSchema.methods.generateAuthToken = async function () {
  // methods -> accessible from instances
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.methods.createValidationCode = async function () {
  // methods -> accessible from instances
  const user = this;
  const validationCode = Math.floor(100000 + Math.random() * 900000); // 6 digits
  user.validationCode = validationCode;
  user.isVerified = false;
  await user.save();
  return validationCode;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // statics -> accessible from models
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Incorrect password");
  return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  // do something before user save
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete user profiles when user is removed
userSchema.pre("remove", async function (next) {
  const user = this;
  await Profile.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema);
userSchema.plugin(uniqueValidator);
module.exports = User;
