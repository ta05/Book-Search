import axios from "axios"

const KEY = "AIzaSyDOUNO1Amnu2pzTGz_44oJpaNznNbxq-RY";

const searchBooks = function(query) {
    return axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${KEY}`
    );
};

export default { searchBooks }