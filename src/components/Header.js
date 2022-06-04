import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

// 모듈
import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as notiActions } from '../redux/modules/booking';

//컴포넌트
import { getCookie } from '../shared/Cookie';
import { MainLogo } from '../asset/image/index';
import NotiModal from './NotiModal';

// 아이콘
import { GrLanguage } from 'react-icons/gr';

const Header = () => {
  const dispatch = useDispatch();
  const token = getCookie('token');
  const [notiOpen, setNotiOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // 다국어 처리
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const changeLanguageEn = () => {
    i18n.changeLanguage('en');
    localStorage.setItem('language', 'en');
  };
  const changeLanguageKo = () => {
    i18n.changeLanguage('ko');
    localStorage.setItem('language', 'ko');
  };
  const changeLanguageJa = () => {
    i18n.changeLanguage('ja');
    localStorage.setItem('language', 'ja');
  };

  const handleNotiModal = () => {
    setNotiOpen(!notiOpen);
  };
  //언어선택시 로컬스토리지에 저장
  useEffect(() => {
    if (localStorage.getItem('language')) {
      i18n.changeLanguage(localStorage.getItem('language'));
    }
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(notiActions.getBookingNotiDB());
    }
  }, [notiOpen]);

  //마이페이지url에 사용할 유저정보 가져오기
  const isLogin = useSelector((state) => state.user.isLogin);
  const userInfo = useSelector((state) => state.user.info);
  const notiList = useSelector((state) => state.booking.noti);
  const notiCheck = notiList?.length;
  //로그인,로그아웃을 확인

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
            history.push('/');
          }}
        >
          <img className="logo" src={MainLogo} alt=""></img>
        </div>
        <NavContainer>
          <LangugeBox
            onClick={() => {
              setLangOpen(!langOpen);
            }}
          >
            <GrLanguage className="langIcon" />
            {t('language')}
          </LangugeBox>
          {langOpen && (
            <SelectLang>
              <p
                className="en"
                onClick={() => {
                  changeLanguageEn();
                  setLangOpen(!langOpen);
                }}
              >
                English
              </p>
              <p
                className="ko"
                onClick={() => {
                  changeLanguageKo();
                  setLangOpen(!langOpen);
                }}
              >
                한국어
              </p>
              <p
                className="ja"
                onClick={() => {
                  changeLanguageJa();
                  setLangOpen(!langOpen);
                }}
              >
                日本語
              </p>
            </SelectLang>
          )}
          <ul className="navBarWrap">
            {notiOpen && (
              <NotiModal ModalAction={handleNotiModal} userInfo={userInfo} />
            )}

            <li
              className="icon"
              onClick={() => {
                history.push('/search');
              }}
            >
              {t('find a tutor')}
            </li>
            {isLogin && userInfo ? (
              <>
                <li
                  onClick={() => {
                    handleNotiModal();
                  }}
                >
                  {t('notification')}

                  {notiCheck !== 0 && <div className="counter" />}
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
                    Swal.fire({
                      title: t('did you sign in?'),
                      text: t('it is available after you sign in!'),
                      icon: 'warning',
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: t('confirm'),
                    }).then((result) => {
                      if (result.isConfirmed) {
                        history.push('/login');
                      }
                    });
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
        </NavContainer>
      </div>
    </Wrap>
  );
};

export default Header;

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
    position: relative;
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
      max-width: 680px;
      width: 100%;
      height: 33px;
      // padding-top: 30px;
      display: flex;
      align-items: center;
      position: relative;
      // background: #c5c5c5;

      li {
        width: 150px;
        height: 35px;
        text-align: center;
        position: relative;
        font-size: 16px;
        font-weight: bolder;
        letter-spacing: 1px;
        cursor: pointer;

        /* 알림 갯수 */
        .counter {
          background-color: red;
          color: #fff;
          position: absolute;
          right: 20px;
          top: -5px;
          width: 10px;
          height: 10px;
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

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;
`;

const LangugeBox = styled.div`
  width: 150px;
  height: 35px;
  margin-right: 18px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  cursor: pointer;
  font-size: 14px;
  color: #999;
  font-weight: bolder;
  letter-spacing: 1px;
  .langIcon {
    margin: 4px 4px 0 0;
    color: #999;
  }
`;

const SelectLang = styled.div`
  width: 90px;
  height: 105px;
  border-radius: 10px;
  box-shadow: 0px 2px 12px 0px #00000040;
  position: absolute;
  top: 30px;
  right: -20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  z-index: 1;

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
