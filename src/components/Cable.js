import React from "react";
import { ActionCable } from "react-actioncable-provider";

const Cable = ({ conversations, handleRecievedMessage }) => {
  return (
    <>
      {conversations.map((conversation) => {
        return (
          <ActionCable
            key={conversation.id}
            channel={{
              channel: "MessageChannel",
              conversation: conversation.id,
            }}
            onRecieved={handleRecievedMessage}
          />
        );
      })}
    </>
  );
};
export default Cable;
