const express = require("express");
const router = new express.Router();
const { createUser, updateAccount } = require("../utilities.js");
const User = require("../models/user.js");

router.get("/users/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/users/", async (req, res) => {
  try {
    const { user, userAccount } = await createUser(req.body);
    res.status(200).send({ user, userAccount });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const userDeleted = await User.deleteOne({ _id: req.params.id });
    res.status(200).send(userDeleted);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
