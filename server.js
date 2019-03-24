const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const apiRiddles = require("./routes/api/ApiRiddles");

let app = express();

//Define middleware here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo database
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/kidriddles")
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Use routes
app.use("/api/riddles", apiRiddles);

// Start the API server
app.listen(PORT, () => {
  console.log(`ðŸŒŽ ==> API Server now listening on PORT ${PORT}!`);
});
