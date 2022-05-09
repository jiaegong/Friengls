import React from 'react';
import { Flex, Image, Text } from '../elements/index';

const Tutor = (props) => {
  return (
    <Flex
      styles={{ width: '300px', height: '200px', border: '1px solid black' }}
    >
      <Flex>{/* <Image src={props.userProfile} /> */}</Flex>
      <Flex styles={{ flexDirection: 'column' }}>
        <Text>{props.userName}</Text>
        <Text>{props.comment}</Text>
        <Flex>{props.tag}</Flex>
      </Flex>
    </Flex>
  );
};

Tutor.defaultProps = {
  userName: '다람',
  userProfile:
    'https://1.bp.blogspot.com/-jd26syUy6_s/XqPj6jt4eWI/AAAAAAAAMnU/AJ4mxNl2BPwrGOtInwf1Kz-PqPL14dS4wCLcBGAsYHQ/s1600/%25EB%258B%25A4%25EB%259E%258C%2B%25E3%2582%25B0%25E3%2583%259F%2BPoppy.png',
  comment: '안녕하세요!',
  tag: '드라마',
};

export default Tutor;
