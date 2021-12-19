import React, { Component } from "react";
import axios from "axios";
import { showNavbar } from "./navbar.component";
import { Post } from "./post.component";

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

    itemsList(){
        return this.state.posts.map(post => {
            return <Post post={post} user={this.state.user} key={post._id} />
        })
    }

    render() {
        return (
            <main>
                {showNavbar(this.state.user)}
                <div className="products-list">
                    { this.itemsList() }
                </div>
            </main>
        );
    }
}
