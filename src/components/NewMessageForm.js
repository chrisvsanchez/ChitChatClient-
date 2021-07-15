import React from "react";
import { API_ROOT, API_WS_ROOT, HEADERS } from "../constants";

import React, { Component } from "react";

class NewMessageForm extends Component {
  state = {
    text: "",
    conversation_id: this.props.conversation_id,
  };
  componentDidMount = (nextProps) => {
    this.setState({ converation_id: nextProps.conversation_id });
  };
  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_ROOT}/messages`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(this.state),
    });
    this.setState({ text: "" });
  };
  render() {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default NewMessageForm;
