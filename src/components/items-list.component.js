import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Item = props => (
    <tr>
        <td>{props.item.name}</td>
        <td><img src={`data:${props.item.concreteImage.contentType};base64,${props.item.concreteImage.concreteImageBase64}`} alt="Missing"/></td>
        <td>
            <Link to={"/edit/" + props.item._id}>Edit</Link> | <a href="/#" onClick={() => {
                props.deleteItem(props.item._id)}}>Delete</a>
        </td>
    </tr>
)

export default class ItemsList extends Component {
    constructor(props){
        super(props);
        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
            items: []
        }
    }

    componentDidMount(e) {
        axios.get("http://localhost:5823/items/")
            .then(response => {
                this.setState({
                    items: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteItem(id){
        axios.delete("http://localhost:5823/items/delete/" + id)
            .then(res => console.log(res.data));
        this.setState({
            items: this.state.items.filter(item => item._id !== id)
        })
    }

    itemsList(){
        return this.state.items.map(item => {
            // console.log(item._id)
            const newItem = <Item item={item} deleteItem={this.deleteItem} key={item._id} />
            // console.log(newItem)
            return newItem
        })
    }

    render() {
        return (
            <div id="items">
                <h3>Items</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.itemsList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
