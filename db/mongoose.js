const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Ariel:Am134679@cluster0.ifblk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
