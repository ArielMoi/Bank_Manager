require("./db/mongoose");
const User = require("./models/user");
const Account = require("./models/account");
const Transition = require("./models/transition");
const { ObjectID } = require("mongodb");

const createUser = (details) => {
  const user = new User({
    name: details.name,
    email: details.email,
    age: details.age,
  });

  const userAccount = new Account({
    user_id: user._id,
    user_name: user.name,
  });

  try {
    user.save().then(() => console.log("User created: \n" + user));
    userAccount.save().then(() => console.log("Account created: \n" + user));
  } catch (e) {
    throw new Error(e);
  }

  return { user, userAccount };
};

const createAccount = async (user) => {
  const userAccount = new Account({
    user_id: user._id,
    user_name: user.name,
  });

  try {
    userAccount.save().then(() => console.log("Account created:"));
  } catch (e) {
    throw new Error(e);
  }

  return userAccount;
};

const updateAccount = async (accountId, amount) => {
  // amount will be negative for withdraws
  const account = await Account.findById(accountId);

  // const updatedAccountCash = account.cash + amount;
  const updatedAccount = await Account.findByIdAndUpdate(
    account._id,
    { $inc: { cash: amount } },
    { new: true }
  );

  console.log(updatedAccount);
  return updatedAccount;
};

const makeTransition = async (
  transferringAccountId,
  receivingAccountId,
  amount
) => {
  let transferringAccount = await Account.findById(transferringAccountId);
  let receivingAccount;
  let transition;

  // check if enough cash and credit.
  if (
    transferringAccount.cash > amount ||
    transferringAccount.credit > Math.abs(transferringAccount.cash - amount)
  ) {
    transferringAccount = await updateAccount(
      transferringAccountId,
      amount * -1
    );
    receivingAccount = await updateAccount(receivingAccountId, amount);

    transition = new Transition({
      amount,
      transferringAccount: transferringAccount,
      receivingAccount: receivingAccount,
    });

    /// adding transition details to each of the involved accounts.
    receivingAccount = await Account.findByIdAndUpdate(
      receivingAccountId,
      { $push: { transitions: transition } },
      { new: true }
    );
    transferringAccount = await Account.findByIdAndUpdate(
      transferringAccountId,
      { $push: { transitions: transition } },
      { new: true }
    );

    await transition.save();
  } else {
    return "not enough cash in transferring account";
  }

  return { transferringAccount, receivingAccount, transition };
};

module.exports = { createUser, makeTransition, updateAccount, createAccount };
