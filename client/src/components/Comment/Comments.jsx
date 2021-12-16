import { Box, List, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import Comment from "./Comment";

const fetchComments = async (identifier) => {
  const res = await fetch(`/comments/${identifier}`);
  return res.json();
};

const Comments = ({ user, snippetIdentifier }) => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["comments", snippetIdentifier],
    ({ queryKey }) => fetchComments(queryKey[1])
  );

  return (
    <Box>
      {isLoading && <Typography variant="h5">Loading...</Typography>}
      {isError && <Typography variant="h5">Failed to load comments</Typography>}
      {isSuccess ? (
        <Box display={"flex"} justifyContent="center" m={2}>
          <List
            sx={{ height: "700px", position: "relative", overflow: "auto" }}
          >
            {data.map((comment) => (
              <Comment key={comment._id} user={user} comment={comment} />
            ))}
          </List>
        </Box>
      ) : (
        <Typography variant="h6">No comments</Typography>
      )}
    </Box>
  );
};

export default Comments;
