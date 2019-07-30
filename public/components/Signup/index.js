import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export class Signup extends Component {
  state = {
    error: null
  };

  handleChange = ({ target: { name, value } }) => {
    console.log( name, value);
    
    this.setState({[name]: value });
  };

  handleClick = () => {
    const { handle, email, password } = this.state;
    const { history } = this.props;
    axios
      .post("/api/user/signup", { handle,email, password })
      .then(({ data }) => {
        if (data) {
          console.log('dataaaa',data);
          history.push("/signin");
        } else {
          this.setState({ error });
        }
      })
      .catch(error => {
        this.setState({ error});
      });
  };
 
onSubmit = (e)=>{
  e.preventDefault();
}
  render() {
    return (
      <div>
          <form onClick={this.onSubmit}>
          <input
              type="text"
              name="handle"
              value={this.state.handle}
              placeholder="handle"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="email"
              value={this.state.email}
              placeholder="username"
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button onClick={this.handleClick}>
              signUp
            </button>
          </form>
      </div>
    );
  }
}
