import React, { useEffect, useState } from 'react';

// 패키지
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

// 모듈
import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as notiActions } from '../redux/modules/booking';

//컴포넌트
import { getCookie } from '../shared/Cookie';
import { MainLogo } from '../image/index';
import NotiModal from './NotiModal';

const Header = () => {
  const dispatch = useDispatch();
  const token = getCookie('token');
  const [notiOpen, setNotiOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // 다국어 처리
  const { i18n } = useTranslation();
  const changeLanguageEn = () => i18n.changeLanguage('en');
  const changeLanguageKo = () => i18n.changeLanguage('ko');
  const changeLanguageJa = () => i18n.changeLanguage('ja');

  // const [username, setUsername] = useState('');
  // const [user, setUser] = useState('');
  // const [socket, setSocket] = useState(null);

  // ⭐️
  useEffect(() => {
    // setSocket(io('소켓을 받을 주소'));
    // setSocket(io('http://localhost:4000'));
    // if (token) {
    //   dispatch(notiActions.getBookingNotiDB());
    // }
  }, [token]);

  const handleNotiModal = () => {
    setNotiOpen(!notiOpen);
    if (token) {
      dispatch(notiActions.getBookingNotiDB());
    }
  };

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
          <li
            onClick={() => {
              setLangOpen(!langOpen);
            }}
          >
            언어
          </li>
          {langOpen && (
            <SelectLang>
              <p className="en" onClick={changeLanguageEn}>
                English
              </p>
              <p className="ko" onClick={changeLanguageKo}>
                한국어
              </p>
              <p className="ja" onClick={changeLanguageJa}>
                日本語
              </p>
            </SelectLang>
          )}
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
                  handleNotiModal();
                }}
              >
                알림
              </li>
              {notiOpen && (
                <NotiModal
                  ModalAction={handleNotiModal}
                  userInfo={userInfo}
                  // key={'notiModal'}
                />
              )}
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
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  Swal.fire({
                    title: '로그인 하셨나요?',
                    text: '로그인후 사용이 가능 합니다!~',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: '확인',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      history.push('/login');
                    }
                  });

                  // history.push('/login');
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

const SelectLang = styled.div`
  width: 90px;
  height: 105px;
  border-radius: 10px;
  box-shadow: 0px 2px 12px 0px #00000040;
  position: absolute;
  top: 55px;
  left: 35px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  .en {
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
  }
  .en:hover {
    color: #7f83ea;
  }

  .ko {
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
  }
  .ko:hover {
    color: #7f83ea;
  }

  .ja {
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
  }
  .ja:hover {
    color: #7f83ea;
  }
`;

const Wrap = styled.div`
  width: 100%;
  height: 110px;
  box-shadow: 0px -2px 8px 1px grey;
  background: #fff;

  .innerWrap {
    width: 90%;
    max-width: 1280px;
    height: 100%;
    padding: 20px 0 0;
    margin: auto;

    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    .logoWrap {
      width: 210px;
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

        font-size: 16px;
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

      li:hover {
        color: #7f83ea;
      }
    }
  }
`;
