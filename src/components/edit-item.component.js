import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";


export default class EditItem extends Component {
    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            description: '',
            date: new Date(),
            users: [],
            id: ""
        }
    }

    componentDidMount() {
        const _id = this.props.location.pathname.split('/').at(-1)
        axios.get("http://localhost:5823/items/edit/" + _id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    date: new Date(response.data.date),
                    id: _id
                })
            })
            .catch((error) => {
                console.log(error);
            });
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

    // on submitting create item form
    onSubmit(e){
        e.preventDefault();

        const _item = {
            name: this.state.name,
            description: this.state.description,
            date: this.state.date,
            id: this.state.id
        }

        axios.post("http://localhost:5823/items/update/" + this.state.id, _item)
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
            date: new Date()
        })
    }

    render() {
        return (
            <div>
                <h3>Edit Item</h3>
                <form onSubmit={this.onSubmit}>
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
                            required
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
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value="Edit Item"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
