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
  const tutorName = userInfo.userName;
  const isLike = useSelector((state) => state.like.isLike);

  // 좋아요 상태 확인, 좋아요 누르기
  useEffect(() => {
    dispatch(likeActions.isLikeDB(tutorName));
  }, []);

  const like = () => {
    dispatch(likeActions.likeDB(tutorName));
  };

  const unlike = () => {
    dispatch(likeActions.unlikeDB(tutorName));
  };

  // 자기소개 열기, 닫기
  const [contents, setContents] = useState('');

  // 태그목록 배열로 변환
  const tagList = userInfo.tag ? userInfo.tag.split(' ,') : null;

  //마이페이지모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  //유저인포없을 때
  //to do: 스피너
  if (!userInfo) {
    return null;
  }

  return (
    <UserInfoBox>
      <ImageBox>
        <UserImgWrap>
          <img className="userImg" src={userInfo.userProfile} alt="" />
        </UserImgWrap>
        {window.location.pathname ===
          `/mypage/${userInfo.userName}/${userInfo.isTutor}` && (
          <Buttons
            _onClick={handleModal}
            styles={{
              // margin: '20px 10px 0',
              margin: '20px 20px 0',
              width: '140px',
              height: '44px',
              fontSize: '16px',
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
        <UserTitle>
          <p className="tutorName">{userInfo.userName}</p>
          {userInfo.language1 ? <span>{userInfo.language1}</span> : ''}
          {userInfo.language2 ? <span>/ {userInfo.language2}</span> : ''}
          {userInfo.language3 ? <span>/ {userInfo.language3}</span> : ''}
        </UserTitle>
        <Comment>{userInfo.comment}</Comment>
        <ContentsBox>{contents}</ContentsBox>
        <Tags>
          {tagList?.map((tag, index) => (
            <span key={tag + index}>{tag}</span>
          ))}
        </Tags>
        <Like>
          {isLike ? (
            <AiFillHeart onClick={unlike} />
          ) : (
            <AiOutlineHeart onClick={like} />
          )}
          {userInfo.like}
        </Like>
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
  width: 160px;
  height: 160px;
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
  right: 30px;
  top: 0;
`;

const ContentsButton = styled.button`
  position: absolute;
  right: 30px;
  top: 66px;
  top: 50px;
  font-size: 16px;
  background: transparent;
  border: none;
`;
