import React, { Component } from "react";
import axios from "axios";

export class MainHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      username: "",
      password: "",
      newsletter: false,
      isLoggedIn: false,
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSingOut = this.handleSignOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSignOut(event) {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "/";
    this.props.callFromParent(false);
  }
  handleSignIn(event) {
    const { username, password } = this.state;

    axios.post("http://localhost:2000/users", {
        user: {
          username: username,
          password: password,
        },
      })
      .then((response) => {
        console.log(response);

        if (response.data === "invalid") {
          console.log("Error!!");
        } else {
          var loggedInUser = {
            id: response.data.id,
            username: response.data.username,
            newsletter: response.data.newsletter,
          };
          this.setState({
            isLoggedIn: true,
            newsletter: response.data.newsletter,
            id: response.data.id,
          });
          this.props.callFromParent(
            true,
            this.state.username,
            this.state.newsletter,
            this.state.id
          );
          localStorage.setItem(
            "currentLoggedInUser",
            JSON.stringify(loggedInUser)
          );
        }
      });
    event.preventDefault();
  }

  handleRegister(event) {
    event.preventDefault();
    this.props.registerUser(true);
  }

  render() {

    // Basic styling for the header 
    const textStyle = {
      color: "#fff",
      textAlign: "center"
    };
    const headerStyle = {
      background: "#AEBCAF",
      height: "105px",
      padding: "10px",
      
    };
    const registerDesign = {
      color: "#fff",
      textAlign: "left",
      
    };


    const left = {
      float: "left",
    };
    const right = {
      float: "right",
    };

    if (this.state.isLoggedIn === false) {
      return (
        <div>
          <header style={headerStyle}>
          <br></br>
            <div style={left}>
              <form onSubmit={this.handleSignIn} style={registerDesign}>
                Username{""}
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                ></input>{""}
                Password{""}
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                ></input>{""}
                <button type="submit" className="btn btn-success btn">Login</button>
              </form>
            </div>
            <div syle={right}>
              <button onClick={this.handleRegister} style={right} className="btn btn-success btn">
                Register
              </button>
            </div>
          </header>
        </div>
      );
    } else if (this.state.isLoggedIn === true) {
      return (
        <div>
          <header style={headerStyle}>
            <h1 style={textStyle}>Logged in and everything, we gucci</h1>
            <form onSubmit={this.handleSignOut} style={registerDesign}>
              <button  type="submit" className="btn btn-danger">
                Sign Out
              </button>
            </form>
          </header>
        </div>
      );
    }
  }
}

export default MainHeader;