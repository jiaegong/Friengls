import React, { useEffect, useState } from 'react';

// 패키지
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { io } from 'socket.io-client';

// 모듈
import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as tutorActions } from '../redux/modules/tutor';

//컴포넌트
import { getCookie } from '../shared/Cookie';
import { MainLogo } from '../image/index';

const Header = () => {
  const dispatch = useDispatch();
  const token = getCookie('token');
  // const [username, setUsername] = useState('');
  // const [user, setUser] = useState('');
  // const [socket, setSocket] = useState(null);

  // ⭐️
  useEffect(() => {
    // setSocket(io('소켓을 받을 주소'));
    // setSocket(io('http://localhost:4000'));
  }, []);

  // ⭐️
  // user ==> socket DB로 이동.
  // useEffect(() => {
  //   socket?.emit('newUser', user);
  // }, [socket, user]);

  //마이페이지url에 사용할 유저정보 가져오기
  const userInfo = useSelector((state) => state.user.info);

  //로그아웃
  const logout = () => {
    dispatch(userActions.logout());
  };

  return (
    <Wrap>
      <div className="innerWrap">
        <div
          className="logoWrap"
          onClick={() => {
            history.replace('/');
          }}
        >
          <img className="logo" src={MainLogo} alt=""></img>
        </div>

        <ul className="navBarWrap">
          <li>언어</li>
          <li
            className="icon"
            onClick={() => {
              history.push('/search');
            }}
          >
            선생님 찾기
          </li>
          {token ? (
            <>
              <li
                onClick={() => {
                  alert('알림창 나오게 해야돰!!');
                }}
              >
                알림
              </li>
              <li
                onClick={() => {
                  history.push(
                    `/mypage/${userInfo.userName}/${userInfo.isTutor}`,
                  );
                }}
              >
                마이페이지
              </li>
              <li onClick={logout}>로그아웃</li>
              {/* {open && ( */}
              {/* <div className="notifications">
                <div className="notificationsInnerWrap">
                  <div className="text">
                    누구님이 몇일 HH:MM에 수업을 예약 하셨습니다.
                  </div>
                  <div className="text">
                    누구님이 몇일 HH:MM에 수업을 예약 하셨습니다.
                  </div>

                  <div className="text">누구님이 HH:MM에 예약 하셨습니다.</div>
                  <button className="notificationBtn">확인</button>
                </div>
              </div> */}
              {/* // )} */}
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  alert('로그인후 사용가능합니다~!');
                  history.push('/login');
                }}
              >
                알림
              </li>
              <li
                onClick={() => {
                  history.push('/login');
                }}
              >
                로그인/회원가입
              </li>
            </>
          )}
        </ul>
      </div>
    </Wrap>
  );
};

export default Header;

const Wrap = styled.div`
  width: 100%;
  height: 150px;
  box-shadow: 0px -2px 8px 1px grey;
  background: #fff;

  .innerWrap {
    width: 90%;
    max-width: 1280px;
    height: 100%;
    /* padding: 50px 16px 0; */
    padding: 60px 0 0;
    margin: auto;

    /* text-align: center; */

    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    /* background: #aaaaaa; */
    .logoWrap {
      width: 210px;
      /* margin: 0 auto 53px; */
      padding-top: 16px;
      cursor: pointer;
      .logo {
        width: 100%;
        height: 40px;
      }
    }

    .navBarWrap {
      max-width: 672px;
      width: 100%;
      height: 33px;
      padding-top: 30px;
      display: flex;
      justify-content: flex-end;
      justify-content: space-around;
      align-items: center;
      position: relative;

      /* background: #c5c5c5; */

      li {
        width: 5rem;
        width: auto;
        height: 35px;
        display: flex;
        justify-content: center;
        vertical-align: middle;
        align-items: center;
        cursor: pointer;

        position: relative;
        font-size: 1.375rem;
        font-size: 1.125rem;
        font-weight: bolder;
        letter-spacing: 1px;

        margin-left: 3.125rem;
        /* background: #8e8e8e; */

        cursor: pointer;

        /* 알림 갯수 */
        .counter {
          background-color: red;
          color: #fff;
          position: absolute;
          right: -5px;
          top: -5px;

          width: 18px;
          height: 18px;
          font-size: 12px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          padding: 5px;
        }
      }

      /* 알림창 */
      .notifications {
        position: absolute;
        width: 70%;
        min-height: 200px;
        right: 0;
        top: 50px;
        padding: 10px;
        border-radius: 15px;
        text-align: center;

        background-color: #aaaaaa;

        .notificationsInnerWrap {
          position: relative;
          min-height: 200px;
          padding: 10px;

          .text {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            margin-bottom: 10px;
            border-radius: 5px;
            background-color: #ff9c9c;
            cursor: pointer;
          }

          .notificationBtn {
            border: 1px solid #a2a2a2;
            border-radius: 5px;
            padding: 3px 10px;
            width: 100px;
            height: 30px;
            cursor: pointer;
            position: absolute;
            bottom: 0;
            right: 40%;
          }
        }
      }
    }
  }
`;
