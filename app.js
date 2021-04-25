const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path')

const publicDirectory = path.join(__dirname, "client/build")
app.use(express.static(publicDirectory));

require("./db/mongoose");
const port = process.env.PORT || 5000;
const accountRouter = require('./router/account.js')
const userRouter = require('./router/user.js')
const transitionRouter = require('./router/transition.js')

app.use(cors());
app.use(express.json());
app.use(accountRouter); 
app.use(userRouter); 
app.use(transitionRouter); 

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// * password encryption:
// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//   const password = 'Res123456!';
//   const hashedPassword = await bcrypt.hash(password, 8);

//   console.log(password)
//   console.log(hashedPassword);

//   const isMatch = await bcrypt.compare(password, hashedPassword)
//   console.log(isMatch);

// }

// myFunction()