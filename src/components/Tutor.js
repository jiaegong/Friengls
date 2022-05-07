import React from 'react';
import { Flex, Image, Text } from '../elements/index';

const Tutor = (props) => {
  return (
    <Flex>
      <Flex>{/* <Image src={props.userProfile} /> */}</Flex>
      <Flex>
        <Text>{props.userName}</Text>
        <Text>{props.contents}</Text>
        <Flex>{props.tag}</Flex>
      </Flex>
    </Flex>
  );
};

export default Tutor;
