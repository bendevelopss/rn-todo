import React, { Component } from "react";
import { LoginStack } from "../config/router/router";
// import Splash from "./splash";

class Root extends Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     setTimeout(() => {
//       this.props.actions.restoreSession();
//     }, 2000);
//   }

  render() {
    // if (this.props.state.requestingRestore) {
    //   return <Splash />;
    // }

    // if (this.props.state.isAuth) {
    //   return <MainStack />;
    // } else {
      return <LoginStack />;
    // }
  }
}

export default Root;
