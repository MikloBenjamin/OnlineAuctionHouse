import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
// import { showNavbar } from "./navbar.component";
import { getBack, getBindHourSvg, getBindMinuteSvg, getImageSvg, getMoneySvg, getTimeSvg } from "../helpers/svgFunctions";

export default class CreateItem extends Component {
    constructor(props){
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeHours = this.onChangeHours.bind(this);
        this.onChangeMinutes = this.onChangeMinutes.bind(this);
        this.onChangeStartingPrice = this.onChangeStartingPrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImages = this.onChangeImages.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            description: '',
            hours: 0,
            minutes: 0,
            startingprice: 0,
            image: null,
            user: this.props.location.state
        }
    }

    componentDidMount(e) {
        console.log(this.state.user)
    }

    onChangeTitle(e){
        this.setState({
            title: e.target.value
        })
    }
    onChangeHours(e){
        this.setState({
            hours: e.target.value
        })
    }
    onChangeMinutes(e){
        this.setState({
            minutes: e.target.value
        })
    }
    onChangeStartingPrice(e){
        this.setState({
            startingprice: e.target.value
        })
    }
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }
    onChangeImages(e){
        this.setState({
            image: e.target.files[0]
        })
    }

    onSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", this.state.title);
        formData.append("description", this.state.description);
        formData.append("hours", this.state.hours);
        formData.append("minutes", this.state.minutes);
        formData.append("startingprice", this.state.startingprice);
        formData.append("owner", this.state.user.username);
        formData.append("image", this.state.image);

        axios.post("http://localhost:5823/items/createWithImage", formData)
            .then(res => console.log(res.data))
            .catch((error) => {
                if (error.response){
                    console.log(error.response);
                }
                else if(error.request){
                    console.log(error.request);
                }
                else if(error.message){
                    console.log(error.message);
                }
            })

        this.setState({
            title: "",
            description: "",
            date: new Date(),
            image: null
        })
    }

    render() {
        if(this.state.user === undefined || this.state.user === null || this.state.user === 0 || this.state.user === ""){
            return <Redirect to={{
                pathname: `/login`,
                state: this.state.user
            }}/>;
        }
        return (
            <main>
                {/* {showNavbar(this.state.user)} */}
                <h3><b>Create New</b> Post</h3><br/>
                <p id="text-create-item">If you want to add a new auction post, just complete the form and press <i>Done</i>!</p>
                <div className="create-item-container">
                    <div className="create-item-form">
                    <div className="back-point">
                        <Link to={{
                            pathname: "/",
                            state: this.state.user
                        }}>{getBack()}
                    </Link>
                    </div>
                        <form onSubmit={this.onSubmit} encType="multipart/form-data" className="form">
                            <div className="form-group">
                                <label>Title: </label><br/>
                                <input
                                    type="text"
                                    required
                                    className="form-input"
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    />
                            </div>
                            <div className="form-group">
                                <label>Description: </label><br/>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div><br/>
                            <div className="form-group">
                                <label>
                                    {getBindHourSvg()}
                                    Bid time hours: </label><br/>
                                <input 
                                    type="number" 
                                    min="1" 
                                    max="120" 
                                    required
                                    className="form-input"
                                    onChange={this.onChangeHours}/><br/>
                                <label>
                                    {getBindMinuteSvg()}
                                    Bid time minutes: </label><br/>
                                <input 
                                    type="number" 
                                    min="0" 
                                    max="59" 
                                    required
                                    className="form-input"
                                    onChange={this.onChangeMinutes}/>
                            </div><br/>
                            <div className="form-group">
                                <label>
                                    {getMoneySvg()}
                                    Bid starting price (RON): </label><br/>
                                <input 
                                    type="number" 
                                    min="10" 
                                    required
                                    className="form-input"
                                    onChange={this.onChangeStartingPrice}/>
                            </div><br/>
                            <div className="form-group">
                                <label>
                                    {getImageSvg()}
                                    Image: </label><br/>
                                <input type="file"
                                    // multiple
                                    accept=".png, .jpg, .jpeg"
                                    filename="image"
                                    selected={this.state.image}
                                    onChange={this.onChangeImages}
                                    className="choose-file"
                                />
                            </div><br/><br/>
                            <div className="form-group">
                                <input
                                    type="submit"
                                    className="button-done"
                                    value="Done"
                                />
                            </div>
                        </form><br/>
                    </div>
                </div>
            </main>
        );
    }
}
