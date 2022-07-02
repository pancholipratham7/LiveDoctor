import React, { useEffect, useState, useRef } from "react";
import classes from "./VideoCallPage.module.css";
import MicIcon from "@material-ui/icons/Mic";
import VideoCamIcon from "@material-ui/icons/Videocam";
import EndCallIcon from "@material-ui/icons/CallEnd";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

const VideoCallPage = () => {
  const [myStream, setMystream] = useState();
  const [partnerStream, setPartnerstream] = useState();
  const [isReceivingCall, setIsReceivingCall] = useState();
  const [isCalling, setIsCalling] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState();

  // logged in user details
  const { userLoggedInDetails } = useSelector((state) => state.user);

  // call ID
  const params = useParams();
  const myVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.emit("join-room", { roomId: params.callId });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMystream(stream);
        myVideo.current.srcObject = stream;
      });

    // receiving call event
    socket.current.on("receiving-call", function (data) {
      setIsReceivingCall(true);
      setCallerSignal(data.signalData);
    });
  }, []);

  // accept call btn handler
  function acceptCallBtnHandler() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myStream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("acceptCall", {
        signalData: data,
        to: params.callId,
      });
    });

    peer.on("stream", (stream) => {
      setPartnerstream(stream);
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  // call doctor btn handler
  function callDoctorBtnHandler() {
    // create an alert
    setIsCalling(true);

    // creating a peer
    // this will be the patient peer
    const peer = new Peer({
      // this tells whether this person is initiator of the call or not
      initiator: true,
      trickle: false,
      stream: myStream,
    });

    //this will execute when the signal data for this peer will be prepared
    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: params.callId,
        signalData: data,
      });
    });

    //this will execute when peer 2 will send its stream
    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        setPartnerstream(stream);
        partnerVideo.current.srcObject = stream;
      }
    });

    //listening to the event when the call is accepted
    socket.current.on("callAccepted", function (data) {
      setCallAccepted(true);
      peer.signal(data.signalData);
    });
  }

  return (
    <React.Fragment>
      <div className={classes["main-container"]}>
        <div className={classes["video-call-container"]}>
          <video
            className={classes["partner-video"]}
            muted
            autoPlay
            playsInline
            ref={partnerVideo}
          ></video>
          <video
            className={classes["my-video"]}
            muted
            autoPlay
            playsInline
            ref={myVideo}
          ></video>
          {userLoggedInDetails.isDoctor && isReceivingCall && !callAccepted && (
            <div className={classes["receiving-call-container"]}>
              <p>Patient is calling...</p>
              <button onClick={acceptCallBtnHandler}>Accept the call</button>
            </div>
          )}
          {!userLoggedInDetails.isDoctor && !partnerStream && !isCalling && (
            <button
              className={classes["call-doctor-btn"]}
              onClick={callDoctorBtnHandler}
            >
              Call the doctor
            </button>
          )}
          {isCalling && !partnerStream && (
            <div className={classes["loading-container"]}>
              <img alt="" src="/loading.gif" />
              <p>Wait for the doctor to accept the call....</p>
            </div>
          )}
          {partnerStream && (
            <div className={classes["video-control-buttons-container"]}>
              <div className={classes["control-btn-container"]}>
                <MicIcon className={classes["control-btn"]} />
              </div>
              <div className={classes["control-btn-container"]}>
                <VideoCamIcon className={classes["control-btn"]} />
              </div>
              <div className={classes["control-btn-container"]}>
                <EndCallIcon className={classes["control-btn"]} />
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default VideoCallPage;
