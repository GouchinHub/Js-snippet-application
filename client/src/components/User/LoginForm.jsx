import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSucces, setLoginSucces] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch("/users/login", {
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
      localStorage.setItem("token", data.token);
      setLoginSucces(true);
    } else {
      setError(data.error);
      setShowError(true);
    }
  };

  if (loginSucces) return <Navigate replace to="/" />;

  return (
    <form>
      <Typography variant="h4" m={1}>
        Login
      </Typography>
      <Box sx={{ color: "black" }}>
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
          autoComplete="current-password"
        />
        <Button
          variant="contained"
          onClick={(e) => submit(e)}
          sx={{ marginTop: "10px" }}
        >
          Login
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
