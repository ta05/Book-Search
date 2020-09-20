import axios from "axios"

const KEY = "AIzaSyDOUNO1Amnu2pzTGz_44oJpaNznNbxq-RY";

const searchBooks = function(query) {
    return axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${KEY}`
    );
};

const getBooks = function () {
    return axios.get("/api/books");
};

const saveBook = function (bookData) {
    return axios.post("/api/books", bookData);
};

const deleteBook = function (id) {
    return axios.delte("/api/books/" + id);
};

export default { searchBooks, getBooks, saveBook, deleteBook }