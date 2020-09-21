import React from "react";
import Button from "../Button";

function Book(props) {
    return (
        <div className="card">
            <div className="img-container">
                <img alt={props.book.volumeInfo.title} src={props.book.volumeInfo.imageLinks.thumbnail} />
            </div>
            <div className="content">
                <ul>
                    <li>
                        <a href={props.book.volumeInfo.infoLink} target="blank">
                            <h3>{props.book.volumeInfo.title}</h3>
                        </a>
                    </li>
                    <li>
                        <p>By {props.book.volumeInfo.authors}</p>
                    </li>
                    <li>
                        <p>{props.book.volumeInfo.description}</p>
                    </li>
                </ul>
            </div>
            <Button id={props.book.id} handleClick={props.handleClick}>{props.name}</Button>
        </div>
        
    );
}

export default Book;