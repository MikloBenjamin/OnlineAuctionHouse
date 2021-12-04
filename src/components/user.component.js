import React, { Component } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import { showNavbar } from "./navbar.component";
import { getUserSvg, getBackSvg, getFollowSvg } from "../helpers/svgFunctions";
import img from "../images/profile_cover.jpg";

export default class User extends Component {
    constructor(props){
        super(props);
        this.showFollowButton = this.showFollowButton.bind(this);
        this.state = {
            visitor: this.props.location.state.visitor,
            owner: this.props.location.state.owner
        }
    }

    showFollowButton(){
        if (this.state.visitor.username !== this.state.owner.username){
            return  <button id="follow-button">
                        Follow
                        {getFollowSvg("20", "20", "follow-icon")}
                    </button>
        }
    }

    render() {
        return (
            <main>
                {showNavbar(this.state.visitor)}
                <div id="profile">
                    <Link id="back" to={{
                        pathname: "/",
                        state: this.state.visitor
                    }}>{getBackSvg()}</Link>
                    <img id="cover-image" src={img} alt="cover"/>
                    {getUserSvg("60", "60", "person-icon")}
                    <div id="middle-user-side">
                        <h2>{this.state.owner.firstname} {this.state.owner.lastname}</h2>
                        {this.showFollowButton()}
                    </div>
                    <div id="follows">
                        <p>Followers: {this.state.owner.followers}</p>
                        <p>Follows: {this.state.owner.following}</p>
                        <p>Posts: {this.state.owner.posts}</p>
                    </div>
                </div>
                <div id="about">
                    About:
                    {this.state.owner.about}
                </div>
            </main>
        );
    }
}
