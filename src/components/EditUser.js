import React from 'react';
import styled from 'styled-components';
import { Buttons, Inputs } from '../elements/index';

const EditUser = (props) => {
  const { onClose, userInfo } = props;
  console.log(props);

  return (
    <Content>
      <CloseBtnBox>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </CloseBtnBox>
      <GroupBox1>
        <ImageBox>
          <UserImg>
            <img src={userInfo.userProfile} alt="userProfileImage" />
          </UserImg>
          <p>이미지를 클릭해 사진 선택</p>
          <button>이미지 제거</button>
        </ImageBox>
        <UserInfoBox>
          <p>기본 정보</p>
          <Inputs placeholder={'닉네임'} styles={{ marginBottom: '20px' }} />
          <Inputs placeholder={'비밀번호'} styles={{ marginBottom: '20px' }} />
          <Inputs
            placeholder={'비밀번호 확인'}
            styles={{ marginBottom: '20px' }}
          />
        </UserInfoBox>
      </GroupBox1>
      <GroupBox>
        <p>추가 정보</p>
        <LanguageBox>
          <div>언어1</div>
          <div>언어2</div>
          <div>언어3</div>
        </LanguageBox>
        <div>자기소개</div>
        <div>한 줄 소개</div>
        <div>태그</div>
      </GroupBox>
      <GroupBox>
        <div>선생님/학생</div>
        <div>선생님일 때 시간표</div>
      </GroupBox>
      <GroupBox>
        <Buttons>수정내용 저장하기</Buttons>
        {/* 회원탈퇴버튼 */}
      </GroupBox>
    </Content>
  );
};

export default EditUser;

const Content = styled.div`
  //   height: 954px;
  width: 1240px;
  // margin-top: 120px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  // overflow: scroll;
`;

const GroupBox1 = styled.div`
  margin: 200px 40px 40px;
  display: flex;
`;

const ImageBox = styled.div`
  width: 320px;

  p {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 300;
    color: #999;
    cursor: default;
  }
  button {
    margin-top: 25px;
    border: none;
    border-bottom: 1px solid #153587;
    background: none;
    font-size: 20px;
    font-weight: 600;
    color: #153587;
    cursor: pointer;
  }
`;

const UserImg = styled.div`
  width: 240px;
  height: 240px;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 240px;
    height: 240px;
  }
`;

const UserInfoBox = styled.div`
  width: 880px;
  margin-left: 20px;

  p {
    height: 80px;
    text-align: start;
    font-size: 40px;
    font-weight: 600;
  }
`;

const GroupBox = styled.div`
  // width: 1160px;
  margin: 40px;
`;

const LanguageBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const CloseBtnBox = styled.label`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 40px;
  left: 40px;
  display: flex;
  justify-content: center;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 30px;
`;
