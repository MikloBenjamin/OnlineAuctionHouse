import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { showNavbar } from "./navbar.component";
import { getBack, getExclamation, getTimeSvg, getUserSvg } from "../helpers/svgFunctions";

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
                <div className="product-description-container">
                    <div className="post-text">
                        <div className="text">
                            <div className="backicon">
                                <Link to={{
                                    pathname: "/",
                                    state: this.state.user
                                }}>{getBack()}
                                </Link>
                            </div><br/>
                            <p id="owner">
                                {getUserSvg()}
                                {this.state.post.owner}</p>
                            <p id="title">{this.state.post.title} </p><br/>
                            <h6>DESCRIPTION:<br/></h6>
                            <p>{this.state.post.description}</p><br/>
                            <p> {getExclamation()}Bid End Date :</p>
                            <p id="end-bid-date">{this.state.post.bidenddate}</p> <br/>
                            <div className="price-details">
                                <div >
                                    <p>START price:</p> 
                                    <p className="row1">LAST bidder:</p><br/>
                                </div>
                                <div>
                                    <p>{this.state.post.startingprice} RON</p>
                                    <p>{this.state.post.bidder ? this.state.post.bidder : 0} RON</p> 
                                </div>
                            </div>
                          
                        </div>        
                    </div>
                    <div className="post-image">
                        <img src={`data:${this.state.post.image.data};base64,${this.state.post.image.imageBase64}`} alt="Sorry can't find your img... :("/>               
                    </div> 
                </div>
                <div className="bottom-buttons">
                    <button>Buy Now!</button>
                    <button>Bidding</button>
                    <button>Follow this post</button>
                </div>
            </main>
        );
    }
}
