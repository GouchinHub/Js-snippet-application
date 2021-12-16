import {
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import FetchUser from "../Api/FetchUser";
import CommentForm from "../Comment/CommentForm";
import Comments from "../Comment/Comments";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const fetchSnippet = async (identifier) => {
  const res = await fetch(`/snippets/${identifier}`);
  return res.json();
};

const Snippet = () => {
  const { identifier: snippetIdentifier } = useParams();
  const [newSnippetContent, setNewSnippetContent] = useState("");
  const [editing, setEditing] = useState(false);
  const [editable, setEditable] = useState(false);
  const [likeable, setLikeable] = useState(false);
  const [likes, setLikes] = useState(0);
  const {
    data,
    isSuccess: userFetched,
    isLoading,
  } = useQuery("user", FetchUser, {
    retry: 1,
  });
  const { data: snippet, isSuccess } = useQuery(
    ["snippet", snippetIdentifier],
    ({ queryKey }) => fetchSnippet(queryKey[1])
  );

  //Snippet is editable when user is authorized owner
  useEffect(() => {
    if (data && snippet) {
      if (data.userId === snippet.creatorId) setEditable(true);
    }
  }, [data, snippet]);

  //Snippet is likable when user is logged in
  useEffect(() => {
    if (data) setLikeable(true);
  }, [data]);

  useEffect(() => {
    if (isSuccess && snippet) setLikes(snippet.likes.length);
  }, [isSuccess, snippet]);

  const makeEditable = () => {
    setEditing(!editing);
  };

  const updateSnippet = async (e) => {
    e.preventDefault();
    var token = localStorage.getItem("token");
    const response = fetch(`/snippets/update/${snippetIdentifier}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: JSON.stringify({
        newSnippetContent,
      }),
    }).then((res) => {
      return res;
    });
    var result = await response;
    if (result.status === 200) {
      setEditing(false);
      window.location.reload();
    }
  };

  const removeSnippet = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this snippet?"))
      return;
    var token = localStorage.getItem("token");
    const response = fetch(`/snippets/delete/${snippetIdentifier}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": token },
    }).then((res) => {
      return res;
    });
    var res = await response;
    if (res.status === 200) {
      window.location.href = "/";
    }
  };

  const like = async (e) => {
    e.preventDefault();
    var token = localStorage.getItem("token");
    const response = fetch(`/snippets/like/${snippetIdentifier}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": token },
    }).then((res) => {
      return res;
    });
    var res = await response;
    if (res.status === 200) {
      const data = await res.json();
      setLikes(data.likeAmount);
    }
  };

  return (
    <Box display={"flex"} m={5} justifyContent="center">
      <Box
        width={"800px"}
        display="flex"
        flexDirection="column"
        alignItems={"center"}
      >
        {isLoading && <Typography variant="h5">Loading..</Typography>}
        {isSuccess && (
          <Card style={{ width: "inherit" }} elevation={3}>
            <Box
              m={5}
              display="flex"
              flexDirection="row"
              alignContent={"center"}
            >
              <Typography variant="h4">{snippet.title}</Typography>
              <Typography margin={"5px"} variant="h6">
                By: {snippet.creator}
              </Typography>
              <Box flex={"auto"} />
              {editable && (
                <>
                  <Button
                    style={{ margin: "2px" }}
                    variant="contained"
                    onClick={(e) => makeEditable()}
                  >
                    Edit
                  </Button>
                  {editing && (
                    <>
                      <Button
                        style={{ margin: "2px" }}
                        variant="contained"
                        onClick={(e) => updateSnippet(e)}
                      >
                        Save
                      </Button>
                      <Button
                        style={{ margin: "2px" }}
                        variant="contained"
                        onClick={(e) => removeSnippet(e)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </>
              )}
            </Box>
            <Card color="black">
              <Box padding={"20px"} bgcolor={"secondary.light"}>
                {!editing ? (
                  <SyntaxHighlighter language="javascript">
                    {snippet.snippet}
                  </SyntaxHighlighter>
                ) : (
                  <TextField
                    multiline
                    fullWidth
                    defaultValue={snippet.snippet}
                    onChange={(e) => setNewSnippetContent(e.target.value)}
                  ></TextField>
                )}
              </Box>
            </Card>
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              flexDirection={"row"}
            >
              <>
                <IconButton
                  color="primary"
                  disabled={!likeable}
                  onClick={(e) => like(e)}
                  size="large"
                >
                  <FavoriteIcon />
                </IconButton>

                <Typography padding={1} textAlign={"center"} variant="h6">
                  {likes}
                </Typography>
              </>
            </Box>
          </Card>
        )}
        <Box
          display="flex"
          flexDirection={"column"}
          alignContent="center"
          width={"80%"}
        >
          {userFetched && data && (
            <CommentForm snippetIdentifier={snippetIdentifier} />
          )}
          <Comments user={data} snippetIdentifier={snippetIdentifier} />
        </Box>
      </Box>
    </Box>
  );
};

export default Snippet;
