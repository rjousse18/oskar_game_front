import { Link } from "react-router-dom";
import React from "react";

const HomeButton = () => {
  return (
    <Link to="/" className="home-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="white"
        viewBox="0 0 24 24"
      >
        <path d="M12 3l10 9h-3v9h-6v-6H11v6H5v-9H2l10-9z" />
      </svg>
    </Link>
  );
};

export default HomeButton;
