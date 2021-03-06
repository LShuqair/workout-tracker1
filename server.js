// Dependencies and packages
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

// Setting up Express App and setting up port
const app = express();
const PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing. Configuring middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Connecting to db mongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// Creating and importing api and html routes
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

// Starts the server to begin listening on the specified port
app.listen(PORT, () => {
    console.log(`App listening on Port ${PORT}!`);
});