const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected");
});

// Models
require("./Category.js");
require("./Recipe.js");
