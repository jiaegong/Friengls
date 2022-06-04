import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { Profile } from '../asset/image';
import { useTranslation } from 'react-i18next';

const LikeItem = (props) => {
  const { t } = useTranslation();
  const isTutor = props.userInfo.isTutor;
  if (isTutor === 0) {
    return (
      <Wrap>
        <UserWrap>
          <img
            className="profile"
            src={props.userProfile ? props.userProfile : Profile}
            alt="프로필 사진"
          />
          <div>{props.userName}</div>
        </UserWrap>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => history.push(`/detail/${props.userName}/1`)}
        >
          {t('see the profile')}
        </div>
      </Wrap>
    );
  }
  return (
    <Wrap>
      <UserWrap userProfile={props.userProfile ? true : false}>
        <img
          className="profile"
          src={props.userProfile ? props.userProfile : Profile}
          alt="프로필 사진"
        />
        <div>{props.userName}</div>
      </UserWrap>
      <ProfileWrap onClick={() => history.push(`/detail/${props.userName}/0`)}>
        {t('see the profile')}
      </ProfileWrap>
    </Wrap>
  );
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
    object-fit: ${(props) => (props.userProfile ? 'cover' : 'contain')};
    border-radius: 50%;
  }
`;

const ProfileWrap = styled.p`
  cursor: pointer;
  text-decoration: underline;
  color: #808080;
  font-size: 14px;
  cursor: pointer;
`;
