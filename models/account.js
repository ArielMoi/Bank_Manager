const mongoose = require('mongoose');
const {ObjectId} = require('mongoose');

const Account = mongoose.model("Account", {
  user_id: {
    type: ObjectId,
    required: true,
  },
  user_name: {
    type: String
  },
  credit: {
    type: Number,
    default: 0,
  },
  cash: {
    type: Number,
    default: 0,
  },
  transitions: {
    type: Array,
  },
});

module.exports = Account;