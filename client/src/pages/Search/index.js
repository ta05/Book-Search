import React, { useState, useEffect } from "react";
import {Row, Col, Container} from "../../components/Grid";
import SearchForm from "../../components/SearchForm";
import Book from "../../components/Book";
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
        <Container fluid>
            <Row>
                <Col size="offset-md-2 md-8">
                    <SearchForm
                        handleInputChange={handleInputChange}
                        handleFormSubmit={handleFormSubmit}
                        search={search}
                    />
                </Col>
            </Row>
            <Row>
                <Col size="md-6 sm-12">
                    <Jumbotron>
                        <h1>New Books</h1>
                    </Jumbotron>
                    {books.length ? (
                    <List>
                        {books.map(book => {
                        return (
                            <ListItem key={book._id}>
                                <Book book={book} handleClick={handleSaveBooks} name={"Save"}/>
                            </ListItem>
                        );
                        })}
                    </List>
                ) : (
                <h3>No Results to Display</h3>
                )}
                </Col>
            </Row>
        </Container>
    );
}

export default Search;
