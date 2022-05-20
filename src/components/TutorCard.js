import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { CgProfile } from 'react-icons/cg';
import Portal from '../shared/Portal';
import MainModal from './MainModal';
import modalBtnImg from '../image/modalBtn.png';

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
          src={tutor.userProfile}
          // src={'https://via.placeholder.com/300x200'}
          alt="#"
        />
      </div>
      <div className="user_info">
        <p className="userName">{tutor.userName}</p>
        {/* {urlCheck ? <p>search</p> : <p>main</p>} */}
        <p className="userContents">{tutor.contents}</p>
        <p className="userTag">{tutor.tag}</p>
      </div>
      <ModalBtn>
        {/* <CgProfile   <== 아이콘 클릭시 모달 나오게 하는 부분!
          className="modalBtn"
          onClick={(e) => {    <== 클릭 이벤트 이동시켜야됨!
            e.stopPropagation();
            handleModal();
          }}
        /> */}
        {/*  */}

        {/* <CgProfile className="modalBtn" /> */}
        {/* <div className="modalBtn"></div> */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleModal();
          }}
        >
          <svg
            className="icon"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.3333 10C10.3333 6.87043 12.8703 4.33337 16 4.33337C19.1296 4.33337 21.6666 6.87043 21.6666 10C21.6666 13.1297 19.1296 15.6667 16 15.6667C12.8703 15.6667 10.3333 13.1297 10.3333 10ZM16 6.33337C13.9749 6.33337 12.3333 7.975 12.3333 10C12.3333 12.0251 13.9749 13.6667 16 13.6667C18.025 13.6667 19.6666 12.0251 19.6666 10C19.6666 7.975 18.025 6.33337 16 6.33337Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.6666 19.6667C9.00977 19.6667 7.66663 21.0099 7.66663 22.6667V24.2511C7.66663 24.2752 7.68411 24.2958 7.70792 24.2997C13.1996 25.1963 18.8003 25.1963 24.292 24.2997C24.3158 24.2958 24.3333 24.2752 24.3333 24.2511V22.6667C24.3333 21.0099 22.9901 19.6667 21.3333 19.6667H20.8788C20.8437 19.6667 20.8087 19.6723 20.7753 19.6832L19.6213 20.06C17.2682 20.8284 14.7317 20.8284 12.3786 20.06L11.2246 19.6832C11.1912 19.6723 11.1563 19.6667 11.1211 19.6667H10.6666ZM5.66663 22.6667C5.66663 19.9053 7.9052 17.6667 10.6666 17.6667H11.1211C11.3671 17.6667 11.6116 17.7056 11.8454 17.782L12.9994 18.1588C14.9491 18.7954 17.0508 18.7954 19.0005 18.1588L20.1545 17.782C20.3884 17.7056 20.6328 17.6667 20.8788 17.6667H21.3333C24.0947 17.6667 26.3333 19.9053 26.3333 22.6667V24.2511C26.3333 25.2554 25.6054 26.1117 24.6143 26.2735C18.9092 27.205 13.0908 27.205 7.38566 26.2735C6.39447 26.1117 5.66663 25.2554 5.66663 24.2511V22.6667Z"
              fill="black"
            />
          </svg>
        </div>
      </ModalBtn>
      <Portal>
        {modal && <MainModal tutor={tutor} onClose={handleModal} />}
      </Portal>
    </Card>
  );
};

export default TutorCard;

const Card = styled.div`
  width: 300px;
  height: 400px;
  height: auto;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  border-radius: 15px;
  background: #c4c4c4;

  .userImgWrap {
    width: 300px;
    height: 300px;
    overflow: hidden;
    background-color: #aaa;
    .user_img {
      width: 100%;
      /* height: 100%; */
      /* width: 300px; */
      /* height: 300px; */
    }
  }

  .user_info {
    width: 100%;
    height: 100px;
    padding: 7px 20px;

    background: #eee;

    .userName {
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 1px;
      margin-bottom: 2px;
    }

    .userContents {
      width: 88%;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 1px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .userTag {
      font-size: 14px;
      margin-top: 5px;
    }
  }
`;

const ModalBtn = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;

  .icon {
    color: red;
    background-color: red;
    fill: red;
  }

  .modalBtn {
    width: 32px;
    height: 32px;
    font-size: 30px;
    cursor: pointer;
    background: url('${modalBtnImg}');
    background-size: cover;
    background-position: center;

    &:hover {
      color: #595959;
    }
  }
`;
