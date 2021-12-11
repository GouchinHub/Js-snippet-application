import React from "react";
import { useQuery } from "react-query";
import Snippet from "./Snippet";

const fetchSnippets = async () => {
  const res = await fetch("/snippets");
  return res.json();
};

const SnippetList = () => {
  const { data, status } = useQuery("snippets", fetchSnippets);
  console.log(data);
  return (
    <div>
      {status === "loading" && <div>loading...</div>}
      {status === "error" && <div>something went wrong...</div>}
      {status === "success" && (
        <div>
          {data.map((snippet) => (
            <Snippet snippet={snippet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SnippetList;
