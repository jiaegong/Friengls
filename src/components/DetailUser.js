import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { actionCreators as likeActions } from '../redux/modules/like';
import MyPageModal from './MyPageModal';
import { Profile, OpenToggle, CloseToggle } from '../image/index';
import { Buttons } from '../elements/index';
import { useTranslation } from 'react-i18next';
import { getCookie } from '../shared/Cookie';

const DetailUser = (props) => {
  const { t } = useTranslation();
  const { userInfo } = props;
  const dispatch = useDispatch();

  const urlCheck = props.props.match.url;
  const tutorName = props.props.match.params.userName;
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
  const tagList = userInfo.tag ? userInfo.tag.split(',') : null;

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

  // console.log(getCookie('token'));

  return (
    <Container>
      <ImageBox>
        <UserImgWrap>
          <img
            src={userInfo.userProfile ? userInfo.userProfile : Profile}
            alt="userProfile"
          />
        </UserImgWrap>
        {decodeURI(window.location.pathname) ===
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
            {t('edit my profile')}
          </Buttons>
        )}
        {modalOn && <MyPageModal onClose={handleModal} userInfo={userInfo} />}
      </ImageBox>
      <UserInfoBox>
        <UserTitle>
          <p>{userInfo.userName}</p>
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
        </Like>
        {userInfo.contents &&
          (contents ? (
            <ContentsButton
              onClick={() => {
                setContents('');
              }}
            >
              <div>
                <img src={CloseToggle} alt="CloseContents" />
              </div>
              {t('close self-introduction')}
            </ContentsButton>
          ) : (
            <ContentsButton
              onClick={() => {
                setContents(userInfo.contents);
              }}
            >
              <div>
                <img src={OpenToggle} alt="openContents" />
              </div>
              {t('open self-introduction')}
            </ContentsButton>
          ))}
        {/* 자기소개, 한줄소개 없을 경우 띄우기 */}
        {userInfo.comment === '' &&
          userInfo.contents === '' &&
          userInfo.tag === '' && <NoInfoBox>작성된 내용이 없습니다.</NoInfoBox>}
      </UserInfoBox>
    </Container>
  );
};

export default DetailUser;

const Container = styled.div`
  width: 88%;
  /* max-width: 1280px; */
  /* min-height: 520px; */
  margin: 70px auto;
  padding-bottom: 50px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #c4c4c4;
`;

const ImageBox = styled.div`
  margin-right: 50px;
`;

const UserImgWrap = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;

const UserInfoBox = styled.div`
  width: 100%;
  position: relative;
`;

const UserTitle = styled.div`
  margin-bottom: 20px;
  p {
    display: inline-block;
    font-size: 22px;
    font-weight: 700;
    margin-right: 30px;
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
  letter-spacing: 1px;
`;

const ContentsBox = styled.div`
  width: 100%;
  // min-height: 100px;
  margin-bottom: 30px;
  padding: 0px 10px;
  border-left: 4px solid #000000;
  font-size: 16px;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: 1px;
`;

const Tags = styled.div`
  // width: 100%; //1
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
// 자기소개 토글
const ContentsButton = styled.button`
display: flex;  
  position: absolute;
  right: 30px;
  top: 50px;
  cursor: pointer;
  font-size: 16px;
  background: transparent;
  border: none;
  div {
    width: 30px;
  }
  img {
    width: 100%
    height: 100%
  }
`;
// 유저정보가 없을 때
const NoInfoBox = styled.div`
  text-align: center;
  font-size: 20px;
`;
