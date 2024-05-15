import React from "react";

function DeleteSvg({ onClick }) {
  return (
    <div className="delete-svg-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="none"
        viewBox="0 0 24 24"
        className="delete-svg"
      >
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 5h12M9 5v0a3.951 3.951 0 016 0v0M9 20h6a2 2 0 002-2V9a1 1 0 00-1-1H8a1 1 0 00-1 1v9a2 2 0 002 2z"
        ></path>
      </svg>
    </div>
  );
}

export default DeleteSvg;
