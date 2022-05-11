import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import Portal from '../components/Portal';
import ReviewModal from '../components/ReviewModal';
import { Grid, Flex, Button } from '../elements/index';

const VideoChat = () => {
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const roomName = '123';
  let userStream = null;
  let creator = false;

  useEffect(() => {
    const socket = io('https://jg-jg.shop');
    socket.emit('joinRoom', roomName);

    socket.on('created', () => {
      creator = true;

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          userStream = stream;
          myVideo.current.srcObject = stream;
          console.log(1);
        });
    });

    socket.on('joined', () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          userStream = stream;
          myVideo.current.srcObject = stream;
          console.log(2);
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
          console.log(3);
        });

        peer.on('stream', (stream) => {
          userVideo.current.srcObject = stream;
          console.log(4);
        });

        socket.on('receivingSignal', (signal) => {
          peer.signal(signal);
          console.log(5);
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
          console.log(6);
        });

        peer.on('stream', (stream) => {
          userVideo.current.srcObject = stream;
          console.log(7);
        });

        peer.signal(incomingSignal);
        console.log(8);
        connectionRef.current = peer;
      }
    });
  }, []);

  const leaveCall = () => {
    connectionRef.destroy();
  };

  return (
    <Flex
      styles={{
        width: '960px',
        margin: '30px auto',
        padding: '30px',
        border: '2px solid black',
        borderRadius: '10px',
      }}
    >
      <Grid>
        <Flex
          styles={{ margin: '30px', gap: '30px', justifyContent: 'flex-start' }}
        >
          <Flex>
            <video
              style={{ width: '300px', height: '300px', background: '#f9f9f9' }}
              playsInline
              muted
              ref={myVideo}
              autoPlay
            />
          </Flex>
          <Flex>
            <video
              style={{ width: '300px', height: '300px', background: '#f9f9f9' }}
              playsInline
              muted
              ref={userVideo}
              autoPlay
            />
          </Flex>
        </Flex>
        <Flex styles={{ gap: '10px' }}>
          <Button _onClick={leaveCall}>통화 종료</Button>
          <Button _onClick={handleModal}>리뷰 남기기</Button>
        </Flex>
        <Portal>{modalOn && <ReviewModal onClose={handleModal} />}</Portal>
      </Grid>
      <Grid>번역기 자리</Grid>
    </Flex>
  );
};

export default VideoChat;
