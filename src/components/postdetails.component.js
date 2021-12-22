import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { showNavbar } from "./navbar.component";
import { getBidSvg, getExclamation, getBiggerMoneySvg, getUserSvg, getBackWhite } from "../helpers/svgFunctions";
import { Button } from 'react-bootstrap';

export default class PostDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.location.state.user,
            postid: this.props.location.state.post_id,
            post_owner: null,
            post: null,
            bidDisplay: {},
            buttonsDisplay: {},
            followIconDisplay: {},
            buttonUnfollowPost: {},
            buttonFollowPost: {},
            hours_left: 0,
            minutes_left: 0,
            seconds_left: 0,
            timer: null,
            started: false,
            deleted: false,
            bidvalue: 0,
            following: false
        }
    }

    showBidModal(e){
        e.preventDefault();
        this.setState({ bidDisplay: { display: 'flex' } });
        this.setState({ buttonsDisplay: { display: 'none' } });
    }

    hideBidModal(e){
        this.setState({ bidDisplay: { display: 'none' }});
        this.setState({ buttonsDisplay: { display: 'flex' } });
    }

    follow(){
        if (this.state.user){
            axios.post("http://localhost:5823/items/follow/" + this.state.post._id, {
                username: this.state.user.username
            })
            .then(() => {
                this.setState({ 
                    followIconDisplay: { display: 'flex'},
                    buttonUnfollowPost: { display: 'flex'},
                    buttonFollowPost: { display: 'none'},
                    following: true
                });
            });
        }

    }

    unfollow(){
        if (this.state.user){
            axios.post("http://localhost:5823/items/unfollow/" + this.state.post._id, {
                username: this.state.user.username
            })
            .then(() => {
                this.setState({ 
                    followIconDisplay: { display: 'none'},
                    buttonUnfollowPost: { display: 'none'},
                    buttonFollowPost: { display: 'flex'},
                    following: false
                });
            });
        }
    }
    
    stopTimer(){
        clearInterval(this.state.timer);
        this.setState({
            timer: null,
            started: false
        });
    }

    countdown(){
        const now = moment();
        const end = moment(this.state.post.bidenddate);
        const difference = end.diff(now);
        if (difference <= 0){
            this.stopTimer();
            this.setState({
                hours_left: 0,
                minutes_left: 0,
                seconds_left: 0
            });
            axios.delete("http://localhost:5823/items/delete/" + this.state.post._id)
                .then(() => {
                    this.setState({
                        deleted: true,
                        post_owner: null,
                        post: null
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            return;
        }
        const duration = moment.duration(difference);
        this.setState({
            hours_left: parseInt(duration.asHours()),
            minutes_left: parseInt(duration.asMinutes()%60),
            seconds_left: parseInt(duration.asSeconds()%60)
        });
    }

    startTimer(){
        if (!this.state.started){
            this.setState({
                timer: setInterval(this.countdown, 1000),
                started: true
            });
        }
    }

    onBidValueChange(e){
        this.setState({
            bidvalue: e.target.value
        });
    }

    onBidSubmit(e){
        e.preventDefault();
        if (!this.state.user){
            this.setState({
                triedtobid: true
            });
            this.hideBidModal();
            return;
        }

        if (this.state.bidvalue < this.state.post.bidprice){
            console.log("shit is back")
            return;
        }
    
        const updatedItem = {
            bidder: this.state.user.username,
            bidprice: this.state.bidvalue
        }

        axios.post("http://localhost:5823/items/update/" + this.state.post._id, updatedItem)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    post: response.data
                }, () => {
                    this.hideBidModal();
                });
            })
            .catch((error) => {
                console.log(error);
            });
        
    }

    componentDidMount(){
        axios.get("http://localhost:5823/items/" + this.state.postid)
            .then(response => {
                this.setState({
                    post: response.data,
                    postid: null
                });
                axios.get("http://localhost:5823/users/" + this.state.post.owner)
                    .then(res => {
                        this.setState({
                            post_owner: res.data
                        });
                        if (this.state.user){
                            axios.post("http://localhost:5823/items/following/", {
                                itemId: this.state.post._id,
                                username: this.state.user.username
                            })
                            .then(resp => {
                                if (resp.data.following === true){
                                    this.setState({ 
                                        followIconDisplay: { display: 'flex'},
                                        buttonUnfollowPost: { display: 'flex'},
                                        buttonFollowPost: { display: 'none'},
                                        following: true
                                    });
                                } else {
                                    this.setState({ 
                                        followIconDisplay: { display: 'none'},
                                        buttonUnfollowPost: { display: 'none'},
                                        buttonFollowPost: { display: 'flex'},
                                        following: false
                                    });
                                }
                            })
                            .catch((error) => { console.log(error); });
                        }
                    })
                    .catch((error) => { console.log(error); });
                this.showBidModal = this.showBidModal.bind(this);
                this.hideBidModal = this.hideBidModal.bind(this);
                this.onBidSubmit = this.onBidSubmit.bind(this);
                this.onBidValueChange = this.onBidValueChange.bind(this);
                this.follow = this.follow.bind(this);
                this.unfollow = this.unfollow.bind(this);
                this.startTimer = this.startTimer.bind(this);
                this.stopTimer = this.stopTimer.bind(this);
                this.countdown = this.countdown.bind(this);
                this.startTimer();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (this.state.post_owner === null || this.state.post === null) ? this.state.deleted === true ? <Redirect to={{
                    pathname: `/`,
                    state: this.state.user
                }}/> : "Loading..." : (
            <main>
                {showNavbar(this.state.user)}
                <div className="product-description-container">
                    <div className="post-text">
                        <div className="text"><br/>
                            <div className="owner-follow">
                                {/* we need the owner first && last name */}
                                <Link id="owner" to={{
                                    pathname: "/user",
                                    state: {
                                        "visitor": this.state.user,
                                        "owner": this.state.post_owner
                                    }
                                }}>
                                        {getUserSvg()}
                                        {this.state.post_owner.firstname} {this.state.post_owner.lastname}</Link>
                                    {/* icon appear when the button 'Follow this post' is pushed */}
                                    <p id="follow-icon" style={this.state.followIconDisplay}>{getBidSvg()}</p>
                            </div>
                            <p id="title">{this.state.post.title} </p> 
                            <br/>
                            <h6>DESCRIPTION:<br/></h6>
                            <p>{this.state.post.description}</p>
                            <p> {getExclamation()}Bid End Date :</p>
                            <p id="end-bid-date">
                                {this.state.hours_left}:
                                {this.state.minutes_left}:
                                {this.state.seconds_left}
                            </p>
                            <div className="price-details">
                                <p>START price:</p>
                                <p className="price"><b>{this.state.post.startingprice} RON</b></p>
                            </div>
                            <div className="price-details">
                                <p>BID price:</p>
                                <p className="price"><b>{this.state.post.bidprice} RON</b></p>
                            </div>
                            <p>LAST bidder: {this.state.post.bidder}</p>
                            <br/>
                            <Link to={{
                                    pathname: "/",
                                    state: this.state.user
                            }}>
                                <Button className="button-back-details" onClick={this.stopTimer}>BACK</Button>
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
                    <Button onClick={this.showBidModal}>Bidding</Button>
                    {/* will add the product into following list (need another page too to print the queue of "posts what i'm following") */}
                    <Button id="follow" style={this.state.buttonFollowPost} onClick={this.follow}>Follow this post</Button>
                    <Button id="unfollow" style={this.state.buttonUnfollowPost} onClick={this.unfollow}>Unfollow this post</Button>
                </div>
                <div className="bid" style={this.state.bidDisplay}>
                    <div className="bid-div">
                        <div><h3>Make <b>BID</b></h3></div><br/>
                        <p className="bid-text">Write your payment and let's bidding!</p><br/>
                        <form onSubmit={this.onBidSubmit}>
                            <label className="bid-label">Your bid:</label>
                            <input 
                                className="bid-input"
                                type="number"
                                autoComplete="off"
                                value={this.state.bidvalue}
                                onChange={this.onBidValueChange}
                                step="0.01"
                                name="bid form"
                                min={Math.max(this.state.post.bidprice, this.state.post.startingprice)}
                            /><br/><br/><br/>
                            <div className="bid-buttons">
                                <button className="button-bid-style" onClick={this.hideBidModal}>{getBackWhite()}Back</button>
                                <button className="button-bid-style" value="Bid">{getBiggerMoneySvg()} Bid</button>
                            </div>
                        </form> 
                        <br/>
                    </div>
                </div>
            </main>
        );
    }
}
