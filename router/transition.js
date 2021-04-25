const express = require("express");
const router = new express.Router();
const { makeTransition } = require("../utilities.js");
const Transition = require("../models/transition.js");

router.get("/transitions/", async (req, res) => {
  try {
    const transitions = await Transition.find({});
    res.status(200).send(transitions);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/transitions/:id", async (req, res) => {
  try {
    const transition = await Transition.findById(req.params.id);
    res.status(200).send(transition);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/transitions/:id", async (req, res) => {
  try {
    const transitionDeleted = await Transition.deleteOne({
      _id: req.params.id,
    });
    res.status(200).send(transitionDeleted);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/transitions/", async (req, res) => {
  console.log(req.body);
  try {
    const transition = await makeTransition(
      req.body.transferringAccount,
      req.body.receivingAccount,
      req.body.amount
    );

    res.status(200).send(transition);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/transitions/transfer/", async (req, res) => {
  if (
    req.query.transferringAccount &&
    req.query.receivingAccount &&
    req.query.amount
  ) {
    try {
      const transition = await makeTransition(
        req.query.transferringAccount,
        req.query.receivingAccount,
        req.query.amount
      );

      res.status(200).send(transition);
    } catch (e) {
      res.status(400).send(e.message);
    }
  } else {
    res.status(500).send(e.message);
  }
});

module.exports = router;
