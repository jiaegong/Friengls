import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Flex, Button } from '../elements/index';

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
