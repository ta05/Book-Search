require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let uri = "mongodb://localhost/booksdb"
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    uri = process.env.MONGODB_URI;
}

mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});
