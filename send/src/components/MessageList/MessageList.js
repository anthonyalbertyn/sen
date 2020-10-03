import React from "react";
import MessageCard from "../MessageCard";
import moment from "moment";

function MessageList(props) {
  const {
    messages = [],
    onEditClick = () => {},
    onDeleteClick = () => {},
  } = props;

  // sort asc by date and time
  const compareForNumericAscending = (a, b) => {
    return parseInt(a.unixTimestamp, 10) - parseInt(b.unixTimestamp, 10);
  };

  const sortedMessages = messages.sort(compareForNumericAscending);

  return (
    <>
      {sortedMessages.length > 0 &&
        sortedMessages.map((item) => {
          return (
            <MessageCard
              key={item.id.toString(10)}
              title={moment(item.unixTimestamp * 1000)
                .format("DD-MM-YYYY HH:mm")
                .toString()}
              messageText={item.message}
              messageId={item.id}
              onEditClick={() => onEditClick(item.id)}
              onDeleteClick={() => onDeleteClick(item.id)}
            />
          );
        })}
    </>
  );
}

export default MessageList;
