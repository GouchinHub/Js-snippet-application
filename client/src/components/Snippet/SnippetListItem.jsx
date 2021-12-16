import { Box, Card, ListItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const SnippetListItem = ({ snippet }) => {
  const [clicked, setClicked] = useState(false);

  const seeSnippet = (e) => {
    e.preventDefault();

    setClicked(true);
  };

  if (clicked) return <Navigate replace to={"/snippet/" + snippet._id} />;

  return (
    <ListItem className="div">
      <Box width="600px">
        <Card onClick={(e) => seeSnippet(e)}>
          <Box m={2} flex={"auto"}>
            <Typography variant="h5">{snippet.title}</Typography>
            <Typography variant="h7">By: {snippet.creator}</Typography>
          </Box>
        </Card>
      </Box>
    </ListItem>
  );
};

export default SnippetListItem;
