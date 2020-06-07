import React, { Component } from "react";
import axios from "axios";

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { username, email, password } = this.state;

    axios.post("http://localhost:2000/createUser", {
        user: {
          username: username,
          email: email,
          password: password,
        },
      }).then(response => {
        // See what response is returned by the express api
        console.log("registration response:", response);
      }).catch(error => {
        console.log("registration error:", error)
      })
      event.preventDefault();
      window.location.reload(false);
  }

  render() {
    var putNews;

    const handleNewsletter = () => {
      if (this.props.userNewsletter === false) {
        putNews = true;
      } else {
        putNews = false;
      }
      axios.put(
        "http://localhost:2000/updateuser/" + this.props.currentUserId,
        {
          userPut: {
            id: this.props.currentUserId,
            username: this.props.currentUsername,
            newsletter: putNews,
          },
        }
      );

      var currentLocal = JSON.parse(
        localStorage.getItem("currentLoggedInUser")
      );

      if (currentLocal.newsletter !== "true") {
        currentLocal.newsletter = "true";
      } else {
        currentLocal.newsletter = "false";
      }
      localStorage.setItem("currentLoggedInUser", JSON.stringify(currentLocal));

      window.location.reload("false");
    };

    var isSubscribed;
    var subButton;
    if (this.props.userNewsletter) {
      isSubscribed = "You are currently subscribed";
      subButton = "Unsubscribe";
    } else {
      isSubscribed = "You are not subscribed, yet!";
      subButton = "Subscribe";
    }

    if (this.props.registerNewUser === true) {
      const registerDesign = {
        textAlign: "center",
        padding: "100px",
      };
      return (
        <div>
          <div>
            <form style={registerDesign} onSubmit={this.handleSubmit}>
              <br></br>
              <br></br>
              Username: <br></br>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                required
              ></input>
              <br></br>
              <br></br>
              User Email: <br></br>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              ></input>
              <br></br>
              <br></br>
              Password: <br></br>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              ></input>
              <br></br>
              <br></br>
              <button type="submit" className="btn btn-success">Register</button>
            </form>
          </div>
        </div>
      );
    }
    if (this.props.loggedInUser === false) {
      return (
        <div>
        <br></br>
        <br></br>
        <br></br>
          <h2>Welcome to the newsletter page</h2>
          <br></br>
          <br></br>
          <br></br>
          <img src="https://miro.medium.com/max/4320/1*jFyawcsqoYctkTuZg6wQ1A.jpeg" alt="Coding monkey aka me" width="auto" height="550"></img>
        </div>
      );
    } else if (
      this.props.loggedInUser === true 
    ) {
      return (
        <div>
          <h3>Greetings, {this.props.currentUsername}</h3>
          <br></br>
          <h4>{isSubscribed}</h4>
          <input
            type="button"
            className="btn btn-danger"
            onClick={handleNewsletter}
            value={subButton}
          ></input>

          <div></div>
        </div>
      );
    }
  }
}

export default Dashboard;