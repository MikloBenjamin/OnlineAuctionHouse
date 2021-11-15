import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/navbar.css"
import "./css/products.css"
import "./css/login.css"
import Navbar from "./components/navbar.component";
import ItemsList from "./components/items-list.component";
import CreateItem from "./components/create-item.component";
import EditItem from "./components/edit-item.component";
import Bids from "./components/bids.component";
import Login from "./components/login.component";

function App() {
  return (
    <Router>
      <main>
        <Navbar />
        <Route exact path="/" component={Bids}/>
        <Route path="/login" component={Login}/>
        <Route path="/items" component={ItemsList}/>
        <Route path="/create" component={CreateItem}/>
        <Route path="/edit" component={EditItem}/>
      </main>      
    </Router>
  );
}

export default App;
