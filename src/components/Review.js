import React from 'react';
import { Flex, Image, Text } from '../elements/index';

const Review = () => {
  const rate = '5'; // 평점 불러와서 넣기
  return (
    <Flex>
      <Image shape="circle" />
      <Text>작성자 아이디</Text>
      <Text>선생님 이름</Text>
      <Flex styles={{ flexDirection: 'row' }}>
        {Array.from({ length: 5 }, (c, idx) => {
          return (
            <Flex
              styles={{
                width: '30px',
                height: '30px',
                borderRadius: '30px',
                margin: '5px',
                backgroundColor: rate < idx + 1 ? '#ddd' : '#000',
              }}
            />
          );
        })}
      </Flex>
      <Text>리뷰</Text>
    </Flex>
  );
};

export default Review;
