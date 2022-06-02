import React, { useState } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';

// 컴포넌트
import Portal from '../shared/Portal';
import TutorModal from './TutorModal';

// 아이콘
import { Profile, ModalBtnImg } from '../asset/image/index';

const TutorCard = ({ tutor, urlCheck }) => {
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <Card
      className="card"
      onClick={() => {
        history.push(`/detail/${tutor.userName}/1`);
      }}
    >
      <div className="userImgWrap">
        <img
          className="user_img"
          src={tutor.userProfile ? tutor.userProfile : Profile}
          // src={'https://via.placeholder.com/300x200'}
          alt="tutor Img"
        />
      </div>
      <div className="user_info">
        <p className="userName">{tutor.userName}</p>
        {/* {urlCheck ? <p>search</p> : <p>main</p>} */}
        {/* <p className="userContents">{tutor.contents}</p> */}
        <p className="userTag">{tutor.tag}</p>
      </div>
      <ModalBtn>
        <div
          className="modalBtn"
          onClick={(e) => {
            e.stopPropagation();
            handleModal();
          }}
        />
      </ModalBtn>
      <Portal>
        {modal && <TutorModal tutor={tutor} onClose={handleModal} />}
      </Portal>
    </Card>
  );
};

export default TutorCard;

const Card = styled.div`
  width: 77%;
  height: 270px;
  height: auto;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: 0px 2px 8px 0px #00000030;

  border-radius: 15px;

  .userImgWrap {
    width: 100%;
    height: 300px;

    overflow: hidden;
    background-color: #c8c8c8a6;

    .user_img {
      width: 100%;
      height: 100%;
    }
  }

  .user_info {
    width: 100%;
    height: 80px;
    height: 70px;
    padding: 7px 20px;
    position: absolute;
    bottom: 0;
    opacity: 0.8;

    background: #eee;

    .userName {
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 1px;
      margin-top: 5px;
    }

    /* .userContents {
      width: 88%;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 1px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    } */

    .userTag {
      width: 80%;
      font-size: 12px;
      margin-top: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
`;

const ModalBtn = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;

  .modalBtn {
    width: 32px;
    height: 32px;
    font-size: 30px;
    cursor: pointer;
    background: url('${ModalBtnImg}');
    background-size: cover;
    background-position: center;

    &:hover {
      color: #595959;
    }
  }
`;
