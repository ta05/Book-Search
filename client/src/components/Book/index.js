import Button from "../Button";

function Book(...props) {
    return (
        <a href={book.link} target="blank">
            <div className="card">
                <div className="img-container">
                    <img alt={book.title} src={book.image} />
                </div>
                <div className="content">
                    <ul>
                        <li>
                            <h3>{book.title}</h3>
                        </li>
                        <li>
                            <p>By {book.authors}</p>
                        </li>
                        <li>
                            <p>{book.description}</p>
                        </li>
                    </ul>
                </div>
                <Button id={book._id} name={name} handleClick={handleClick}/>
            </div>
        </a>
    );
}

export default Book;