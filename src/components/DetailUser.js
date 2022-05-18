import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { actionCreators as likeActions } from '../redux/modules/like';
import { getCookie } from '../shared/Cookie';

const DetailUser = (props) => {
  const { userInfo } = props;
  const dispatch = useDispatch();

  const urlCheck = props.props.match.url;
  // like 누르기, 토큰 같이 보내기, likeList랑 tutor유저 리스트 인덱스랑 비교해서 같으면 넣기
  let isLiked = true; // 테스트차, 서버에서 보내주는 값으로 접속한 유저가 해당 페이지 튜터를 좋아요 했는지 체크하기
  const tutorName = props.userName; // props로 유저 정보 받아서 넣기
<<<<<<< HEAD

  // 자기소개 열기, 닫기
  const [contents, setContents] = useState('');
  // 태그목록 배열로 변환
  let tagList = userInfo.tag.split(' ,');
=======
  const token = getCookie('token');

  const { detailInfo } = props;
  let tags = detailInfo.tag;
  let [tag1, tag2, tag3] = tags.split(',');
>>>>>>> backUpMaster

  const like = () => {
    dispatch(likeActions.likeDB(token, tutorName));
  };

  const unlike = () => {
    dispatch(likeActions.unlikeDB(token, tutorName));
  };
  return (
<<<<<<< HEAD
    <UserInfoBox>
      <UserImgWrap>
        <img className="userImg" src={userInfo.userProfile} alt="" />
      </UserImgWrap>
      <div className="userInfo">
        {/* 유저닉네임 + 사용언어 */}
        <UserTitle>
          <p className="tutorName">{userInfo.userName}</p>
          {userInfo.language1 ? <span>{userInfo.language1}</span> : ''}
          {userInfo.language2 ? <span>/ {userInfo.language2}</span> : ''}
          {userInfo.language3 ? <span>/ {userInfo.language3}</span> : ''}
        </UserTitle>
        {/* 한 줄 소개 */}
        <Comment>{userInfo.comment}</Comment>
        {/* 자기 소개 */}
        <ContentsBox>{contents}</ContentsBox>
        {/* 태그 */}
        <Tags>
          {tagList.map((tag, index) => (
            <span key={tag + index}>{tag}</span>
          ))}
        </Tags>
        {/* 팔로우 */}
        <Like>
          <AiOutlineHeart className="likeIcon" />
          {userInfo.like}
        </Like>
        {/* 자기소개버튼: 자기소개 있을 때 열기/접기 가능 */}
        {userInfo.contents ? (
          contents ? (
            <ContentsButton
              onClick={() => {
                setContents('');
              }}
            >
              🔽자기소개 닫기
            </ContentsButton>
          ) : (
            <ContentsButton
              onClick={() => {
                setContents(userInfo.contents);
              }}
            >
              🔽자기소개 열기
            </ContentsButton>
          )
        ) : (
          <></>
        )}
      </div>
    </UserInfoBox>
=======
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
        <UserImgWrap>
          <img className="userImg" src={detailInfo.userProfile} alt="" />
        </UserImgWrap>
        <div className="userInfo">
          <UserTitle>
            <p className="tutorName">{detailInfo.userName}</p>
            <span>{detailInfo.language1}</span>/
            <span>{detailInfo.language2}</span>/
            <span>{detailInfo.language3}</span>
          </UserTitle>
          <Contests>{detailInfo.comment}</Contests>
          <Tags>
            {tag1 && <span>{tag1}</span>}
            {tag2 && <span>{tag2}</span>}
            {tag3 && <span>{tag3}</span>}
          </Tags>
          <Like>
            <AiOutlineHeart className="likeIcon" />
            {detailInfo.like}
          </Like>
        </div>
      </UserInfoBox>
      {urlCheck ? (
        ''
      ) : (
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
      )}
    </div>
>>>>>>> backUpMaster
  );
};

export default DetailUser;

const UserInfoBox = styled.div`
  width: 100%;
  min-height: 541px;
  display: flex;
  justify-content: space-around;
  padding-top: 138px;
  padding-bottom: 80px;
  border-bottom: 1px solid #c4c4c4;

  .userInfo {
    width: 76%;
    position: relative;
  }
`;

const UserImgWrap = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  overflow: hidden;

  .userImg {
    width: 240px;
    height: 240px;
  }
`;

const UserTitle = styled.div`
  margin-bottom: 20px;

  .tutorName {
    display: inline-block;
    font-size: 34px;
    font-weight: 600;
    margin-right: 90px;
  }

  span {
    display: inline-block;
    margin: 0 5px;
    font-size: 26px;
    color: #5e5e5e;
  }
`;

const Comment = styled.p`
  width: 80%;
  font-size: 30px;
  margin-bottom: 20px;
  line-height: 40px;
`;

const ContentsBox = styled.div`
  margin-bottom: 40px;
  padding-left: 20px;
  font-size: 30px;
  border-left: 4px solid #000000;
`;

const Tags = styled.div`
  width: 1085px;

  span {
    display: inline-block;
    font-size: 26px;
    padding: 12px 22px;
    margin-bottom: 20px;
    margin-right: 10px;
    border: 2px solid #959595;
    border-radius: 40px;
    box-shadow: 0px 2px 6px 0px #00000040;
    background-color: #fff;
  }
`;

const Like = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  font-size: 30px;

  .likeIcon {
    font-size: 32px;
    padding-top: 5px;
    margin-right: 16px;
  }
`;

const ContentsButton = styled.button`
  position: absolute;
  right: 0;
  top: 66px;
  font-size: 26px;
  background: transparent;
  border: none;
`;
