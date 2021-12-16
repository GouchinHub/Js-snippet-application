import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

const CommentForm = ({ snippetIdentifier }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    var token = localStorage.getItem("token");
    const response = await fetch("/comments/" + snippetIdentifier, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: JSON.stringify({
        comment: comment,
      }),
    }).then((res) => {
      return res;
    });

    var data = await response.json();
    if (response.status === 200) {
      setComment("");
      window.location.reload();
    } else {
      setError(data.error);
      setShowError(true);
    }
  };

  return (
    <form>
      <Box
        margin={2}
        display="flex"
        flexDirection="row"
        justifyContent={"center"}
      >
        {showError && <p className="error">{error}</p>}

        <TextField
          placeholder="Leave a comment"
          multiline
          rows={2}
          sx={{ width: "80%" }}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Box alignSelf="center">
          <Button size="large" variant="contained" onClick={(e) => submit(e)}>
            Post
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default CommentForm;
