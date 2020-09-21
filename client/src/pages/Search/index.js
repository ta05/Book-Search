import React, { useState } from "react";
import {Row, Col, Container} from "../../components/Grid";
import SearchForm from "../../components/SearchForm";
import Jumbotron from "../../components/Jumbotron";
import { List, ListItem } from "../../components/List";
import Book from "../../components/Book";
import API from "../../utils/API";

function Search() {
    const [search, setSearch] = useState("");
    const [books, setBooks] = useState("");
    const [message, setMessage] = useState("Search for a book");


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
                else {
                    setBooks(res.data.items);
                    console.log(books);
                }
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
            image: book.volumeInfo.imageLinks.thumbnail,
            link: book.volumeInfo.infoLink,
        })
            .then(() => API.getBooks());

    };

    return (
        <Container fluid>
            <Row>
                <Col size="md-8">
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
                <h3>{message}</h3>
                )}
                </Col>
            </Row>
        </Container>
    );
}

export default Search;
