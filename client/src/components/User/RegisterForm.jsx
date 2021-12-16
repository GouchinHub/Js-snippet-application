import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch("/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => {
      return res;
    });

    var data = await response.json();
    if (response.status === 200) {
      setRegistered(true);
    } else {
      setError(data.error);
      setShowError(true);
    }
  };

  if (registered) return <Navigate replace to="/login" />;

  return (
    <form>
      <Typography variant="h4" m={1}>
        Sign Up
      </Typography>
      <Box>
        <TextField
          error={showError}
          id="outlined-username-input"
          label="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          error={showError}
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          helperText={error}
        />
        <Button
          variant="contained"
          onClick={(e) => submit(e)}
          sx={{ marginTop: "10px" }}
        >
          Sign Up
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
