import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const SnippetForm = () => {
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    var token = localStorage.getItem("token");
    const response = await fetch("/snippets", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: JSON.stringify({
        title,
        snippet,
      }),
    }).then((res) => {
      return res;
    });

    var data = await response.json();
    if (response.status === 200) {
      setTitle("");
      setSnippet("");
      window.location.href = "/";
    } else {
      setError(data.error);
      setShowError(true);
    }
  };

  return (
    <form>
      <Typography variant="h4">New Snippet</Typography>
      {showError && <p className="error">{error}</p>}
      <Box>
        <TextField
          required
          id="outlined-required"
          placeholder="Title"
          defaultValue={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Button variant="contained" onClick={(e) => submit(e)}>
          Post
        </Button>
      </Box>
      <TextField
        placeholder="Your snippet"
        multiline
        rows={15}
        sx={{ width: "80%" }}
        defaultValue={snippet}
        onChange={(e) => {
          setSnippet(e.target.value);
        }}
      />
    </form>
  );
};

export default SnippetForm;
