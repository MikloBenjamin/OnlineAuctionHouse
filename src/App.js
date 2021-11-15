import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import ItemsList from "./components/items-list.component";
import CreateItem from "./components/create-item.component";
import EditItem from "./components/edit-item.component";

function App() {
  return (
    <Router>
      <div className="container text-center">
        <Navbar />
        <Route exact path="/" component={ItemsList}/>
        <Route path="/create" component={CreateItem}/>
        <Route path="/edit" component={EditItem}/>
      </div>
    </Router>
  );
}

export default App;
