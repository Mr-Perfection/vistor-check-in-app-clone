import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import { addEntry, getEntries } from "./api/Entries";
import "./App.css";
import "./App.scss";
import ListItemRow from "./common/ListItemRow";
import Modal from "./common/Modal";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
