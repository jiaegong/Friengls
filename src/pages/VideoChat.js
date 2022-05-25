import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import styled from 'styled-components';
import {
  BsMicFill,
  BsFillCameraVideoFill,
  BsFillTelephoneOutboundFill,
  BsMicMuteFill,
  BsCameraVideoOffFill,
} from 'react-icons/bs';
import { GoPlus, GoX } from 'react-icons/go';
import { MdOutlineRateReview } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Translator from '../components/Translator';
import Chat from '../components/Chat';
import Portal from '../shared/Portal';
import ReviewModal from '../components/ReviewModal';

const VideoChat = (props) => {
  const [modalOn, setModalOn] = useState(false);
  const [optionOn, setOptionOn] = useState(false);

  const modalHandler = () => {
    setModalOn(!modalOn);
  };

  const optionHandler = () => {
    setOptionOn(!optionOn);
  };

  const myVideo = useRef();
  const userVideo = useRef();
  const peers = {};
  const roomId = props.match.params.roomName;
  const userName = useSelector((state) => state.user.info); // props로 넘겨주는 게 더 좋을 거 같음
  const userId = userName.userName;
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

  const socket = io('https://hjg521.link', { transports: ['websocket'] });

  useEffect(() => {
    const peer = new Peer();
    // const socket = io('https://hjg521.link', { transports: ['websocket'] });

    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false }) // 배포 전 true로
        .then((stream) => {
          myVideo.current.srcObject = stream;

          // 유저 들어 옴
          if (peer?.id == null) {
            peer.on('open', (id) => {
              socket.emit('join-room', roomId, id);
              console.log(1);
            });
          } else {
            socket.emit('join-room', roomId, peer.id);
            console.log(2);
          }

          // 새로 들어 온 유저에게 call 요청
          socket.on('user-connected', (userId) => {
            console.log(3, userId, stream, userVideo.current);
            if (userVideo.current) {
              const call = peer.call(userId, stream); // call 요청
              call.on('stream', (userVideoStream) => {
                console.log(4);
                userVideo.current.srcObject = userVideoStream; // 상대방이 answer로 보낸 stream 받아오기
              });
              call.on('close', () => {
                userVideo.current.remove(); // 상대방 나가면 비디오 remove
              });
              peers[userId] = call;
            }
          });

          // 상대방이 보낸 요청에 응답
          peer.on('call', (call) => {
            console.log(5);
            call.answer(stream); // 내 stream 보내주기
            call.on('stream', (userVideoStream) => {
              userVideo.current.srcObject = userVideoStream; // 상대방 stream 받아오기
            });
          });
        })
        .catch((err) => console.log(err));
    } else {
      // 마이페이지로 이동?
    }

    // 유저랑 연결 끊겼을 때
    socket.on('user-disconnected', (userId) => {
      if (peers[userId]) peers[userId].close();
      userVideo.current.remove();
      socket.disconnect();
      peer.destroy();
    });
  }, []);

  // 통화 종료
  const leaveCall = () => {
    myVideo.current.remove();
    userVideo.current.remove();
  };

  // 오디오 온오프
  const audioHandler = () => {
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
  const videoHandler = () => {
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
      <LeftWrap>
        <video className="user-video" ref={userVideo} playsInline autoPlay />
        <ChatWrap>
          <Chat socket={socket} roomId={roomId} userId={userId} />
        </ChatWrap>
        <OptionWrap>
          <GoPlus className="plus" size={25} onClick={optionHandler} />
        </OptionWrap>
        {optionOn && (
          <Options>
            <BsFillTelephoneOutboundFill
              className="leave-call"
              size={25}
              onClick={leaveCall}
            />
            <MdOutlineRateReview
              className="review"
              size={25}
              onClick={modalHandler}
            />
            <GoX className="x" size={25} onClick={optionHandler} />
          </Options>
        )}
      </LeftWrap>
      <Portal>{modalOn && <ReviewModal onClose={modalHandler} />}</Portal>
      <RightWrap>
        <TranslatorWrap>
          <Translator />
        </TranslatorWrap>
        <MyVideoWrap>
          <video
            className="my-video"
            ref={myVideo}
            playsInline
            muted
            autoPlay
          />
        </MyVideoWrap>
        <Controllers>
          {audioOn ? (
            <BsMicFill size={25} onClick={audioHandler} />
          ) : (
            <BsMicMuteFill size={25} onClick={audioHandler} />
          )}
          {videoOn ? (
            <BsFillCameraVideoFill size={25} onClick={videoHandler} />
          ) : (
            <BsCameraVideoOffFill size={25} onClick={videoHandler} />
          )}
        </Controllers>
      </RightWrap>
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
  min-height: 700px;
  gap: 20px;
`;

const LeftWrap = styled.div`
  position: relative;
  width: 800px;
  height: 600px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0px 2px 12px 0px #00000040;

  .user-video {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    border-radius: 10px;
  }
`;

const ChatWrap = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 999;
`;

const OptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  border-radius: 10px;
  background-color: #fff;
  width: 48px;
  height: 48px;
  padding: 10px;
  gap: 10px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 999;
  box-shadow: 0px 2px 12px 0px #00000040;

  .plus:hover {
    transition: 500ms ease-in-out;
    transform: rotate(90deg);
    color: #7f83ea;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  border-radius: 10px;
  background-color: #fff;
  width: 48px;
  height: 120px;
  padding: 10px;
  gap: 10px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
  box-shadow: 0px 2px 12px 0px #00000040;

  .leave-call {
    cursor: pointer;
  }
  .leave-call:hover {
    transform: scale(1.1);
    color: #7f83ea;
  }

  .review {
    cursor: pointer;
  }
  .review:hover {
    transform: scale(1.1);
    color: #7f83ea;
  }

  .x {
    cursor: pointer;
  }
  .x:hover {
    transition: 500ms ease-in-out;
    transform: rotate(90deg);
    color: #7f83ea;
  }
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  gap: 10px;
  position: relative;
`;

const TranslatorWrap = styled.div`
  box-shadow: 0px 2px 12px 0px #00000040;
  padding: 15px;
  border-radius: 10px;
  height: 100%;
`;

const MyVideoWrap = styled.div`
  box-shadow: 0px 2px 12px 0px #00000040;
  border-radius: 10px;
  width: 260px;
  height: 195px;

  .my-video {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    border-radius: 10px;
  }
`;

const Controllers = styled.div`
  display: flex;
  border-radius: 10px;
  padding: 10px;
  gap: 15px;
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 999;
  color: #fff;
`;
