import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

// 모듈
import { actionCreators as tutorActions } from '../redux/modules/tutor';

// 아이콘
import { Image, Text } from '../elements/index';

const TutorModal = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tutor = props.tutor;
  const tags = tutor.tag.split(',');
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
            <ImgWrap>
              <Image
                styles={{ width: '100%', height: '160px' }}
                shape="circle"
                src={tutor.userProfile}
              />
            </ImgWrap>
            <NameContainer>
              <NameWrap>
                <Text styles={{ fontSize: '24px', fontWeight: '700' }}>
                  {tutor.userName}
                </Text>
              </NameWrap>
              <LanguageWrap>
                <Text>{tutor.language1} / </Text>
                <Text>&nbsp;{tutor.language2} / </Text>
                <Text>&nbsp;{tutor.language3}</Text>
              </LanguageWrap>
            </NameContainer>
          </ProfileBox>
          <InfoBox>
            <Text styles={{ padding: '0 10px', minHeight: '60px' }}>
              {tutor.comment}
            </Text>
            <TagWrap>
              {tags?.map((tag, idx) => (
                <Tag
                  key={idx}
                  onClick={() => {
                    history.push(`/search/${tag}`);
                    dispatch(tutorActions.getSearchTutorsDB(tag));
                  }}
                >
                  {tag}
                </Tag>
              ))}
            </TagWrap>
          </InfoBox>
          <ProfileLink
            onClick={() => history.push(`/detail/${tutor.userName}/1`)}
          >
            {t('see tutor profile')} >
          </ProfileLink>
        </Wrap>
      </Content>
    </Background>
  );
};

export default TutorModal;

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
  width: 440px;
  height: 500px;
  height: 530px;
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

const ImgWrap = styled.div`
  width: 160px;
  height: 160px;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 20px;
  padding-bottom: 10px;
`;

const NameWrap = styled.div`
  display: flex;
`;

const LanguageWrap = styled.div`
  display: flex;
  margin-top: 10px;
  P {
    font-size: 14px;
    color: #5e5e5e;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TagWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  margin: 2px 5px;
  margin: 4px 6px;
  padding: 5px 10px;
  border-radius: 40px;
  font-size: 14px;
  border: 1px solid #959595;
  box-shadow: 0px 2px 6px 0px #00000040;
  cursor: pointer;
`;

const ProfileLink = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-size: 14px;
  cursor: pointer;
  color: #3e3e3e;
`;
