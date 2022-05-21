import React from 'react';
import Portal from '../shared/Portal';
import styled from 'styled-components';
import { Image, Text } from '../elements/index';
import { history } from '../redux/configureStore';

const MainModal = (props) => {
  const tutor = props.tutor;
  const tags = tutor.tag.split(' ,');
  const onClose = props.onClose;

  return (
    <Background
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <Content onClick={(e) => e.stopPropagation()}>
        <Wrap>
          <ProfileBox>
            <Image
              styles={{ width: '150px', height: '150px' }}
              shape="circle"
              src={tutor.userProfile}
            />
            <NameContainer>
              <NameWrap>
                <Text styles={{ fontSize: '24px', fontWeight: '700' }}>
                  {tutor.userName}
                </Text>
              </NameWrap>
              <LanguageWrap>
                <Text>{tutor.language1}&nbsp;</Text>
                <Text>{tutor.language2}&nbsp;</Text>
                <Text>{tutor.language3}&nbsp;</Text>
              </LanguageWrap>
            </NameContainer>
          </ProfileBox>
          <InfoBox>
            <Text>{tutor.comment}</Text>
            <TagWrap>
              {tags.map((tag, idx) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
            </TagWrap>
          </InfoBox>
          <ProfileLink
            onClick={() => history.push(`/detail/${tutor.userName}/1`)}
          >
            튜터 프로필 보기 >
          </ProfileLink>
        </Wrap>
      </Content>
    </Background>
  );
};

export default MainModal;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 30px;
  width: 400px;
  height: 500px;
  border-radius: 10px;
  background: #f9f9f9;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 20px;
  position: relative;
`;

const ProfileBox = styled.div`
  display: flex;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 20px;
`;

const NameWrap = styled.div`
  display: flex;
`;

const LanguageWrap = styled.div`
  display: flex;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TagWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  margin: 2px 5px;
  padding: 5px 10px;
  border-radius: 40px;
  border: 2px solid #959595;
  box-shadow: 0px 2px 6px 0px #00000040;
`;

const ProfileLink = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  cursor: pointer;
  color: #959595;
`;
