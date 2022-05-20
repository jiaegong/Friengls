import React from 'react';
import styled from 'styled-components';
import SelectLanguage from '../components/SelectLanguage';
import { Buttons, InputBox, InputLabel, Inputs } from '../elements/index';

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
          {/* 프로필이미지선택 */}
          <UserImg>
            <img src={userInfo.userProfile} alt="userProfileImage" />
          </UserImg>
          <p>이미지를 클릭해 사진 선택</p>
          {/* 프로필이미지삭제: url제거하고 기본이미지 띄우기 */}
          <button>이미지 제거</button>
        </ImageBox>
        <UserInfoBox>
          <p>기본 정보</p>
          {/* 닉네임 */}
          <InputBox>
            <InputLabel>닉네임</InputLabel>
            <Inputs placeholder={'변경할 닉네임을 입력해 주세요.'} />
          </InputBox>
          {/* 비밀번호 */}
          <InputBox>
            <InputLabel>새 비밀번호</InputLabel>
            <Inputs placeholder={'변경할 비밀번호를 입력해 주세요.'} />
          </InputBox>
          {/* 비밀번호 확인 */}
          <InputBox>
            <InputLabel>비밀번호 확인</InputLabel>
            <Inputs
              placeholder={'변경할 비밀번호를 다시 한 번 입력해 주세요.'}
            />
          </InputBox>
        </UserInfoBox>
      </GroupBox1>
      <GroupBox>
        <p>추가 정보</p>
        {/* 언어선택 */}
        <LanguageBox>
          <SelectLanguage />
        </LanguageBox>
        {/* 자기 소개 */}
        <InputBox
          styles={{
            height: '210px',
            justifyContent: 'flex-start',
          }}
        >
          <InputLabel styles={{ margin: '10px 0' }}>자기 소개</InputLabel>
          <Inputs
            multiLine
            placeholder={
              '하고 있는 일, 취미, 성격 등 자유롭게 자신을 소개해 주세요.'
            }
          />
        </InputBox>
        {/* 한 줄 소개 */}
        <InputBox>
          <InputLabel>한 줄 소개</InputLabel>
          <Inputs placeholder={'간략한 인사말을 작성해 주세요.'} />
        </InputBox>
        {/* 태그 */}
        <InputBox>
          <InputLabel>태그</InputLabel>
          <Inputs placeholder={'태그'} />
        </InputBox>
      </GroupBox>
      <GroupBox>
        <p>사용자 설정 변경</p>
        <InputBox
          styles={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            fontSize: '26px',
            cursor: 'default',
          }}
        >
          프랭글스에서 한국어를
          <InputLabel
            styles={{
              width: '140px',
              marginLeft: '10px',
              alignItems: 'center',
              fontSize: '26px',
              cursor: 'pointer',
            }}
          >
            <Inputs
              type={'radio'}
              name="isTutor"
              value={'0'}
              styles={{
                width: '20px',
                margin: '5px 5px 0 0',
                cursor: 'pointer',
              }}
            />
            배울래요!
          </InputLabel>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <InputLabel
            styles={{
              width: '180px',
              marginLeft: '10px',
              alignItems: 'center',
              fontSize: '26px',
              cursor: 'pointer',
            }}
          >
            <Inputs
              type={'radio'}
              name="isTutor"
              value={'1'}
              styles={{
                width: '20px',
                margin: '5px 5px 0 0',
                cursor: 'pointer',
              }}
            />
            가르칠래요!
          </InputLabel>
        </InputBox>
        {/* 선생님인 경우 수업시간 선택 */}
        <InputBox
          styles={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            fontSize: '26px',
            cursor: 'default',
          }}
        >
          수업 가능한 시간 :&nbsp;&nbsp;
          <Select name="startTime">
            <option value="">=====첫 수업=====</option>
          </Select>
          부터&nbsp;&nbsp;&nbsp;
          <Select name="endTime">
            <option value="">=====마지막 수업=====</option>
          </Select>
          까지
        </InputBox>
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
  overflow: scroll;
`;

const CloseBtnBox = styled.label`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 40px;
  left: 40px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;

const GroupBox1 = styled.div`
  margin: 150px 40px 20px;
  display: flex;
`;

const ImageBox = styled.div`
  width: 320px;

  p {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 300;
    color: #b5b5b5;
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
  margin: 0 40px;
  padding: 20px 0;
  border-top: 1px solid #c4c4c4;

  p {
    height: 80px;
    text-align: start;
    font-size: 40px;
    font-weight: 600;
  }
`;

const LanguageBox = styled.div`
  margin-bottom: 20px;
`;

const Select = styled.select`
  margin-right: 20px;
  height: 50px;
  border: 1px solid #8a8a8a;
  border-radius: 8px;
  font-size: 26px;
`;
