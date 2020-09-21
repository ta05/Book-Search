import React from "react";

function Button(props) {
    return (
        <button onClick={() => props.handleClick(props.id)}>{props.children}</button>
    );
}

export default Button;