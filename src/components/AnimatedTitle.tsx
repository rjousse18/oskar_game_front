import React from "react";
import "../css/App.css";

interface Props {
    text: string;
}

const AnimatedTitle = ({ text }: Props) => {
    return (
        <h1 className="animated-title">
        {text.split("").map((char, index) => (
            <span
            key={index}
            className="letter"
            style={{ animationDelay: `${index * 0.1}s` }}
            >
            {char}
            </span>
        ))}
        </h1>
    );
};

export default AnimatedTitle;
