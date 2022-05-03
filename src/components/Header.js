import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// 패키지
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { actionCreators as tutorActions } from '../redux/modules/tutor';

const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tutorActions.getListDB());
  }, []);

  return (
    <Wrap>
      <div className="innerWrap">
        <div
          className="logoWrap"
          onClick={() => {
            history.push('/');
          }}
        >
          LOGO
          {/* img or background_img로 설정하면 될듯. */}
        </div>

        <ul className="navBarWrap">
          <li
            onClick={() => {
              history.push('/search');
            }}
          >
            튜터찾기
          </li>
          <li>알림 아이콘</li>
          <li
            onClick={() => {
              history.push('/login');
            }}
          >
            로그인
          </li>
          <li
            onClick={() => {
              history.push('/signup');
            }}
          >
            회원가입
          </li>
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
  background: #aaa;

  .innerWrap {
    width: 90%;
    max-width: 1400px;
    height: 100%;
    padding: 0px 16px 0;
    margin: auto;

    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #eee;

    .logoWrap {
      width: 100px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background: #aaa;
    }

    .navBarWrap {
      /* width: 300px; */
      width: auto;
      height: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #c5c5c5;

      li {
        width: 80px;
        height: 35px;
        display: flex;
        justify-content: center;
        vertical-align: middle;
        align-items: center;
        cursor: pointer;
        background: #8e8e8e;

        margin-right: 10px;

        &:nth-child(5) {
          margin: 0;
        }
      }
    }
  }
`;
