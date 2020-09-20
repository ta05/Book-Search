const axios = require("axios");
const db = require("../models");

const findAll = function (req, res) {
    const KEY = process.env.API_KEY;
    axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${req}&key=${KEY}`)
        .then(
            results => db.Book.find()
                .then(myBooks => results.filter(googleBook => myBooks.every(myBook => myBook.googleId.toString() !== googleBook.id))))
        .then(newBooks => res.json(newBooks))
        .catch(err => res.status(422).json(err));
}

module.exports = { findAll };