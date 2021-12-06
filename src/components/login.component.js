import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { getKey } from "../helpers/svgFunctions";

export default class Login extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        
        this.state = {
            username: '',
            password: '',
            ready: {
                isSignedUp: false,
                user: {}
            },
            logout: this.props.location.state
        }
    }

    componentDidMount(){
        if (this.state.logout === "logout"){
            localStorage.clear();
        }
    }

    onChangeUserName(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangePwd(e){
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post("http://localhost:5823/users/login/user/", user)
            .then(response => {
                if(response.data !== "null" && response.data !== "error"){
                    this.setState({
                        ready: {
                            isSignedUp: true,
                            user: response.data
                        }
                    });
                }
            })
            .catch((error) => {
                if (error.response){
                    console.log(error.response);
                }
                else if(error.request){
                    console.log(error.request);
                }
                else if(error.message){
                    console.log(error.message);
                }
            });    
    }

    render() {
        if (this.state.ready.isSignedUp && this.state.ready.user !== {}){
            return <Redirect to={{
                pathname: `/`,
                state: this.state.ready.user
            }}/>;
        }
        return (
            <div id="sign-in-container">
                <div id="sign-in-form"><br/>
                    <div><b>Hello!</b></div>
                    <h5>Sign into Your account</h5><br/><br/>
                    <form onSubmit={this.onSubmit}>
                        <label>
                            Username:</label>
                        <input className="form-input" type="text" name="username" autoComplete="off" required onChange={this.onChangeUserName}/><br/>
                        <label>
                            {getKey()}
                            Password:</label>
                        <input className="form-input" type="password" name="pwd" required onChange={this.onChangePwd}/><br/>
                        <input type="submit" value="Sign In"/>
                    </form>
                    <div id="route-to-register">
                        <Link to="/"  className="back-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                            </svg>
                        </Link>
                        <br/>
                        <p className="dont-have-account">Dont have an account? <Link to="/register">Sign Up!</Link></p>
                    </div>
                </div>
                <div id="welcome-panel">
                    <br/>
                    <p><b>Welcome!</b><br/><br/>If you signed in and have an account, join our creative world!</p>
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                            </svg>
                        </Link>
                </div>
            </div>
        );
    }
}
