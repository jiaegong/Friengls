import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { modalOn } from '../redux/modules/modal';

const VideoChat = () => {
  const dispatch = useDispatch();

  const myVideo = useRef(null);
  const userVideo = useRef(null); // userVideo ref말고 생성하는 걸로 해야 할지도..
  const peers = {};
  const roomId = '123'; // roomId params로
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

  useEffect(() => {
    const peer = new Peer();
    const socket = io('https://jg-jg.shop');

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        myVideo.current.srcObject = stream;

        // 유저 들어 옴
        if (peer?.id == null) {
          peer.on('open', (id) => {
            socket.emit('join-room', roomId, id);
          });
        } else {
          socket.emit('join-room', roomId, peer.id);
        }

        // 새로 들어 온 유저에게 call 요청
        socket.on('user-connected', (userId) => {
          const call = peer.call(userId, stream); // call 요청
          call.on('stream', (userVideoStream) => {
            userVideo.current.srcObject = userVideoStream; // 상대방이 answer로 보낸 stream 받아오기
          });
          call.on('close', () => {
            userVideo.current.remove(); // 상대방 나가면 비디오 remove
          });
          peers[userId] = call;
        });

        // 상대방이 보낸 요청에 응답
        peer.on('call', (call) => {
          call.answer(stream); // 내 stream 보내주기
          call.on('stream', (userVideoStream) => {
            userVideo.current.srcObject = userVideoStream; // 상대방 stream 받아오기
          });
        });

        // 유저랑 연결 끊겼을 때
        socket.on('user-disconnected', (userId) => {
          if (peers[userId]) peers[userId].close();
          socket.disconnect();
          peer.destroy();
        });
      });

    return () => {
      dispatch(modalOn());
    };
  }, []);

  // 통화 종료
  const leaveCall = () => {
    myVideo.current.remove();
    userVideo.current.remove();
  };

  // 오디오 온오프
  const AudioHandler = () => {
    myVideo.current.srcObject
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (audioOn) {
      setAudioOn(false);
    } else {
      setAudioOn(true);
    }
  };

  // 비디오 온오프
  const VideoHandler = () => {
    myVideo.current.srcObject
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (videoOn) {
      setVideoOn(false);
    } else {
      setVideoOn(true);
    }
  };

  return (
    <Container>
      <VideoContainer>
        <VideoWrapper>
          <video
            className="my-video"
            ref={myVideo}
            playsInline
            muted
            autoPlay
          />
          <video className="user-video" ref={userVideo} playsInline autoPlay />
        </VideoWrapper>
        <button onClick={AudioHandler}>오디오</button>
        <button onClick={VideoHandler}>비디오</button>
        <button onClick={leaveCall} className="leave-call">
          통화종료
        </button>
      </VideoContainer>
      <TranslatorWrap>
        <textarea className="translate-text" />
        <button className="translate-button">번역하기</button>
        <div className="translate-result">번역한 내용</div>
      </TranslatorWrap>
    </Container>
  );
};

export default VideoChat;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px auto;
  width: 80%;
  height: 500px;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 20px;
  padding: 20px;
  border: 2px solid #171b78;

  .leave-call {
    width: 300px;
    background-color: #171b78;
    color: #fff;
    padding: 20px;
  }
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 380px;

  .my-video {
    width: 400px;
    height: 300px;
    background-color: #f9f9f9;
    border-radius: 10px;
  }

  .user-video {
    width: 400px;
    height: 300px;
    background-color: #f9f9f9;
    border-radius: 10px;
  }
`;

const TranslatorWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;

  .translate-text {
    width: 100%;
    height: 100%;
    outline-color: #171b78;
    border: 1px solid #171b78;
  }

  .translate-button {
    width: 100px;
    background-color: #171b78;
    color: #fff;
    padding: 10px;
  }

  .translate-result {
    width: 100%;
    height: 100%;
    border: 1px solid #171b78;
  }
`;
