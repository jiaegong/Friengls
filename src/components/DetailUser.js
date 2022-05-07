import React, { useEffect } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileMedium } from '../image';

const DetailUser = (props) => {
  const { detailInfo } = props;
  console.log(detailInfo);

  return (
    <div>
      <div>
        <button>좋아요</button>
        <button
          onClick={() => {
            history.push('/mypage');
          }}
        >
          수정
        </button>
      </div>
      <UserInfoBox>
        <ImageBox>
          <Image src={ProfileMedium} />
        </ImageBox>
        <div>
          <TextInfo>
            <span>닉네임</span>: <span>닉네임불러오기</span>
          </TextInfo>
          <TextInfo>
            <span>한 줄 소개</span>: <span>닉네임불러오기</span>
          </TextInfo>
          <TextInfo>
            <span>태그</span>: <span>태그불러오기</span>
          </TextInfo>
          <TextInfo>
            <span>구사 가능 언어</span>: <span>언어불러오기</span>
          </TextInfo>
        </div>
      </UserInfoBox>
      <div>
        <h2>자기소개</h2>
        <TextInfo>자기소개 불러오기</TextInfo>
      </div>

      {/* like 버튼, 나중에 아이콘 찾아서 바꿔 놓기, like 상태 값에 따라서 채워진 하트/빈 하트 */}
      {/* {isLiked? <div
            onClick={like}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '30px',
              margin: '5px',
              backgroundColor: '#ddd'
            }}
          /> : <div
          onClick={unLike}
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '30px',
            margin: '5px',
            backgroundColor: '#ffeb3b'
          }}
        />} */}
    </div>
  );
};

const UserInfoBox = styled.div`
  display: flex;
`;

const ImageBox = styled.div`
  margin: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const TextInfo = styled.p`
  margin-top: 10px;
`;

export default DetailUser;
