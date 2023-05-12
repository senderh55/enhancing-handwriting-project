const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) throw new Error("Age must be a positive number");
      },
    },
    description: {
      type: String,
      trim: true,
    },
    numberOfPractices: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    practiceResults: [
      {
        practiceID: {
          type: Number,
          required: true,
        },
        practiceDate: {
          type: String,
          required: true,
        },
        practiceTime: {
          type: String,
          required: true,
        },
        maxDistance: {
          type: Number,
          required: true,
        },
        lineDeviations: {
          type: Number,
          required: true,
        },
        wrongLineWritings: {
          type: Number,
          required: true,
        },
        distanceDeviations: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
