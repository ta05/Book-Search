import React from "react";

function Button(props) {
    return (
        <button onClick={() => props.handleClick(props.id)}>{name}</button>
    );
}

export default Button;