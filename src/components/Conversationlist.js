import React, { Component } from "react";
import { ActionCable } from "react-actioncable-provider";
import { API_ROOT } from "../constants";
import NewConversationForm from "./NewConversationForm";
import MessagesArea from "./MessagesArea";
import Cable from "./cable";

class Conversationlist extends Component {
  state = {
    conversations: [],
    activeConversation: null,
  };
  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`)
      .then((r) => r.json())
      .then((conversations) => this.setState({ conversations }));
  };
  handleClick = (id) => {
    this.setState({
      activeConversations: id,
    });
  };
  handleRecievedConversation = (response) => {
    const { conversation } = response;
    this.setState({
      conversation: [...this.state.conversations, conversation],
    });
  };
  handleRecievedMessage = (response) => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      (conversation) => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });
  };
  render = () => {
    const { conversations, activeConversation } = this.state;
    return (
      <div className="conversationsList">
        <ActionCable
          channel={{ channel: "ConversationsChannel" }}
          onRecieved={this.handleRecievedConversation}
        />
        {this.state.conversations.length ? (
          <Cable
            conversations={conversations}
            handleRecievedMessage={this.handleRecievedMessage}
          />
        ) : null}
        <h2>Conversations</h2>
        <ul>{mapConversations(conversations, this.handleClick)}</ul>
        <NewConversationForm />
        {activeConversation ? (
          <MessagesArea
            conversation={findActiveConversation(
              conversations,
              activeConversation
            )}
          />
        ) : null}
      </div>
    );
  };
}
export default Conversationlist;
//helper functions

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    (conversation) => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map((conversation) => {
    return (
      <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
        {conversation.title}
      </li>
    );
  });
};
