import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import ItemsList from "./components/items-list.component";
import CreateItem from "./components/create-item.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      <Route path="/" exact component={ItemsList}/>
      <Route path="/create" component={CreateItem}/>
    </Router>
  );
}

export default App;
