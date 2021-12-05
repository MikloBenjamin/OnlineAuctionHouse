import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { showNavbar } from "./navbar.component";
import { getTimeSvg, getBidSvg } from "../helpers/svgFunctions";

const Client = props => (
    <p>{props.user.username}</p>
)

const Post = props => (
    <div className="product-item">
        <div className="inner-item">
            <div className="user-who-posted">
                {props.post.owner}
            </div>
            <Link to={{
                pathname: "/details",
                state: {
                    user: props.user,
                    post_id: props.post._id
                }
            }}><img className="modelimage" src={`data:${props.post.image.data};base64,${props.post.image.imageBase64}`} alt="Missing"/></Link>
            <p>Product Post Title</p>
            <div className="functionalities">
                <div className="time">
                    {getTimeSvg()}
                    <div>Time</div>
                </div>
                <div>
                    {getBidSvg()}
                    <div>Bid</div>
                </div>
            </div>  
            <Link to={{
                pathname: "/details",
                state: {
                    user: props.user,
                    post_id: props.post._id
                }
            }}><button className="button-details">Details</button></Link>
        </div>
    </div>
)

export default class Bids extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.location.state,
            posts: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5823/items/")
            .then(response => {
                this.setState({
                    posts: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    showClientName(){
        if(this.state.user){
            return <Client user={this.state.user}/>
        }
        return <p>User - Post title</p>;
    }

    itemsList(){
        return this.state.posts.map(post => {
            return <Post post={post} user={this.state.user} key={post._id} />
        })
    }

    render() {
        return (
            <main>
                {showNavbar(this.state.user)}
                <div id="products-list">
                    { this.itemsList() }
                </div>
            </main>
        );
    }
}
