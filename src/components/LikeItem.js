import React, { useEffect } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';

const LikeItem = (props) => {
  const isTutor = props.userInfo.isTutor;

  if (isTutor === 0) {
    return (
      <Wrap>
        <UserWrap>
          <img className="profile" src={props.userProfile} alt="프로필 사진" />
          <div>{props.userName}</div>
        </UserWrap>
        <div onClick={() => history.push(`/detail/${props.userName}/1`)}>
          프로필 보러가기
        </div>
      </Wrap>
    );
  } else if (isTutor === 1) {
    return (
      <Wrap>
        <UserWrap>
          <img className="profile" src={props.userProfile} alt="프로필 사진" />
          <div>{props.userName}</div>
        </UserWrap>
        <ProfileWrap
          onClick={() => history.push(`/detail/${props.userName}/0`)}
        >
          프로필 보러가기
        </ProfileWrap>
      </Wrap>
    );
  }
};

export default LikeItem;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 2px 8px 0px #00000030;
  margin: 0 auto 20px;
  width: 80%;
  width: 100%;
  height: 100px;
  position: relative;
`;

const UserWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .profile {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const ProfileWrap = styled.p`
  cursor: pointer;
  text-decoration: underline;
  color: #808080;
  font-size: 14px;
`;
