import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Button variant="h6" href="/" sx={{ flex: "none" }}>
          Home
        </Button>
        <Box sx={{ flex: "100%" }} />
        <Button id="login" href="/login" variant="h6">
          Login
        </Button>
        <Button
          id="signup"
          href="/register"
          variant="h6"
          sx={{ width: "120px" }}
        >
          Sign up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
