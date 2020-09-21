import React, { useState } from "react";
import {Row, Col, Container} from "../../components/Grid";
import SearchForm from "../../components/SearchForm";
import { List, ListItem } from "../../components/List";
import Book from "../../components/Book";
import API from "../../utils/API";

function Saved() {
    const [saved, setSaved] = useState(this.getSavedBooks());
    
    const getSavedBooks = () => {
        API.getSavedBooks()
            .then(res => setSaved(res.data))
            .catch(err => console.log(err));
    };

    const handleBookDelete = id => {
        API.deleteBook(id)
            .then(res => this.getSavedBooks());
    };


    return (
        <div></div>
    );
}

export default Saved;