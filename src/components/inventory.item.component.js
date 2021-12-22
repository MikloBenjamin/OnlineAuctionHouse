import React, { Component } from "react";
import { Link } from "react-router-dom";

class InventoryItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            post: this.props.post
        }
    }

    render() {
        return (
            <div className="product-item">
                <img className="modelimage" src={`data:${this.state.post.image.data};base64,${this.state.post.image.imageBase64}`} alt="Missing"/> 
                <div>
                    {this.state.post.title}
                </div>  
                <Link to={{
                    pathname: "/inventory/details",
                    state: {
                        user: this.state.user,
                        post_id: this.state.post._id
                    }
                }}><button className="button-details">Details</button></Link>
            </div>
        )
    }
}

export {
    InventoryItem
}