import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { showNavbar } from "./navbar.component";

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
                {showNavbar(this.state.user)}
                <h3>Create New Item</h3>
                <form onSubmit={this.onSubmit} encType="multipart/form-data" className="form">
                    <div className="form-group">
                        <label>Title: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                            />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bid time hours: </label>
                        <input 
                            type="number" 
                            min="1" 
                            max="120" 
                            required
                            className="form-control"
                            onChange={this.onChangeHours}/>
                        <label>Bid time minutes: </label>
                        <input 
                            type="number" 
                            min="0" 
                            max="59" 
                            required
                            className="form-control"
                            onChange={this.onChangeMinutes}/>
                    </div>
                    <div className="form-group">
                        <label>Bid starting price (RON): </label>
                        <input 
                            type="number" 
                            min="10" 
                            required
                            className="form-control"
                            onChange={this.onChangeStartingPrice}/>
                    </div>
                    <div className="form-group">
                        <label>Image: </label>
                        <input type="file"
                            // multiple
                            accept=".png, .jpg, .jpeg"
                            filename="image"
                            selected={this.state.image}
                            onChange={this.onChangeImages}
                            className="form-control-file"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value="List Item"
                        />
                    </div>
                </form>
            </main>
        );
    }
}
