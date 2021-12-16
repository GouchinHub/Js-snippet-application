import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import StandardHeader from "./components/Header/StandardHeader";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Snippets from "./pages/Snippets";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#f06292",
      dark: "#e91e63",
      contrastText: "black",
    },
    secondary: {
      light: "#eeeeee",
      main: "#bdbdbd",
      dark: "#757575",
      contrastText: "#000",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Box display={"flex"} height={"100vh"} sx={{ flexFlow: "column" }}>
          <Router>
            <div className="App">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Main />
                    </>
                  }
                />
                <Route
                  path="/snippet"
                  element={
                    <>
                      <Snippets />
                    </>
                  }
                />
                <Route
                  path="/snippet/:identifier"
                  element={
                    <>
                      <Snippets />
                    </>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <>
                      <StandardHeader />
                      <Login />
                    </>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <>
                      <StandardHeader />
                      <SignUp />
                    </>
                  }
                />
              </Routes>
            </div>
          </Router>
        </Box>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
