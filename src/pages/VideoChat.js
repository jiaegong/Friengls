import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import Portal from '../components/Portal';
import ReviewModal from '../components/ReviewModal';
import styled from 'styled-components';

const VideoChat = () => {
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const peers = {};
  const roomId = '123';

  useEffect(() => {
    const peer = new Peer();
    const socket = io('https://jg-jg.shop');
    console.log(0);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        myVideo.current.srcObject = stream;
        console.log(1);

        // 유저 들어 옴
        peer.on('open', (id) => {
          socket.emit('join-room', roomId, id);
          console.log(2);
        });

        // 새로 들어 온 유저에게 call 요청
        socket.on('user-connected', (userId) => {
          connectToNewUser(userId, stream);
          console.log(3);
        });

        // 상대방이 보낸 요청에 응답
        peer.on('call', (call) => {
          call.answer(stream); // 내 stream 보내주기
          call.on('stream', (userVideoStream) => {
            if (userVideoStream) {
              userVideo.current.srcObject = userVideoStream; // 상대방 stream 받아오기
              console.log(4);
            } else {
              window.location.reload(); // stream 안 받아진 경우 1번 피어 새로고침
            }
          });
        });

        // 유저랑 연결 끊겼을 때 다른 유저 stream을 close
        socket.on('user-disconnected', (userId) => {
          if (peers[userId]) peers[userId].close();
          window.location.reload();
        });
      });

    function connectToNewUser(userId, stream) {
      const call = peer.call(userId, stream); // call 요청
      call.on('stream', (userVideoStream) => {
        userVideo.current.srcObject = userVideoStream; // 상대방이 answer로 보낸 stream 받아오기
        console.log(userVideo);
      });
      peers[userId] = call;
    }
  }, []);

  return (
    <Container>
      <VideoWrapper>
        <video ref={myVideo} playsInline muted autoPlay />
        <video ref={userVideo} playsInline muted autoPlay />
      </VideoWrapper>
      <TranslatorWrap>
        <textarea />
        <button>번역하기</button>
        <div>번역한 내용</div>
      </TranslatorWrap>
      <Portal>{modalOn && <ReviewModal onClose={handleModal} />}</Portal>
    </Container>
  );
};

export default VideoChat;

const Container = styled.div`
  margin: 0 auto;
`;

const VideoWrapper = styled.div``;

const TranslatorWrap = styled.div``;
