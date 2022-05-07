import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';

const Mypage = () => {
  const videoChatHandler = (roomName) => {
    //   const id = userId
    //   history.push(`/videochat/${id}`);
  };
  const userInfo = useSelector((state) => state.user.info);
  console.log(userInfo);

  return (
    <>
      {/* 예약리스트 맵 돌리기 */}
      <List>
        <p>공지애 하니또</p>
        <p>2022-04-30 17시</p>
        <button onClick={videoChatHandler}>채팅하기</button>
      </List>
    </>
  );
};

const List = styled.div`
  border: 1px solid black;
  border-radius: 10px;
`;

export default Mypage;
