import { Box, List } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import SnippetListItem from "./SnippetListItem";

const fetchSnippets = async () => {
  const res = await fetch("/snippets");
  return res.json();
};

const SnippetList = () => {
  const { data, status } = useQuery("snippets", fetchSnippets);

  return (
    <Box>
      {status === "loading" && <div>loading...</div>}
      {status === "error" && <div>something went wrong...</div>}
      {status === "success" && (
        <Box display={"flex"} justifyContent="center" m={2}>
          <List
            sx={{ height: "800px", position: "relative", overflow: "auto" }}
          >
            {data.map((snippet) => (
              <SnippetListItem key={snippet._id} snippet={snippet} />
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SnippetList;
