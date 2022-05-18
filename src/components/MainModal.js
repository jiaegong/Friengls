import React from 'react';
import Portal from './Portal';
import styled from 'styled-components';
import { Flex, Image, Text } from '../elements/index';

const MainModal = (props) => {
  return (
    <Background>
      <Content>
        <Flex
          styles={{
            flexDirection: 'column',
            width: '200px',
            height: '300px',
            background: '#f9f9f9',
          }}
        >
          <Image src={props.userProfile} />
          <Text>{props.userName}</Text>
          <Text>{props.comment}</Text>
          <Text>{props.language}</Text>
          <Flex>{props.tag}</Flex>
        </Flex>
      </Content>
    </Background>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const Content = styled.div`
  width: 95%;
  height: 100%;
  margin-top: 70px;
  position: relative;
  overflow: auto;
  background-color: #141414;
`;

export default MainModal;
