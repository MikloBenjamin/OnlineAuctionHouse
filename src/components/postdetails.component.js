import React, { Component } from "react";
import axios from "axios";
import { showNavbar } from "./navbar.component";

export default class PostDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.location.state.user,
            postid: this.props.location.state.post_id,
            post: null
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5823/items/" + this.state.postid)
            .then(response => {
                this.setState({
                    post: response.data,
                    postid: null
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        if (this.state.post === null){
            return (
                <main>
                    {showNavbar(this.state.user)}
                </main>
            )
        }
        return (
            <main>
                {showNavbar(this.state.user)}
                <div>
                    Post title: {this.state.post.title} <br/>
                    Post description: {this.state.post.description} <br/>
                    Post owner: {this.state.post.owner} <br/>
                    Post startingprice: {this.state.post.startingprice} <br/>
                    Post bid end date: {this.state.post.bidenddate} <br/>
                    Last bidder: {this.state.post.bidder} <br/>
                    Post image: <img src={`data:${this.state.post.image.data};base64,${this.state.post.image.imageBase64}`} alt="Missing"/> <br/>
                </div>
            </main>
        );
    }
}
