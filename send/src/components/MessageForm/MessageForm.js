import React, { useEffect, useState } from "react";
import { DatePicker, Input } from "antd";
import "./MessageForm.css";
import moment from "moment";

const { TextArea } = Input;

function MessageForm(props) {
  const {
    message = "",
    unixTimestamp = "",
    enableOk = () => {},
    disableOk = () => {},
    createMessage = () => {},
  } = props;

  let messageTextDefaultValue = "";
  if (message) {
    messageTextDefaultValue = message;
  }

  let scheduleDateDefaultValue = "";
  if (unixTimestamp) {
    scheduleDateDefaultValue = moment(unixTimestamp * 1000);
  }

  const [messageError, setMessageError] = useState("");
  const [dateError, setDateError] = useState("");
  const [messageText, setMessageText] = useState(messageTextDefaultValue);
  const [scheduleDate, setScheduleDate] = useState(scheduleDateDefaultValue);
  const [hasInteractedWithForm, setHasInteractedWithForm] = useState(false);

  const handleTextChange = (event) => {
    setMessageText(event.target.value);
  };

  const handleDateChange = (date, _) => {
    setScheduleDate(date);
  };

  const handleFormClick = () => {
    if (!hasInteractedWithForm) {
      setHasInteractedWithForm(true);
    }
  };

  const required = (
    <span className="required">
      <sup>*</sup>
    </span>
  );

  useEffect(() => {
    disableOk();
  }, []);

  useEffect(() => {
    let messageNotEmpty = false;
    let dateNotEmpty = false;
    let dateNotPassedDate = false;

    // message required validation
    if (messageText) {
      messageNotEmpty = true;
      setMessageError("");
    } else {
      setMessageError("Please add a message");
    }

    // date required validation
    if (scheduleDate) {
      dateNotEmpty = true;
      setDateError("");
    } else {
      setDateError("Please select a date and time");
    }

    // date not passed date validation
    if (scheduleDate) {
      const unixNow = moment().unix();
      const unixScheduleDate = scheduleDate.unix();
      if (unixNow < unixScheduleDate) {
        dateNotPassedDate = true;
      } else {
        setDateError("Please select a future date and time");
      }
    }

    // Submit button for update or create
    if (messageNotEmpty && dateNotEmpty && dateNotPassedDate) {
      enableOk();
    } else {
      disableOk();
    }
  }, [messageText, scheduleDate]);

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
    </div>
  );
}

export default MessageForm;
