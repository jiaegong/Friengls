import React, { useEffect } from 'react';
import { Flex, Button } from '../elements/index';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';

// 패키지
import styled from 'styled-components';

//컴포넌트
import { getCookie } from '../shared/Cookie';

const Header = () => {
  const token = getCookie('token');
  // const token = localStorage.getItem('token')

  //로그아웃
  const logout = () => {
    console.log('로그아웃');
  };

  return (
    <Flex
      styles={{
        height: '70px',
        background: '#f9f9f9',
      }}
    >
      <Flex
        styles={{ justifyContent: 'flex-start', marginLeft: '20px' }}
        _onClick={() => {
          history.push('/');
        }}
      >
        <img src="logo.png" height="70px" />
      </Flex>
      <Flex
        styles={{
          justifyContent: 'flex-end',
          gap: '10px',
          marginRight: '20px',
        }}
      >
        <Button
          _onClick={() => {
            history.push('/search');
          }}
        >
          Search
        </Button>
        <Button>Noti</Button>
        <Button
          _onClick={() => {
            history.push('/signup');
          }}
        >
          Signup
        </Button>
        <Button
          _onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
