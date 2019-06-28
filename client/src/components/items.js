import React, { Component } from 'react';
import './items.css';

const axios = require("axios");

class Items extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*componentDidMount() {
    Item.findAll()
    .then((items) => {
      this.setState({items: items});
    })
    .catch((err) => {
      console.log(err);
      this.setState({items: "error"});
    })
  }*/
  componentDidMount() {
    fetch('/')
      //.then(res => res.json())
      //.then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }

  handleSubmit(e){
    e.preventDefault();
    console.log("submitted");

    axios.post("/items/submit", {
      name: this.name.value
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })

  }

  render() {
    return (
      <div>
        <h2>Items</h2>
        <ul>
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(name) => this.name = name} />
        </label>
        <input type="submit" value="Submit" />
      </form>

        </ul>
      </div>
    );
  }
}

export default Items;
