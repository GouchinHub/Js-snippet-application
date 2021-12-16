import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const CreateSnippet = () => {
  const [redirect, setRedirect] = useState(false);

  const redirectToSnippet = () => {
    setRedirect(true);
  };

  if (redirect) return <Navigate replace to="/snippet" />;

  return (
    <Box display={"flex"} justifyContent="center" m={2}>
      <Button variant="contained" onClick={(e) => redirectToSnippet()}>
        Create new snippet
      </Button>
    </Box>
  );
};

export default CreateSnippet;
