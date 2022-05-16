import React, { useEffect } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileMedium } from '../image';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { actionCreators as likeActions } from '../redux/modules/like';
import { getCookie } from '../shared/Cookie';

const DetailUser = (props) => {
  const { detailInfo } = props; // 지금 유저 정보 안 불러와짐...
  const dispatch = useDispatch();
  // like 누르기, 토큰 같이 보내기, likeList랑 tutor유저 리스트 인덱스랑 비교해서 같으면 넣기
  let isLiked = false; // 테스트차, 서버에서 보내주는 값으로 접속한 유저가 해당 페이지 튜터를 좋아요 했는지 체크하기
  // const tutorName = props.userName; // props로 유저 정보 받아서 넣기
  const token = getCookie('token');
  const tutorName = 'yoonha77';

  const like = () => {
    dispatch(likeActions.likeDB(token, tutorName));
  };

  const unlike = () => {
    dispatch(likeActions.unlikeDB(token, tutorName));
  };
  return (
    <div>
      <div>
        {isLiked ? (
          <AiFillHeart onClick={unlike} />
        ) : (
          <AiOutlineHeart onClick={like} />
        )}
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
            {/* <span>닉네임</span>: <span>{detailInfo.userName}</span> */}
          </TextInfo>
          <TextInfo>
            {/* <span>한 줄 소개</span>: <span>{detailInfo.comment}</span> */}
          </TextInfo>
          <TextInfo>
            {/* <span>태그</span>: <span>{detailInfo.tag}</span> */}
          </TextInfo>
          <TextInfo>
            <span>구사 가능 언어</span>:{' '}
            <span>
              {/* {detailInfo.language1},{detailInfo.language2}, */}
              {/* {detailInfo.language3} */}
            </span>
          </TextInfo>
        </div>
      </UserInfoBox>
      <div>
        <h2>자기소개</h2>
        {/* <TextInfo>{detailInfo.contents}</TextInfo> */}
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
