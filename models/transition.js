const mongoose = require("mongoose");
// const { ObjectId } = require("mongoose");

const Transition = mongoose.model("Transition", {
  amount: {
    type: Number,
    required: true,
  },
  transferringAccount: {
    type: Object,
    required: true,
  },
  receivingAccount: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Transition;