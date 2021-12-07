import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { showNavbar } from "./navbar.component";
import { getBidSvg, getExclamation, getBiggerMoneySvg, getUserSvg, getBackWhite } from "../helpers/svgFunctions";
import { Button } from 'react-bootstrap';

export default class PostDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.location.state.user,
            postid: this.props.location.state.post_id,
            post: null,
            bidDisplay: {},
            buttonsDisplay: {},
            followIconColor: {},
            buttonUnfollowPost: {},
            buttonFollowPost: {},
        }
        this.bidAndHideModal = this.bidAndHideModal.bind(this);
        this.showBidModal = this.showBidModal.bind(this);
        this.hideBidModal = this.hideBidModal.bind(this);
        this.followIconAppear = this.followIconAppear.bind(this);
        this.followIconHide = this.followIconHide(this);
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

    followIconAppear(){
        this.setState({ followIconColor: { color: 'grey'} });
        this.setState({ buttonUnfollowPost: { display: 'flex'}});
        this.setState({ buttonFollowPost: { display: 'none'}});
    }

    followIconHide(){
        this.setState({ followIconColor: { color: 'white'} });
        this.setState({ buttonUnfollowPost: { display: 'none'}});
        this.setState({ buttonFollowPost: { display: 'flex'}});
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
                        <div div className="text"><br/>
                            <div className="owner-follow">
                                {/* we need the owner first && last name */}
                                <p id="owner">
                                        {getUserSvg()}
                                        {this.state.post.owner}</p>
                                    {/* icon appear when the button 'Follow this post' is pushed */}
                                    <p id="follow-icon" style={this.state.followIconColor}>{getBidSvg()}</p>
                            </div>
                            <p id="title">{this.state.post.title} </p> 
                            <br/>
                            <h6>DESCRIPTION:<br/></h6>
                            <p>{this.state.post.description}</p>
                            <p> {getExclamation()}Bid End Date :</p>
                            <p id="end-bid-date">{this.state.post.bidenddate}</p> <br/>
                            <div className="price-details">
                                <p>START price:</p>
                                <p id="price"><b>{this.state.post.startingprice} RON</b></p>
                            </div>
                            <p>LAST bidder: name</p>
                            <br/>
                            <Link to={{
                                    pathname: "/",
                                    state: this.state.user
                            }}>
                                <Button className="button-back-details">BACK</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="post-image">
                        <img src={`data:${this.state.post.image.data};base64,${this.state.post.image.imageBase64}`} alt="Sorry can't find your img... :("/>               
                    </div> 
                </div>
                <div className="bottom-buttons" style={this.state.buttonsDisplay}>
                    {/* need another page for viewing the summary of product*/}
                    <Button>Buy Now!</Button> 
                    <button onClick={this.showBidModal}>Bidding</button>
                    {/* will add the product into following list (need another page too to print the queue of "posts what i'm following") */}
                    <Button id="follow" style={this.state.buttonFollowPost} onClick={this.followIconAppear} >Follow this post</Button>
                    <Button id="unfollow" style={this.state.buttonUnfollowPost} onClick={this.followIconHide} >Unfollow this post</Button>
                </div>
                <div id="bid" style={this.state.bidDisplay}>
                    <div className="bid-div">
                        <div><h3>Make <b>BID</b></h3></div><br/>
                        <p id="bid-text">Write your payment and let's bidding!</p><br/>
                        <form>
                            <label id="bid-label">Your bid:</label>
                            <input className="bid-input" type="text" autoComplete="off" required/><br/><br/><br/>
                            <div className="bid-buttons">
                                <button className="button-bid-style" onClick={this.hideBidModal}>{getBackWhite()}Back</button>
                                <button className="button-bid-style" type="submit" value="Bid" onClick={this.bidAndHideModal}>{getBiggerMoneySvg()} Bid</button>
                            </div>
                            <br/>
                        </form> 
                    </div>
                </div>
            </main>
        );
    }
}
