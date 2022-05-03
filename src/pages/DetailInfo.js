import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

const DetailInfo = (props) => {
  // 사진업로드: formdata
  // 태그: onSpace 같은 것 찾아보기
  // 사용언어는 어떻게 하지?
  // 폼데이터에 데이터 저장하려면 useState값으로 저장해야 하나?

  return (
    <Container>
      <Grid>
        <Div>미리보기</Div>
        <input type="file" />
      </Grid>
      <Grid>
        사용하는 언어1(필수)
        <select>
          <option>한국어</option>
        </select>
      </Grid>
      <Grid>
        사용하는 언어2
        <select>
          <option>영어</option>
        </select>
      </Grid>
      <Grid>
        사용하는 언어3
        <select>
          <option>일어</option>
        </select>
      </Grid>
      <Grid>자기소개</Grid>
      <Grid>한 줄 소개</Grid>
      <Grid>태그</Grid>
      <Grid>선생님인가요?</Grid>
      <Grid>선생님 일 때 가능시간</Grid>
    </Container>
  );
};

const Container = styled.div`
  width: 20vw;
  margin: auto;
`;

const Div = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background: red;
`;

const Grid = styled.div`
  margin: 10px;
`;
export default DetailInfo;
