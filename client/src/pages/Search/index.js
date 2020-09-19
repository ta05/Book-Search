import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/BookCard";
import API from "../../utils/API";

function Search() {
    const [search, setSearch] = useState("");
    const [books, setBooks] = useState("");

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
                throw new Error("No results found.");
            }
            if (res.data.status === "error") {
                throw new Error(res.data.message);
            }
            setBooks(res.items);
        })
        .catch(err => setError(err));
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
