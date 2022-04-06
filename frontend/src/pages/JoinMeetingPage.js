import React, { useState } from "react";
import classes from "./JoinMeetingPage.module.css";

const JoinMeetingPage = () => {
  // meeting Id
  const [meetingId, setMeetingId] = useState("");
  // meeting password state
  const [meetingPassword, setMeetingPassword] = useState("");

  // join meeting handler
  const joinMeetingHandler = (e) => {
    e.preventDefault();
    console.log(meetingId, meetingPassword);
  };

  return (
    <form
      className={classes["join-meeting-form"]}
      onSubmit={joinMeetingHandler}
    >
      <div className={classes["heading-container"]}>
        <span className={classes["heading"]}>Join Meeting</span>
      </div>
      <input
        onChange={(e) => setMeetingId(e.target.value)}
        className={classes["join-meeting-inputs"]}
        type="text"
        placeholder="Enter meeting ID"
      />
      <input
        onChange={(e) => setMeetingPassword(e.target.value)}
        className={classes["join-meeting-inputs"]}
        type="password"
        placeholder="Enter meeting password"
      />
      <button className={classes["join-meeting-btn"]}>Start Meeting</button>
    </form>
  );
};

export default JoinMeetingPage;
