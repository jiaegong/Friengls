import React, { useEffect, useState } from 'react';

// 패키지
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
    if (token) {
      dispatch(notiActions.getBookingNotiDB());
    }
  }, [token]);

  const handleNotiModal = () => {
    setNotiOpen(!notiOpen);
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
            {t('language')}
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
            {t('find a tutor')}
          </li>
          {token ? (
            <>
              <li
                onClick={() => {
                  handleNotiModal();
                }}
              >
                {t('notification')}
              </li>
              <li
                onClick={() => {
                  history.push(
                    `/mypage/${userInfo.userName}/${userInfo.isTutor}`,
                  );
                }}
              >
                {t('my page')}
              </li>
              <li onClick={logout}>{t('logout')}</li>
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  alert('로그인 후 사용 가능합니다!');
                  history.push('/login');
                }}
              >
                {t('notification')}
              </li>
              <li
                onClick={() => {
                  history.push('/login');
                }}
              >
                {t('login/signup')}
              </li>
            </>
          )}
        </ul>
        {notiOpen && (
          <NotiModal
            ModalAction={handleNotiModal}
            userInfo={userInfo}
            // key={'notiModal'}
          />
        )}
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
  left: 45px;
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
    }
  }
`;
