import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Register extends Component {
    constructor(props){
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAbout = this.onChangeAbout.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            about: ''
        }
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
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
    onChangeFirstName(e){
        this.setState({
            firstname: e.target.value
        })
    }
    onChangeLastName(e){
        this.setState({
            lastname: e.target.value
        })
    }
    onChangeAbout(e){
        this.setState({
            about: e.target.value
        })
    }
    onSubmit(e){
        const item = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            about: this.state.about
        }

        axios.post("http://localhost:5823/users/register/user/", item)
            .then(response => {
                console.log(response.data)
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
        return (
            <div id="sign-in-container">
                <div id="sign-in-form">
                    <div>Create an account now!</div>
                    <form onSubmit={this.onSubmit}>
                        <div className="registerLabels"><label id="emaillabel">Email: </label><input id="emailinput" className="form-input" type="text" name="email" required onChange={this.onChangeEmail}/></div><br/>
                        <div className="registerLabels"><label>First Name: </label><input className="form-input" type="text" name="firstname" required onChange={this.onChangeFirstName}/></div><br/>
                        <div className="registerLabels"><label>Last Name: </label><input className="form-input" type="text" name="lastname" required onChange={this.onChangeLastName}/></div><br/>
                        <div className="registerLabels"><label>About: </label><input className="form-input" type="text" name="about" onChange={this.onChangeAbout}/></div><br/>
                        <div className="registerLabels"><label>Username: </label><input className="form-input" type="text" name="username" minLength="4" required onChange={this.onChangeUserName}/></div><br/>
                        <div className="registerLabels"><label>Password: </label><input className="form-input" type="password" name="pwd" minLength="4" required onChange={this.onChangePwd}/></div><br/>
                        <input type="submit" value="Sign Up"/>
                    </form>
                    <div>
                        <Link to="/" className="back-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                            </svg>
                        </Link>
                        Already have an account? <Link to="/login">Sign In!</Link>
                    </div>
                </div>
                <div id="welcome-panel">
                    <br/>
                    <p><b>Welcome!</b><br/><br/>Sign up now and get into bidding!</p>
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
