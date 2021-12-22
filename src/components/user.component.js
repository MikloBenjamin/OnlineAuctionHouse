import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { showNavbar } from "./navbar.component";
import { getUserSvg, getBackSvg, getBackWhite, getBag, getActivity } from "../helpers/svgFunctions";
import { Post } from "./post.component";
import img from "../images/profile_cover.jpg";
import { bind } from "lodash";

export default class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            visitor: this.props.location.state.visitor,
            owner: this.props.location.state.owner,
            about: this.props.location.state.about,
            aboutDisplay: {},
            posts: [],
            followedPosts: [],
            inventory: [],
            followedPostsStyle: this.props.location.state.visitor.username === this.props.location.state.owner.username ?
            {display: "flex"} : {display: "none"},
            editProfileButtonStyle: this.props.location.state.visitor.username === this.props.location.state.owner.username ?
            {display: "flex"} : {display: "none"}
        }
        this.showEditModal = this.showEditModal.bind(this);
        this.hideEditModal = this.hideEditModal.bind(this);
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
        this.setState({ aboutDisplay: { display: 'flex' } });
    }

    hideEditModal(){
        this.setState({ aboutDisplay: { display: 'none' } });
    }

    componentDidMount(e){
        axios.get("http://localhost:5823/users/user/" + this.state.owner.uid)
        .then(response => {
            this.setState({
                posts: response.data.userListings,
                followedPosts: response.data.userFollowedPosts,
                inventory: response.data.userInventory
            });   
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
                        <button className="edit-profile-button"  onClick={this.showEditModal}>Edit Profile</button>
                    </div>
                    <div className="bid" style={this.state.aboutDisplay}>
                        <div className="bid-div">
                            <div><h3>About</h3></div><br/>
                            <p className="bid-text">{this.state.owner.about}</p><br/>
                            <form>
                                <div className="bid-buttons">
                                    <button className="button-bid-style" onClick={this.hideEditModal}>{getBackWhite()}Back</button>
                                </div>
                            </form> 
                            <br/>
                        </div>
                    </div>
                </div>
                <br/><br/>
                <div className="products-list">
                    { this.itemsList() }
                </div>
                <h3 style={this.state.followedPostsStyle}>
                    { getActivity() }
                    Followed Posts</h3>
                <hr style={this.state.followedPostsStyle}></hr>
                <div className="followed-products-list" style={this.state.followedPostsStyle}>
                    { this.followedItemsList() }
                </div>
                <h3 style={this.state.followedPostsStyle}>
                    { getBag() }
                    Inventory - Bought items
                    </h3>
                <hr style={this.state.followedPostsStyle}></hr>
                <div className="inventory" style={this.state.followedPostsStyle}>
                    { this.inventoryItemsList() }
                </div>
            </main>
        );
    }
}
