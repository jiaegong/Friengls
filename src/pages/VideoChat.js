import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

// 컴포넌트
import Translator from '../components/Translator';
import ReviewModal from '../components/ReviewModal';
import Portal from '../shared/Portal';

// 아이콘
import {
  BsMicFill,
  BsFillCameraVideoFill,
  BsFillTelephoneOutboundFill,
  BsMicMuteFill,
  BsCameraVideoOffFill,
} from 'react-icons/bs';
import { GoPlus, GoX } from 'react-icons/go';
import { MdOutlineRateReview } from 'react-icons/md';
import { CgScreen } from 'react-icons/cg';

const VideoChat = (props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const tutorName = location.state;

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
  const connectionRef = useRef();
  const userStream = useRef();
  const peers = {};
  const roomId = props.match.params.roomName;
  const userName = useSelector((state) => state.user.info);
  const userId = userName.userName;
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

  const socket = io('https://jg-jg.shop', { transports: ['websocket'] });

  useEffect(() => {
    const peer = new Peer();
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true }) // 배포 전 true로
        .then((stream) => {
          myVideo.current.srcObject = stream;
          userStream.current = stream;

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
            if (call.peerConnection) {
              call.on('stream', (userVideoStream) => {
                userVideo.current.srcObject = userVideoStream; // 상대방이 answer로 보낸 stream 받아오기
              });
              call.on('close', () => {
                userVideo.current.remove(); // 상대방 나가면 비디오 remove
              });
              peers[userId] = call;
              connectionRef.current = call.peerConnection;
            }
          });

          // 상대방이 보낸 요청에 응답
          peer.on('call', (call) => {
            if (call) {
              call.answer(userStream.current); // 내 stream 보내주기
              call.on('stream', (userVideoStream) => {
                userVideo.current.srcObject = userVideoStream; // 상대방 stream 받아오기
              });
            }
            connectionRef.current = call.peerConnection;
          });
        })
        .catch((err) => console.log(err));
    } else {
      new Swal(t('please check your video and audio environment!'));
      history.goBack();
    }

    // 유저랑 연결 끊겼을 때
    socket.on('user-disconnected', (userId) => {
      if (peers[userId]) {
        peers[userId].close();
        userVideo.current.remove();
        socket.disconnect();
        peer.destroy();
      }
    });
  }, []);

  // 통화 종료
  const leaveCall = () => {
    myVideo.current.remove();
    userVideo.current.remove();
    connectionRef.current.destroy();
  };

  // 오디오 온오프
  const audioHandler = () => {
    myVideo.current.srcObject
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setAudioOn(!audioOn);
  };

  // 비디오 온오프
  const videoHandler = () => {
    myVideo.current.srcObject
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setVideoOn(!videoOn);
  };

  // 화면 공유
  const shareScreen = () => {
    navigator.mediaDevices
      .getDisplayMedia({
        video: { cursor: 'always' },
        audio: { echoCancellation: true, noiseSuppression: true },
      })
      .then((stream) => {
        myVideo.current.srcObject = stream; // 내 비디오 공유 화면으로 변경
        const videoTrack = stream.getVideoTracks()[0];
        connectionRef.current
          .getSenders()
          .find((sender) => sender.track.kind === videoTrack.kind)
          .replaceTrack(videoTrack);
        videoTrack.onended = function () {
          const screenTrack = userStream.current.getVideoTracks()[0];
          connectionRef.current
            .getSenders()
            .find((sender) => sender.track.kind === screenTrack.kind)
            .replaceTrack(screenTrack);
          stream.getTracks().forEach((track) => track.stop());
          myVideo.current.srcObject = userStream.current; // 내 비디오로 변경
        };
      });
  };

  return (
    <Container>
      <LeftWrap>
        <video className="user-video" ref={userVideo} playsInline autoPlay />
        {/* <ChatWrap>
          <Chat socket={socket} roomId={roomId} userId={userId} />
        </ChatWrap> */}
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
      <Portal>
        {modalOn && (
          <ReviewModal onClose={modalHandler} tutorName={tutorName} />
        )}
      </Portal>
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
          <CgScreen size={25} onClick={shareScreen} />
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
  box-shadow: 0px 2px 8px 0px #00000030;

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
  box-shadow: 0px 2px 8px 0px #00000030;

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
  box-shadow: 0px 2px 8px 0px #00000030;

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
  box-shadow: 0px 2px 8px 0px #00000030;
  padding: 15px;
  border-radius: 10px;
  height: 100%;
`;

const MyVideoWrap = styled.div`
  box-shadow: 0px 2px 8px 0px #00000030;
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
