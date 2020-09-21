import React from "react";
import Button from "../Button";

function Book(props) {
    return (
        <a href={props.book.link} target="blank">
            <div className="card">
                <div className="img-container">
                    <img alt={props.book.title} src={props.book.image} />
                </div>
                <div className="content">
                    <ul>
                        <li>
                            <h3>{props.book.title}</h3>
                        </li>
                        <li>
                            <p>By {props.book.authors}</p>
                        </li>
                        <li>
                            <p>{props.book.description}</p>
                        </li>
                    </ul>
                </div>
                <Button id={props.book._id} handleClick={props.handleClick}>{props.name}</Button>
            </div>
        </a>
    );
}

export default Book;