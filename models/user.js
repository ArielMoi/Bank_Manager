const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('not a valid email')
            }
        },
        unique: true,
    }, 
    age: {
        type: Number,
        min: 16,
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
})

module.exports = User;