import {
  Box,
  Card,
  ListItem,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ClearIcon from "@mui/icons-material/Clear";

const Comment = ({ user, comment }) => {
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [likeable, setLikeable] = useState(false);
  const [editable, setEditable] = useState(false);
  const [editing, setEditing] = useState(false);
  const [likes, setLikes] = useState(comment.likes.length);

  //comment is likable when user is logged in
  useEffect(() => {
    if (user) setLikeable(true);
  }, [user]);

  //comment is editable when user is authorized owner
  useEffect(() => {
    if (user && comment) {
      if (user.userId === comment.creatorId) return setEditable(true);
    }
  }, [user, comment]);

  const updateComment = async (e) => {
    e.preventDefault();
    var token = localStorage.getItem("token");
    const response = fetch(`/comments/update/${comment._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: JSON.stringify({
        edited: editedComment,
      }),
    }).then((res) => {
      return res;
    });
    var res = await response;
    if (res.status === 200) {
      setEditedComment(editedComment);
      setEditing(false);
    }
  };

  const removeComment = async (e) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    e.preventDefault();
    var token = localStorage.getItem("token");
    fetch(`/comments/delete/${comment._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": token },
    }).then((res) => {
      return res;
    });
  };

  const like = async (e) => {
    e.preventDefault();
    var token = localStorage.getItem("token");
    const response = fetch(`/comments/like/${comment._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: JSON.stringify({
        edited: editedComment,
      }),
    }).then((res) => {
      return res;
    });
    var res = await response;
    if (res.status === 200) {
      const data = await res.json();
      setLikes(data.likeAmount);
    }
  };

  const changeToEditingMode = () => {
    setEditing(!editing);
  };

  return (
    <ListItem className="div">
      <Box width="600px">
        <Card>
          <Box m={2} flex={"auto"} display="flex" flexDirection={"row"}>
            {editable && (
              <Box width="10%">
                <IconButton onClick={(e) => changeToEditingMode()}>
                  <EditIcon color="primary" />
                </IconButton>
              </Box>
            )}
            <Box width="100%">
              <Typography variant="h7">By: {comment.creator}</Typography>
              {!editing ? (
                <Typography variant="h5">{editedComment}</Typography>
              ) : (
                <TextField
                  multiline
                  fullWidth
                  defaultValue={comment.comment}
                  onChange={(e) => setEditedComment(e.target.value)}
                ></TextField>
              )}
            </Box>
            <Box width="10%" flexDirection={"row"} marginLeft={1}>
              {!editing ? (
                <Box>
                  <IconButton
                    disabled={!likeable}
                    color="primary"
                    onClick={(e) => like(e)}
                    size="large"
                  >
                    <ThumbUpIcon />
                  </IconButton>
                  <Typography textAlign={"center"} variant="h6">
                    {likes}
                  </Typography>
                </Box>
              ) : (
                <>
                  <IconButton onClick={(e) => removeComment(e)}>
                    <ClearIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={(e) => updateComment(e)}>
                    <SaveAsIcon color="primary" />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>
        </Card>
      </Box>
    </ListItem>
  );
};

export default Comment;
