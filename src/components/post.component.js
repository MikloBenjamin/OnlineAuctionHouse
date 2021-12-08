import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
import { getTimeSvg, getBiggerMoneySvg, getBackWhite } from "../helpers/svgFunctions";

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            post: this.props.post,
            timer: null,
            started: false,
            hours_left: 0,
            minutes_left: 0,
            seconds_left: 0,
            bidDisplay: {},
            bidvalue: 0,
            triedtobid: false,
            canBid: false
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
                .then(() => {})
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

    showBidModal(e){
        e.preventDefault();
        this.setState({ bidDisplay: { display: 'flex' } });
        this.setState({ buttonsDisplay: { display: 'none' } });
    }

    hideBidModal(e){
        this.setState({ bidDisplay: { display: 'none' }});
        this.setState({ buttonsDisplay: { display: 'flex' } });
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

    componentDidMount(e){
        this.showBidModal = this.showBidModal.bind(this);
        this.hideBidModal = this.hideBidModal.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.countdown = this.countdown.bind(this);
        this.onBidSubmit = this.onBidSubmit.bind(this);
        this.onBidValueChange = this.onBidValueChange.bind(this);
        this.startTimer();
        if (this.state.user && this.state.post.owner === this.state.user.username){
            this.setState({
                bidDisabled: true
            })
        }
    }

    render() {
        return this.state.triedtobid ? <Redirect to={{
                                            pathname: `/login`,
                                            state: this.state.user
                                        }}/> : (
            <div className="product-item">
                <div>
                    {this.state.post.owner}
                </div>
                <img className="modelimage" src={`data:${this.state.post.image.data};base64,${this.state.post.image.imageBase64}`} alt="Missing"/> 
                <div>
                    {this.state.post.title}
                </div>
                <div className="functionalities">
                    <div className="time">
                        {getTimeSvg()}
                        <div>
                            {this.state.hours_left}:
                            {this.state.minutes_left}:
                            {this.state.seconds_left}
                        </div>
                    </div>
                    <div>
                        <button className="main-bid-buttons" onClick={this.showBidModal} disabled={this.state.bidDisabled}>Bid</button>
                    </div>
                </div>  
                <Link to={{
                    pathname: "/details",
                    state: {
                        user: this.state.user,
                        post_id: this.state.post._id
                    }
                }}><button className="button-details">Details</button></Link>
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
            </div>
        )
    }
}

export {
    Post
}