import React, { useState } from "react";
import "./App.css";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Routers } from "react-router-dom";
import Router from "./routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const globalTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#fefefe",
    },
    background: {
      default: "#fff",
    },

    secondary: {
      main: "#472CC9",
    },
    thirth: {
      main: "rgb(0, 132, 255)",
    },
    four: {
      main: "#FF5959",
    },
    pink: {
      main: "#EC2777",
    },
    red: {
      main: "#DA2027",
    },
    thinBlue: {
      main: "#559FF1",
    },
  },
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={globalTheme}>
        <Routers>
          <Router />
        </Routers>
        <CssBaseline />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
