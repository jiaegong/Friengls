import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const VideoChat = () => {
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const roomName = '123';
  let userStream = null;
  let creator = false;

  useEffect(() => {
    const socket = io('https://www.jg-jg.shop');
    socket.emit('joinRoom', roomName);

    socket.on('created', () => {
      creator = true;

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          userStream = stream;
          myVideo.current.srcObject = stream;
        });
    });

    socket.on('joined', () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          userStream = stream;
          myVideo.current.srcObject = stream;
        });

      socket.emit('ready', roomName);
    });

    socket.on('ready', () => {
      if (creator) {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: userStream,
        });

        peer.on('signal', (signal) => {
          socket.emit('sendingSignal', { signal, roomName });
        });

        peer.on('stream', (stream) => {
          userVideo.current.srcObject = stream;
        });

        socket.on('receivingSignal', (signal) => {
          peer.signal(signal);
        });

        connectionRef.current = peer;
      }
    });

    socket.on('offer', (incomingSignal) => {
      if (!creator) {
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: userStream,
        });

        peer.on('signal', (signal) => {
          socket.emit('returningSignal', { signal, roomName });
        });

        peer.on('stream', (stream) => {
          userVideo.current.srcObject = stream;
        });

        peer.signal(incomingSignal);

        connectionRef.current = peer;
      }
    });
  }, []);

  const leaveCall = () => {
    connectionRef.destroy();
  };

  return (
    <div>
      <video playsInline muted ref={myVideo} autoPlay />
      <video playsInline muted ref={userVideo} autoPlay />
      <button onClick={leaveCall}>통화 종료</button>
    </div>
  );
};

export default VideoChat;
