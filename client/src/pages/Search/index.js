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
        <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={() => {}}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                onChange={() => {}}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                onChange={() => {}}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
                disabled={!(formObject.author && formObject.title)}
                onClick={() => {}}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>New Books</h1>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => {
                  return (
                    <ListItem key={book._id}>
                      <a href={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </a>
                        <Button id={book._id} handleClick={handleSaveBook} name={"Save"} />
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
