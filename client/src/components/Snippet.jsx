import React from "react";

const Snippet = ({ snippet }) => {
  return (
    <div className="div">
      <h3>{snippet.title}</h3>
      <p>{snippet.snippet}</p>
    </div>
  );
};

export default Snippet;
