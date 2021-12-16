import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, Typography, Toolbar, Box, AppBar } from "@mui/material";

const NavBar = (user) => {
  const logout = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "");
    window.location.href = "/";
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <AccountCircle />
        <Typography variant="button">{user.user}</Typography>
        <Button variant="h6" href="/" sx={{ flex: "none" }}>
          Home
        </Button>
        <Box sx={{ flex: "100%" }} />
        <Button id="login" onClick={(e) => logout(e)} variant="h6">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
