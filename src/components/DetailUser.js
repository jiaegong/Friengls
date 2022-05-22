import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { actionCreators as likeActions } from '../redux/modules/like';
import { getCookie } from '../shared/Cookie';
import MyPagePwdModal from '../components/MyPagePwdModal';
import Portal from '../shared/Portal';
import { Buttons } from '../elements/index';

const DetailUser = (props) => {
  const { userInfo } = props;
  const dispatch = useDispatch();

  const urlCheck = props.props.match.url;
  // like 누르기, 토큰 같이 보내기, likeList랑 tutor유저 리스트 인덱스랑 비교해서 같으면 넣기
  let isLiked = true; // 테스트차, 서버에서 보내주는 값으로 접속한 유저가 해당 페이지 튜터를 좋아요 했는지 체크하기
  const tutorName = props.userName; // props로 유저 정보 받아서 넣기
  const token = getCookie('token');

  // 자기소개 열기, 닫기
  const [contents, setContents] = useState('');
  // 태그목록 배열로 변환
  const tagList = userInfo.tag ? userInfo.tag.split(' ,') : null;

  const like = () => {
    dispatch(likeActions.likeDB(token, tutorName));
  };

  const unlike = () => {
    dispatch(likeActions.unlikeDB(token, tutorName));
  };

  //마이페이지모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  //유저인포없을 때
  //to do: 스피너
  if (!userInfo) {
    return <></>;
  }

  return (
    <UserInfoBox>
      {/* 프로필사진 + 모달버튼 + 모달컴포넌트 */}
      <ImageBox>
        <UserImgWrap>
          <img className="userImg" src={userInfo.userProfile} alt="" />
        </UserImgWrap>
        {window.location.pathname ===
          `/mypage/${userInfo.userName}/${userInfo.isTutor}` && (
          <Buttons
            _onClick={handleModal}
            styles={{
              margin: '40px 0 0 0',
              width: '240px',
              height: '42px',
              fontSize: '20px',
            }}
          >
            내 프로필 수정
          </Buttons>
        )}
        {modalOn && (
          <MyPagePwdModal onClose={handleModal} userInfo={userInfo} />
        )}
      </ImageBox>
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
          {tagList?.map((tag, index) => (
            <span key={tag + index}>{tag}</span>
          ))}
        </Tags>
        {/* 팔로우 */}
        <Like>
          {/* {isLiked ? (
            <AiFillHeart onClick={unlike} />
          ) : (
            <AiOutlineHeart onClick={like} />
          )} */}
          <AiOutlineHeart className="likeIcon" />
          {userInfo.like}
        </Like>
        {/* 자기소개버튼: 자기소개 있을 때 열기/접기 가능 */}
        {userInfo.contents &&
          (contents ? (
            <ContentsButton
              onClick={() => {
                setContents('');
              }}
            >
              {/* 🔽 */}
              ⬆️ 자기소개 닫기
            </ContentsButton>
          ) : (
            <ContentsButton
              onClick={() => {
                setContents(userInfo.contents);
              }}
            >
              {/* 🔽 */}⬇ 자기소개 열기
            </ContentsButton>
          ))}
      </div>
    </UserInfoBox>
  );
};

export default DetailUser;

const UserInfoBox = styled.div`
  width: 100%;
  /* width: 90%; */
  /* max-width: 1280px; */
  /* min-height: 520px; */
  margin: auto;
  display: flex;
  justify-content: space-around;
  justify-content: center;
  padding: 120px 20px 100px;
  padding: 120px 20px 60px;
  border-bottom: 1px solid #c4c4c4;

  .userInfo {
    width: 80%;
    position: relative;
  }
`;

const ImageBox = styled.div`
  margin-right: 40px;
`;

const UserImgWrap = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;

  .userImg {
    width: 100%;
  }
`;

const UserTitle = styled.div`
  margin-bottom: 20px;
  /* background-color: red; */

  .tutorName {
    display: inline-block;
    font-size: 22px;
    font-weight: 600;
    margin-right: 30px;
    /* background-color: blue; */
  }

  span {
    display: inline-block;
    font-size: 16px;
    margin: 0 5px;
    color: #5e5e5e;
  }
`;

const Comment = styled.p`
  width: 80%;
  min-height: 80px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
  line-height: 40px;
  letter-spacing: 1px;
`;

const ContentsBox = styled.div`
  width: 90%;
  /* min-height: 100px; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 1px;
  border-left: 4px solid #000000;
  /* padding: 6px 10px; */
  margin-bottom: 30px;
  padding: 0px 10px;
`;

const Tags = styled.div`
  width: 1085px;
  width: 100%; //1
  width: 85%; //2

  span {
    display: inline-block;
    font-size: 14px;
    /* padding: 12px 22px; */
    padding: 8px 12px;
    margin-bottom: 10px;
    margin-right: 6px;
    border: 1px solid #959595;
    border-radius: 40px;
    box-shadow: 0px 2px 6px 0px #00000040;
    background-color: #fff;
  }
`;

const Like = styled.div`
  position: absolute;
  right: 0;
  /* right: 60px; */
  right: 30px;
  top: 0;
  font-size: 18px;

  .likeIcon {
    font-size: 22px;
    padding-top: 6px;
    margin-right: 6px;
  }
`;

const ContentsButton = styled.button`
  position: absolute;
  right: 0;
  /* right: 60px; */
  right: 30px;
  top: 66px;
  top: 50px;
  font-size: 16px;
  background: transparent;
  border: none;
`;
