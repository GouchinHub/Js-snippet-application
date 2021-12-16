import React from "react";
import { useParams } from "react-router-dom";
import Snippet from "./Snippet";
import SnippetForm from "./SnippetForm";

const SnippetParamHandler = () => {
  const { identifier } = useParams();

  if (identifier) {
    return (
      <div>
        <Snippet />
      </div>
    );
  }

  return (
    <div>
      <SnippetForm />
    </div>
  );
};

export default SnippetParamHandler;
