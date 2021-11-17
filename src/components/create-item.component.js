import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateItem extends Component {
    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeImages = this.onChangeImages.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            description: '',
            date: new Date(),
            image: null,
            owner_id: ""
        }
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }
    onChangeDate(date){
        this.setState({
            date: date
        })
    }
    onChangeImages(e){
        console.log(e.target.files)
        this.setState({
            image: e.target.files[0]
        })
    }

    onSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", this.state.name);
        formData.append("description", this.state.description);
        formData.append("date", this.state.date);
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
            name: "",
            description: "",
            date: new Date(),
            image: null
        })
    }

    render() {
        return (
            <div>
                <h3>Create New Item</h3>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
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
                        <label>Date: </label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>
                    <div className="form-group">
                        <label>Images: </label>
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
                            value="Create Item"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
