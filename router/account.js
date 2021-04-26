const express = require('express');
const router = new express.Router();
const Account = require('../models/account.js')
const {updateAccount,createAccount} = require('../utilities.js')

router.get('/accounts/', async (req, res) => {
    try {
        const allAccounts = await Account.find({});
        res.status(200).send(allAccounts);
    } catch (e){
        res.status(400).send(e.message);
    }
})

router.get('/accounts/:id', async (req, res) => {
    try {
        const accounts = await Account.findById(req.params.id);
        res.status(200).send(accounts);
    } catch (e){
        res.status(400).send(e.message);
    }
})

router.post("/accounts/", async (req, res) => {
  try {
    const userAccount = await createAccount(req.body);
    res.status(200).send(userAccount);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/accounts/:id", async (req, res) => {
  try {
    const accountDeleted = await Account.deleteOne({ _id: req.params.id });
    res.status(200).send(accountDeleted);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

router.patch("/accounts/:id", async (req, res) => {
  try {
    if (!req.query.amount) {
      res.status(400).send("no amount stated.");
    }
    const accountUpdated = await updateAccount(req.params.id, req.query.amount);
    res.status(200).send(accountUpdated);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;