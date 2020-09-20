import React, { useState, useEffect } from "react";
import {Row, Col, Container} from "../../components/Grid";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/BookCard";
import API from "../../utils/API";

function Search() {
    const [search, setSearch] = useState("");
    const [books, setBooks] = useState([]);
    const [message, setMessage] = useState("Search for a book");

  // When the component mounts, update the title to be Wikipedia Searcher
    useEffect(() => {
        if (!search) {
            return;
        }
    }, [search]);

    const handleInputChange = event => {
        setSearch(event.target.value);
    };

    const handleFormSubmit = event => {
        event.preventDefault();

        API.searchBooks(search)
            .then(res => {
                if (res.data.length === 0) {
                    setMessage("No New Books");
                }
                else
                    setBooks(res.data);
            })
            .catch(() =>
                setMessage("There was an error in your Search")
            );
    };

    const handleSaveBooks = id => {
        const book = books.find(book => book.id === id);

        API.saveBook({
            googleId: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.image,
            link: book.volumeInfo.link,
        })
            .then(() => API.getBooks());

    };

    return (
        <div>
        <Container style={{ minHeight: "100vh" }}>
            <h1 className="text-center">Search For A Book</h1>
            <Alert type="danger" style={{ opacity: error ? 1 : 0, marginBottom: 10 }}>
            {error}
            </Alert>
            <SearchForm
            handleFormSubmit={handleFormSubmit}
            handleInputChange={handleInputChange}
            results={search}
            />
            <BookCard title={title} url={url} />
        </Container>
        </div>
    );
}

export default Search;
