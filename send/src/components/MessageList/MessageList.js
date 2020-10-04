import React from "react";
import moment from "moment";
import MessageCard from "../MessageCard";
import PropTypes from "prop-types";

const propsDefinition = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      message: PropTypes.string,
      unixTimestamp: PropTypes.string,
    })
  ).isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  sortAscending: PropTypes.bool,
};

function MessageList(props) {
  const {
    messages = [],
    onDeleteClick = () => {},
    onEditClick = () => {},
    sortAscending = true,
  } = props;

  // Sort direction for ascending by date and time
  const compareForNumericAscending = (a, b) => {
    return parseInt(a.unixTimestamp, 10) - parseInt(b.unixTimestamp, 10);
  };

  // Sort direction for descending by date and time
  const compareForNumericDescending = (a, b) => {
    return parseInt(b.unixTimestamp, 10) - parseInt(a.unixTimestamp, 10);
  };

  // Decide which sort direction to use
  const sortDirectionCompare = sortAscending
    ? compareForNumericAscending
    : compareForNumericDescending;

  // Sort mutates the array it acts on and we do not want
  // to mutate messages array, so we clone messages array first
  // before performing the sort.
  const sortedMessages = [...messages].sort(sortDirectionCompare);

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

MessageList.propTypes = propsDefinition;

export default MessageList;
