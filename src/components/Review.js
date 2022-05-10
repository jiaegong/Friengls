import React from 'react';
import { Flex, Image, Text, Input } from '../elements/index';

const Review = (props) => {
  return (
    <Flex
      styles={{
        width: '100%',
        height: '200px',
        padding: '30px',
        border: '1px solid black',
      }}
    >
      <Image shape="circle" src={props.src} />
      <Flex styles={{ flexDirection: 'column' }}>
        <Text styles={{ width: '100%' }}>{props.userName}작성자 아이디</Text>
        <Text styles={{ width: '100%' }}>{props.tutorName}선생님</Text>
        <Flex styles={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          {Array.from({ length: 5 }, (c, idx) => {
            return (
              <Flex
                key={idx}
                styles={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '30px',
                  margin: '5px',
                  backgroundColor: props.rate < idx + 1 ? '#ddd' : '#000',
                }}
              />
            );
          })}
        </Flex>
        <Input
          value={props.text}
          multiLine
          styles={{ width: '100%', height: '100px' }}
        />
      </Flex>
    </Flex>
  );
};

export default Review;
