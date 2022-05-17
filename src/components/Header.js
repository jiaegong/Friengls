import React, { useEffect, useState } from 'react';

// 패키지
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { io } from 'socket.io-client';

// 모듈
import { history } from '../redux/configureStore';

//컴포넌트
import { getCookie } from '../shared/Cookie';
import { MainLogo } from '../image/index';

const Header = () => {
  const dispatch = useDispatch();
  const token = getCookie('token');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');
  const [socket, setSocket] = useState(null);

  // ⭐️
  useEffect(() => {
    // setSocket(io('소켓을 받을 주소'));
    // setSocket(io('http://localhost:4000'));
  }, []);

  // ⭐️
  // user ==> socket DB로 이동.
  useEffect(() => {
    socket?.emit('newUser', user);
  }, [socket, user]);

  //로그아웃
  const logout = () => {
    console.log('로그아웃');
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
                  history.push('/mypage');
                }}
              >
                마이페이지
              </li>
              <li onClick={logout}>로그아웃</li>
              {/* {open && ( */}
              {/* <div className="notifications">
                <div className="text">누구님이 HH:MM에 예약 하셨습니다.</div>
                <div className="text">누구님이 HH:MM에 예약 하셨습니다.</div>
                <div className="text">누구님이 HH:MM에 예약 하셨습니다.</div>
                <button className="notificationBtn">확인</button>
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
        {/* 로그인시 회원이름 나오게 할것인지?? */}
      </div>
    </Wrap>
  );
};

export default Header;

const Wrap = styled.div`
  width: 100%;
  height: 120px;
  background: #fff;

  .innerWrap {
    width: 90%;
    max-width: 1400px;
    height: 100%;
    /* padding: 50px 16px 0; */
    padding: 36px 16px 0;
    margin: auto;

    /* text-align: center; */

    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    /* background: #aaaaaa; */
    .logoWrap {
      min-width: 245px;
      /* margin: 0 auto 53px; */
      cursor: pointer;
      .logo {
        width: 100%;
        height: 50px;
      }
    }

    .navBarWrap {
      max-width: 672px;
      width: 100%;
      height: 36px;
      /* margin: auto; */
      display: flex;
      justify-content: flex-end;
      /* justify-content: space-around; */
      align-items: center;
      position: relative;

      /* background: #c5c5c5; */

      li {
        /* width: 80px; */
        height: 35px;
        display: flex;
        justify-content: center;
        vertical-align: middle;
        align-items: center;
        cursor: pointer;
        position: relative;
        /* font-size: 16px; */
        font-size: 22px;
        font-weight: 800;
        letter-spacing: 1px;

        margin-left: 3.375rem;
        /* background: #8e8e8e; */

        cursor: pointer;
        /* background: #8e8e8e; */

        &:nth-child(5) {
          /* margin: 0; */
        }

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
        width: 90%;
        /* min-height: 200px; */
        right: 0;
        top: 50px;
        padding: 10px;
        text-align: center;

        background-color: #fff;

        .text {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          margin-bottom: 10px;
          background-color: #aaa;
          cursor: pointer;
        }

        .notificationBtn {
          border: 1px solid #a2a2a2;
          border-radius: 5px;
          padding: 3px 10px;
          cursor: pointer;
        }
      }
    }
  }
`;
