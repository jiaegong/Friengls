import React, { useState, useRef, useEffect } from 'react';
// import io from 'socket.io-client';
import Peer from 'simple-peer';

// const socket = io('https://www.jg-jg.shop');

const VideoChat = (props) => {
  const callerVideo = useRef();
  const calleeVideo = useRef();
  const connectionRef = useRef();
  const roomName = props.match.params.roomName;

  useEffect(() => {
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((stream) => {
    //     callerVideo.current.srcObject = stream;
    //     socket.emit('joinRoom', roomName);
    //     socket.on('callerPeer', (userToSignal, callerId, stream) => {
    //       const peer = new Peer({ initiator: true, trickle: false, stream });
    //       peer.on('signal', (signal) => {
    //         socket.emit('sendingSignal', {
    //           userToSignal,
    //           callerId,
    //           signal,
    //         });
    //       });
    //       peer.on('stream', (currentStream) => {
    //         calleeVideo.current.srcObject = currentStream;
    //       });
    //       socket.on('callAccepted', (signal) => {
    //         peer.signal(signal);
    //       });
    //       connectionRef.current = peer;
    //     });
    //     socket.on('calleePeer', (incomingSignal, callerId, stream) => {
    //       const peer = new Peer({ initiator: false, trickle: false, stream });
    //       peer.on('signal', (signal) => {
    //         socket.emit('returningSignal', { signal, to: callerId });
    //       });
    //       peer.on('stream', (stream) => {
    //         calleeVideo.current.srcObject = stream;
    //       });
    //       peer.signal(incomingSignal);
    //       connectionRef.current = peer;
    //     });
    //   });
  }, []);

  const leaveCall = () => {
    connectionRef.destroy();
  };

  return (
    <div>
      <video playsInline muted ref={callerVideo} autoPlay />
      <video playsInline ref={calleeVideo} autoPlay />
    </div>
  );
};

export default VideoChat;
