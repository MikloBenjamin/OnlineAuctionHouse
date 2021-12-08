import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/navbar.css"
import "./css/products.css"
import "./css/login-register.css"
import "./css/profile.css"
import "./css/create-item.css"
import "./css/post-description.css"
import "./css/post.css"
import CreateItem from "./components/create-item.component";
import Bids from "./components/bids.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import User from "./components/user.component";
import PostDetail from "./components/postdetails.component";

function App() {
  return (
    <Router>
      <main>
        <Route exact path="/" render={ props => <Bids {...props} /> } />
        <Route path="/user" render={ props => <User {...props} /> } />
        <Route path="/login" render={ props => <Login {...props} /> } />
        <Route path="/register" component={Register}/>
        <Route path="/createpost" render={ props => <CreateItem {...props} /> } />
        <Route path="/details" render={ props => <PostDetail {...props} /> } />
      </main>      
    </Router>
  );
}

export default App;
