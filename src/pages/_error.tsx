import React from "react";

export default class Error extends React.Component {
  componentDidMount() {
    window.location.href = "/";
  }
  render() {
    return <p></p>;
  }
}
