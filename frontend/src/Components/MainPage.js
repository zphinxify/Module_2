import React, { Component } from "react";
import MainHeader from "./MainHeader";
import Dashboard from "./Dashboard";

export class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogedIn: false,
      userId: "",
      newsletter: "",
      logedInUsername: "",
      registerNew: false,
    };
  }
  parentRegisterUser = (register) => {
    this.setState({
      registerNew: register,
    });
  };
  parentFunction = (loggedIn, user, news, id) => {
    this.setState({
      isLogedIn: loggedIn,
      userId: id,
      logedInUsername: user,
      newsletter: news,
    });
    console.log(this.state.userId);
    console.log(this.state.logedInUsername);
  };

  render() {
    return (
      <div>
        <div>
          <MainHeader
            callFromParent={this.parentFunction.bind(this)}
            registerUser={this.parentRegisterUser.bind(this)}
          ></MainHeader>
        </div>
        <div>
          <Dashboard
            userLogedIn={this.state.isLogedIn}
            currentUserId={this.state.userId}
            loggedInUsername={this.state.logedInUsername}
            userNewsletter={this.state.newsletter}
            registerNewUser={this.state.registerNew}
          ></Dashboard>
        </div>
      </div>
    );
  }
}

export default MainPage;