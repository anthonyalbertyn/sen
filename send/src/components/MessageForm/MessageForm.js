import React, { useEffect, useState } from "react";
import { Button, DatePicker, Input } from "antd";
import moment from "moment";
import "./MessageForm.css";

const { TextArea } = Input;

function MessageForm(props) {
  const {
    message = "",
    onClickCancel = () => {},
    onClickSave = () => {},
    unixTimestamp = "",
  } = props;

  // MessageForm is used for both creating new messages
  // and for editing existing messages. It manages its
  // own state and it uses the 'controlled form design
  // pattern' for managing its input fields. When an
  // existing message needs to be edited, the form needs
  // to receive data, and we do this through props.

  // Perform a one-off initialisation of message state
  // with data received from message prop - if any
  let messageTextDefaultValue = "";
  if (message) {
    messageTextDefaultValue = message;
  }

  // Perform a one-off initialisation of unixTimestamp state
  // with data received from unixTimestamp prop - if any
  let scheduleDateDefaultValue = "";
  if (unixTimestamp) {
    scheduleDateDefaultValue = moment(unixTimestamp * 1000);
  }

  // State for managing input field values
  const [messageText, setMessageText] = useState(messageTextDefaultValue);
  const [scheduleDate, setScheduleDate] = useState(scheduleDateDefaultValue);

  // State for managing field validation and related error messages
  const [messageError, setMessageError] = useState("");
  const [dateError, setDateError] = useState("");

  // State to detect start of user interaction with the 'form'
  const [hasInteractedWithForm, setHasInteractedWithForm] = useState(false);

  // State for managing the save button
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  // Update message text state
  const handleTextChange = (event) => {
    setMessageText(event.target.value);
  };

  // Update date state
  const handleDateChange = (date, _) => {
    setScheduleDate(date);
  };

  // Udate state for detecting user interaction
  const handleFormClick = () => {
    if (!hasInteractedWithForm) {
      setHasInteractedWithForm(true);
    }
  };

  useEffect(() => {
    let messageNotEmpty = false;
    let dateNotEmpty = false;
    let dateNotPassedDate = false;

    // 'Message required' validation
    if (messageText) {
      messageNotEmpty = true;
      setMessageError("");
    } else {
      setMessageError("Please add a message");
    }

    // 'Date required' validation
    if (scheduleDate) {
      dateNotEmpty = true;
      setDateError("");
    } else {
      setDateError("Please select a date and time");
    }

    // 'Date not passed date' validation
    if (scheduleDate) {
      const unixNow = moment().unix();
      const unixScheduleDate = scheduleDate.unix();
      if (unixNow < unixScheduleDate) {
        dateNotPassedDate = true;
      } else {
        setDateError("Please select a future date and time");
      }
    }

    // Enable the Save button if all validation passed
    // otherwise disable the save button
    if (messageNotEmpty && dateNotEmpty && dateNotPassedDate) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [messageText, scheduleDate]);

  // Re-usable markup
  const required = (
    <span className="required">
      <sup>*</sup>
    </span>
  );

  return (
    <div className="message-form" onClick={handleFormClick}>
      <div className="message-form-item">
        <div className="message-form-item-label">Message {required}</div>
        <TextArea
          placeholder="Add a message here - maximum 140 characters"
          allowClear
          onChange={handleTextChange}
          value={messageText}
          maxLength={140}
        />
        {messageError && hasInteractedWithForm && (
          <div className="message-form-error">{messageError}</div>
        )}
      </div>
      <div className="message-form-item">
        <div className="message-form-item-label">
          Scheduled post date {required}
        </div>
        <DatePicker
          showTime={{ format: "HH:mm" }}
          format="DD-MM-YYYY HH:mm"
          onChange={handleDateChange}
          value={scheduleDate}
        />
        {dateError && hasInteractedWithForm && (
          <div className="message-form-error">{dateError}</div>
        )}
      </div>
      <div className="note">
        {required} These fields are required to be completed
      </div>
      <div className="message-form-actions-wrapper">
        <div className="message-form-action-item">
          <Button key="cancel" onClick={onClickCancel}>
            Cancel
          </Button>
        </div>
        <div className="message-form-action-item">
          <Button
            key="submit"
            type="primary"
            onClick={onClickSave}
            disabled={isSaveDisabled}
            onClick={() => onClickSave(messageText, scheduleDate.unix())}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MessageForm;
