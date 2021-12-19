import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { showNavbar } from "./navbar.component";
import { getUserSvg, getBackSvg } from "../helpers/svgFunctions";
import { Post } from "./post.component";
import img from "../images/profile_cover.jpg";

export default class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            visitor: this.props.location.state.visitor,
            owner: this.props.location.state.owner,
            posts: [],
            followedPosts: [],
            inventory: [],
            followedPostsStyle: this.props.location.state.visitor.username === this.props.location.state.owner.username ?
            {display: "flex"} : {display: "none"}
        }
    }

    itemsList(){
        return this.state.posts.map(post => {
            return <Post post={post} user={this.state.user} key={post._id} />
        })
    }
    followedItemsList(){
        return this.state.followedPosts.map(post => {
            return <Post post={post} user={this.state.user} key={post._id} />
        })
    }
    inventoryItemsList(){
        return this.state.inventory.map(post => {
            return <Post post={post} user={this.state.user} key={post._id} />
        })
    }

    showEditModal(){
        
    }

    componentDidMount(e){
        axios.get("http://localhost:5823/users/user/" + this.state.owner.uid)
        .then(response => {
            this.setState({
                posts: response.data.userListings,
                followedPosts: response.data.userFollowedPosts,
                inventory: response.data.userInventory
            });
            this.showEditModal = this.showEditModal.bind(this);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <main>
                {showNavbar(this.state.visitor)}
                <div className="profile">
                    <Link id="back" to={{
                        pathname: "/",
                        state: this.state.visitor
                    }}>{getBackSvg()}</Link>
                    <img className="cover-image" src={img} alt="cover"/>
                    {getUserSvg("60", "60", "person-icon")}
                    <div className="middle-user-side">
                        <h2>{this.state.owner.firstname} {this.state.owner.lastname}</h2>
                    </div>
                    <div className="profile-buttons">
                        <button className="about-profile-button" onClick={this.showEditModal}>About</button>
                        <button className="edit-profile-button" onClick={this.showEditModal}>Edit Profile</button>
                    </div>
                </div>
                <hr></hr>
                <div className="products-list">
                    { this.itemsList() }
                </div>
                <hr style={this.state.followedPostsStyle}></hr>
                <div className="followed-products-list" style={this.state.followedPostsStyle}>
                    { this.followedItemsList() }
                </div>
                <hr style={this.state.followedPostsStyle}></hr>
                <div className="inventory" style={this.state.followedPostsStyle}>
                    { this.inventoryItemsList() }
                </div>
            </main>
        );
    }
}
