import React from "react";
import { API_ROOT, HEADERS } from "../constants";

import React, { Component } from "react";

class NewConversationForm extends Component {
  state = { title: "" };

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_ROOT}/conversations`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(this.state),
    });
    this.setState({ title: "" });
  };
  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>New Convo:</label>
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewConversationForm;
