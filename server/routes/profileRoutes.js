const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Profile = require("../models/profileModel");

// GET /profiles?completed=true
// GET /profiles?limit=20&skip=10
// GET /profiles?sortBy=createdAt:desc
router.get("/profiles", auth, async (req, res) => {
  const match = {};
  const sort = {};
  let { limit, completed, skip, sortBy } = req.query;
  if (completed) {
    match.completed = req.query.completed === "true";
  }
  skip = parseInt(skip);
  if (sortBy) {
    const [filter, order] = sortBy.split(/_|:/);
    sort[filter] = order === "desc" ? -1 : 1;
  }
  try {
    // const profiles = await profile.find({ owner: req.user._id }); ALTERNATIVE

    await req.user.populate({
      path: "profiles",
      match, // Filtering Data based on query string (if exist)
      options: {
        // Paginating Data
        limit,
        skip,
        sort,
      },
    });

    res.send(req.user.profiles);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/profiles", auth, async (req, res) => {
  //const profile = new profile(req.body);
  console.log("req.body", req.body);
  const profile = new Profile({ ...req.body, owner: req.user._id }); // all properties of req.body with addition of user id
  try {
    await profile.save();
    res.status(201).send(profile);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/profiles/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body); // returns an array of keys of the object passed in as argument

  try {
    const profile = await Profile.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!profile) return res.status(404).send();

    updates.forEach((update) => (profile[update] = req.body[update]));
    await profile.save();

    res.send(profile);
  } catch (e) {
    res.status(400).send(e); // handling validation
  }
});

router.delete("/profiles/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!profile) {
      res.status(404).send();
    }

    res.send(profile);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/profiles/:id/results", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      _id: req.params.id,
    });

    if (!profile) {
      res.status(404).send();
    }

    res.send(profile.practiceResults);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/profiles/:id/results", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      _id: req.params.id,
    });

    if (!profile) {
      res.status(404).send();
    }
    // numberOfPractices is the number of practices the user has done so far
    // used for practiceID
    profile.numberOfPractices++;

    const newPracticeResult = {
      practiceID: profile.numberOfPractices,
      practiceDate: req.body.practiceDate,
      practiceTime: req.body.practiceData.practiceTime,
      maxDistance: req.body.practiceData.maxDistance,
      lineDeviations: req.body.practiceData.lineDeviationErrorsConuter,
      wrongLineWritings: req.body.practiceData.wrongLineErrorsCounter,
      distanceDeviations: req.body.practiceData.distanceDeviationErrorsCounter,
    };

    console.log("newPracticeResult", newPracticeResult);

    profile.practiceResults = profile.practiceResults.concat(newPracticeResult);

    await profile.save();
    res.send(profile.practiceResults);
  } catch (e) {
    console.log("e", e);
    res.status(500).send();
  }
});

router.patch("/profiles/:id/results", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      _id: req.params.id,
    });

    if (!profile) {
      res.status(404).send();
    }
    console.log("req.body.practiceResults", req.body);
    console.log(
      "req.body.practiceResults.length",
      req.body.practiceResults.length
    );
    profile.practiceResults = req.body.practiceResults;

    if (!profile) return res.status(404).send();

    await profile.save();

    res.send(profile);
  } catch (e) {
    res.status(400).send(e); // handling validation
  }
});

module.exports = router;
