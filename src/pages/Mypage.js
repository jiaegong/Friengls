import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { Flex, Text, Input, Button } from '../elements/index';

const Mypage = () => {
  const videoChatHandler = (roomName) => {
    // const id = userId
    // history.push(`/videochat/${id}`);
  };

  return (
    <>
      {/* 예약리스트 맵 돌리기 */}
      <Flex styles={{ border: '1px solid black', width: '300px' }}>
        <Flex styles={{ justifyContent: 'flex-start' }}>
          <Text>선생님 이름</Text>
          <Text>시간</Text>
        </Flex>
        <Button onClick={videoChatHandler}>Video Call</Button>
      </Flex>
    </>
  );
};

export default Mypage;
