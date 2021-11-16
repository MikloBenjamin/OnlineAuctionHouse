import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Register extends Component {
    render() {
        return (
            <div id="sign-in-container">
                <div id="sign-in-form">
                    <div>Create an account now!</div>
                    <form action="/">
                        <div className="registerLabels"><label id="emaillabel">Email: </label><input id="emailinput" className="form-input" type="text" name="email" autoComplete="off" required/></div><br/>
                        <div className="registerLabels"><label>Username: </label><input className="form-input" type="text" name="username" autoComplete="off" required/></div><br/>
                        <div className="registerLabels"><label>First Name: </label><input className="form-input" type="text" name="firstname" autoComplete="off" required/></div><br/>
                        <div className="registerLabels"><label>Last Name: </label><input className="form-input" type="text" name="lastname" autoComplete="off" required/></div><br/>
                        <div className="registerLabels"><label>Password: </label><input className="form-input" type="password" name="pwd" minLength="4" required/></div><br/>
                        <input type="submit" value="Sign Up"/>
                    </form>
                    <div>Already have an account? <Link to="/login">Sign In!</Link></div>
                </div>
                <div id="welcome-panel">
                    <br/>
                    <p><b>Welcome Back!</b><br/><br/>If you signed in and have an account, join our creative world!</p>
                        <Link to="/">
                            <svg id="back-button" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                            </svg>
                        </Link>
                </div>
            </div>
        );
    }
}
