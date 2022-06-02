import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Swal from 'sweetalert2';

// 컴포넌트
import MyPageModal from './MyPageModal';

// 모듈
import { actionCreators as likeActions } from '../redux/modules/like';

// 아이콘
import { Button } from '../elements/index';
import { Profile, OpenToggle, CloseToggle } from '../asset/image/index';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const DetailUser = (props) => {
  const { t } = useTranslation();
  const { userInfo } = props;
  const dispatch = useDispatch();

  const tutorName = props.props.match.params.userName;
  const isLike = useSelector((state) => state.like.isLike);
  //현재 페이지에 접속한 유저
  const currentUser = useSelector((state) => state.user.info);
  // 좋아요 상태 확인, 좋아요 누르기
  useEffect(() => {
    dispatch(likeActions.isLikeDB(tutorName));
  }, []);

  const like = () => {
    if (currentUser.isTutor === 1) {
      new Swal(t("tutor can't do like"));
      return;
    }
    if (currentUser.userName === userInfo.userName) {
      new Swal(t("you can't do like on your own profile"));
      return;
    }

    dispatch(likeActions.likeDB(tutorName));
  };

  const unlike = () => {
    dispatch(likeActions.unlikeDB(tutorName));
  };
  // 자기소개 열기, 닫기
  const [contents, setContents] = useState(true);

  // 태그목록 배열로 변환
  const tagList = userInfo.tag ? userInfo.tag.split(',') : null;

  //마이페이지모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  //유저인포없을 때
  if (!userInfo) {
    return null;
  }

  return (
    <Container>
      <InfoContainer>
        {/* 프로필이미지 */}
        <ImageBox>
          <UserImgWrap userProfile={userInfo.userProfile ? true : false}>
            <img
              src={userInfo.userProfile ? userInfo.userProfile : Profile}
              alt="userProfile"
            />
          </UserImgWrap>
          {/* 마이페이지일 경우 프로필수정버튼 보이기 */}
          {currentUser.userName === userInfo.userName && (
            <Button
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
            </Button>
          )}
          {/* 수정버튼 누르면 모달 열리기 */}
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

          <Tags>
            {tagList?.map((tag, index) => (
              <span key={tag + index}>{tag}</span>
            ))}
          </Tags>
          <Like
            isTutor={currentUser.isTutor === 0}
            isDetailPage={currentUser.userName !== userInfo.userName}
          >
            {isLike ? (
              <AiFillHeart size="25px" onClick={unlike} />
            ) : (
              <AiOutlineHeart size="25px" onClick={like} />
            )}
          </Like>
          {userInfo.contents && contents ? (
            <ContentsButton
              onClick={() => {
                setContents(false);
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
                setContents(true);
              }}
            >
              <div>
                <img src={OpenToggle} alt="openContents" />
              </div>
              {t('open self-introduction')}
            </ContentsButton>
          )}
          {/* 자기소개, 한줄소개 없을 경우 띄우기 */}
          {userInfo.comment === '' &&
            userInfo.contents === '' &&
            userInfo.tag === '' && <NoInfoBox>{t('empty')}</NoInfoBox>}
        </UserInfoBox>
      </InfoContainer>
      {contents && (
        <ContentsWrap>
          <div>{userInfo.contents}</div>
        </ContentsWrap>
      )}
    </Container>
  );
};

export default DetailUser;

const Container = styled.div`
  width: 90%;
  /* max-width: 1280px; */
  /* min-height: 520px; */
  margin: 70px auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const InfoContainer = styled.div`
  display: flex;
`;

const ImageBox = styled.div`
  margin-right: 50px;
`;

const UserImgWrap = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  background: #80808024;
  img {
    width: 100%;
    height: 100%;
    object-fit: ${(props) => (props.userProfile ? 'cover' : 'contain')};
  }
`;

const UserInfoBox = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const UserTitle = styled.div`
  margin-bottom: 40px;
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
  margin-bottom: 40px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
`;

const Tags = styled.div`
  width: 85%;

  span {
    display: inline-block;
    font-size: 14px;
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
  right: 20px;
  top: 5px;
  cursor: ${(props) =>
    props.isTutor && props.isDetailPage ? 'pointer' : 'default'};
`;

const ContentsWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  div {
    width: 910px;
    padding: 0 12px;
    border-left: 4px solid #000000;
    font-size: 16px;
    font-weight: 500;
    line-height: 40px;
    letter-spacing: 1px;
  }
`;
// 자기소개 토글
const ContentsButton = styled.button`
  display: flex;
  position: absolute;
  right: 20px;
  bottom: 30px;
  cursor: pointer;
  font-size: 16px;
  background: transparent;
  border: none;
  div {
    width: 30px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
// 유저정보가 없을 때
const NoInfoBox = styled.div`
  text-align: center;
  font-size: 20px;
`;
