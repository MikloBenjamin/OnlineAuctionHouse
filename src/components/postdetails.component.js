import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { showNavbar } from "./navbar.component";
import { getBidSvg, getExclamation, getUserSvg } from "../helpers/svgFunctions";
import { Button } from 'react-bootstrap';
// import { bidFunction } from "../helpers/bidFunction";

export default class PostDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.location.state.user,
            postid: this.props.location.state.post_id,
            post: null,
            bidDisplay: {},
            buttonsDisplay: {}
        }
        this.bidAndHideModal = this.bidAndHideModal.bind(this);
        this.showBidModal = this.showBidModal.bind(this);
        this.hideBidModal = this.hideBidModal.bind(this);
    }

    showBidModal(){
        this.setState({ bidDisplay: { display: 'flex' } });
        this.setState({ buttonsDisplay: { display: 'none' } });
    }

    hideBidModal(){
        this.setState({ bidDisplay: { display: 'none' }});
        this.setState({ buttonsDisplay: { display: 'flex' } });
    }

    bidAndHideModal(){
        this.hideBidModal();
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
        console.log(this.state.user)
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
                        <div className="text"><br/>
                        <div className="owner-follow">
                            {/* we need the owner first && last name */}
                           <p id="owner">
                                {getUserSvg()}
                                {this.state.post.owner}</p>
                            {/* icon appear when the button 'Follow this post' is pushed */}
                            {getBidSvg()}
                        </div>
                            <p id="title">{this.state.post.title} </p> 
                            <br/>
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
                                    <p>name</p> 
                                </div>
                            </div>
                        </div>
                        <Link to={{
                                pathname: "/",
                                state: this.state.user
                        }}><Button className="button-back-details">BACK</Button>
                        </Link>
                    </div>
                    <div className="post-image">
                        <img src={`data:${this.state.post.image.data};base64,${this.state.post.image.imageBase64}`} alt="Sorry can't find your img... :("/>               
                    </div> 
                </div>
                <div className="bottom-buttons" style={this.state.buttonsDisplay}>
                    {/* need another page for viewing the summary of product*/}
                    <Button>Buy Now!</Button> 
                    {/* a little window appear, and we can add bigger payment */}
                    <button onClick={this.showBidModal}>Bidding</button>
                    {/* will add the product into following list (need another page too to print the queue of "posts what i'm following") */}
                    <Button>Follow this post</Button>
                </div>
                <div id="bid" style={this.state.bidDisplay}>
                    <div className="bid-div">
                        <p>Write a <b>BIGGER</b> payment with whom you want to bid!</p>
                        <form>
                            <label>Your payment:</label>
                            <input className="form-input" type="text" name="bid" autoComplete="off" required onChange=""/><br/>
                            <input type="submit" value="Bid" onClick={this.bidAndHideModal}/>
                            <button onClick={this.hideBidModal}>Back</button>
                        </form> 
                    </div>
                </div>
            </main>
        );
    }
}
