import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as profileActions } from '../redux/modules/profile';
import SelectLanguage from '../components/SelectLanguage';
import { ProfileMedium } from '../image';
import { Buttons, InputBox, InputLabel, Inputs } from '../elements/index';
import { pwdForm, userNameForm } from '../shared/common';
import { useTranslation } from 'react-i18next';

const EditUser = (props) => {
  const { t } = useTranslation();
  const { onClose, userInfo, accessInfo } = props;
  console.log(userInfo);
  console.log(userInfo.isTutor.toString());

  const dispatch = useDispatch();
  //  사진 미리보기
  const imageRef = useRef();
  const [previewProfile, setPreviewProfile] = useState(
    userInfo.userProfile ? userInfo.userProfile : ProfileMedium,
  );
  const selectFile = () => {
    const previewFile = imageRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(previewFile);
    reader.onloadend = () => {
      setPreviewProfile(reader.result);
    };
  };
  // userName 유효성 검사, input값 가져오기
  const [userName, setUserName] = useState(userInfo.userName);
  const [userNameCheck, setUserNameCheck] = useState('');
  const handleUserName = (e) => {
    const userName = e.target.value;
    setUserName(userName);
    if (userNameForm(userName)) {
      setUserNameCheck(t('this is the correct nickname format.'));
    } else {
      setUserNameCheck(
        t(
          'english, numbers, special characters (- _ . ) 6-20) or less, korean letters 3-8 characters, numbers, special characters (- _ . )',
        ),
      );
    }
  };

  //pwd 유효성 검사, input값 가져오기
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState(
    t(
      'password format: english uppercase and lowercase letters, 8-20 characters including must-have numbers (special characters)',
    ),
  );

  const handlePwd = (e) => {
    const pwd = e.target.value;
    setPwd(pwd);
    if (pwdForm(pwd)) {
      if (pwd.includes(userName)) {
        setPwdCheck(
          t('you can not include nickname or email in your password.'),
        );
      } else {
        setPwdCheck(t('this is the correct password format.'));
      }
    } else {
      if (pwd.includes(userName)) {
        setPwdCheck(
          t('you can not include nickname or email in your password.'),
        );
      } else {
        setPwdCheck(
          t(
            'password format: english uppercase and lowercase letters, 8-20 characters including must-have numbers (special characters)',
          ),
        );
      }
    }
  };

  //confirmPwd 유효성 검사, input값 가져오기
  const [confirmPwd, setConfirmPwd] = useState('');
  const [confirmPwdCheck, setConfirmPwdCheck] = useState(
    t('please fill in the password one more time.'),
  );

  const handleConfirmPwd = (e) => {
    const confirmPwd = e.target.value;
    setConfirmPwd(e.target.value);
    if (pwd === confirmPwd) {
      setConfirmPwdCheck(t('it matches the password.'));
    } else if (confirmPwd === '') {
      setConfirmPwdCheck(t('please fill in the password one more time.'));
    } else {
      setConfirmPwdCheck(t('the password does not match'));
    }
  };

  //닉네임 중복체크
  const checkDuplicatedUserName = () => {
    //아이디 형식 맞지 않을 때 리턴
    if (!userNameForm(userName)) {
      return;
    }
    //아이디 변경 안한 경우 리턴
    if (userInfo.userName === userName) {
      return;
    }

    axios({
      method: 'post',
      url: 'https://hjg521.link/signUp/nameCheck',
      data: {
        userName: userName,
      },
    })
      .then((response) => {
        console.log('userNameCheckDB성공', response.data);
        if (response.data.msg === '이미 있는 닉네임입니다.') {
          setUserNameCheck(
            t('this nickname is already in use. try another nickname.'),
          );
          return;
        }
        setUserNameCheck(t('this nickname is available.'));
      })
      .catch((error) => {
        console.log('닉네임체크에러', error);
      });
  };

  //사용언어1 input값
  const [language1, setLanguage1] = useState(userInfo.language1);
  const handleLanguage1 = (e) => {
    setLanguage1(e.target.value);
  };

  //사용언어2 input값
  const [language2, setLanguage2] = useState(userInfo.language2);
  const handleLanguage2 = (e) => {
    setLanguage2(e.target.value);
  };

  //사용언어3 input값
  const [language3, setLanguage3] = useState(userInfo.language3);
  const handleLanguage3 = (e) => {
    setLanguage3(e.target.value);
  };
  // 자기소개 한줄소개 setState onBlur로 바꾸기
  //자기소개 input값
  const [contents, setContents] = useState(userInfo.contents);
  const handleContents = (e) => {
    setContents(e.target.value);
  };

  //한줄소개 input값
  const [comment, setComment] = useState(userInfo.comment);
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  //태그 input값
  const [tagInput, setTagInput] = useState('');
  const [tagList, setTagList] = useState(
    userInfo.tag.length !== 0 ? [...userInfo.tag.split(',')] : [],
  );
  const [tagLimit, setTagLimit] = useState(false);
  const handleTag = (e) => {
    setTagInput(e.target.value);
  };

  //태그 생성(빈 값, 중복일 경우 return)
  // 특수문자 사용하지 못하도록
  const exampleTag = [t('language exchange'), t('daily conversation')];
  const inputTag = (e) => {
    if (e.keyCode === 32) {
      //공백일 경우 거르기
      if (tagInput.split('').filter((word) => word !== ' ').length === 0) {
        window.alert(t('please enter tags.'));
        setTagInput('');
        return;
      }
      //중복일 경우 거르기

      if (tagList.indexOf(tagInput) !== -1) {
        if (tagInput.length === tagList[tagList.indexOf(tagInput)].length) {
          window.alert(t('duplicate tags are unable.'));
          setTagInput('');
          return;
        }
      }
      //태그리스트에 담기
      setTagList([...tagList, tagInput]);
      //태그 갯수 제한
      if (tagList.length > 8) {
        setTagLimit(true);
      }
      setTagInput('');
    }
  };
  //태그삭제
  const deleteTag = (e) => {
    if (tagLimit) {
      setTagLimit(false);
    }
    setTagList(tagList.filter((tag, index) => index !== Number(e.target.id)));
  };

  //isTutor input값
  const [isTutor, setIsTutor] = useState('');
  const handleIstutor = (e) => {
    setIsTutor(e.target.value);
  };

  //수업가능시간(시작) option
  const startTimeArray = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  //수업가능시간(시작) input값
  const [startTime, setStartTime] = useState(userInfo.startTime);
  const handleStartTime = (e) => {
    setStartTime(e.target.value);
  };
  //수업가능시간(종료) option설정
  const endTimeArray = [];
  for (let i = 1; i < 7; i++) {
    Number(startTime) + (2 * i - 1) < 24
      ? endTimeArray.push(Number(startTime) + (2 * i - 1))
      : endTimeArray.push(Number(startTime) + (2 * i - 1) - 24);
  }
  //수업가능시간(종료) input값
  const [endTime, setEndTime] = useState(userInfo.endTime);
  const handleEndTime = (e) => {
    setEndTime(e.target.value);
  };
  //기존 수업시간을 시간선택옵션 초기값에 표시하기 위한 함수
  const startNum = userInfo.startTime ? Number(userInfo.startTime) : '';
  const endNum = userInfo.endTime ? Number(userInfo.endTime) : '';

  //변경내용이 있을 경우 버튼 활성화
  const [disabled, setDisabled] = useState(true);

  //유저정보 변경하기
  const editUser = (e) => {
    //닉네임 변경 시 조건
    if (userInfo.userName !== userName) {
      if (userNameCheck !== t('this nickname is available.')) {
        window.alert(t('please confirm the nickname you want to change.'));
      }
    }

    //비밀번호 변경 시 조건
    if (pwd) {
      if (pwdCheck !== t('this is the correct password format.')) {
        window.alert(t('please confirm the password you want to change.'));
        return;
      } else if (pwd !== confirmPwd) {
        window.alert(
          t(
            'the password you are trying to change does not match the password verification.',
          ),
        );
        return;
      }
    }
    //비밀번호 확인에 입력값 있을 경우
    if (confirmPwd) {
      if (!pwd) {
        window.alert(t('please enter the password you want to change.'));
        return;
      } else if (pwdCheck !== t('this is the correct password format.')) {
        window.alert(t('please confirm the password you want to change.'));
        return;
      } else if (pwd !== confirmPwd) {
        window.alert(t('please enter the password you want to change.'));
        return;
      }
    }

    //자기소개, 한 줄 소개 공백으로 채울 경우 리턴
    if (contents.split('').filter((word) => word !== ' ').length === 0) {
      if (contents.length > 0) {
        window.alert(t('self-introduction can not be filled with spaces.'));
        setContents('');
        return;
      }
    }

    if (comment.split('').filter((word) => word !== ' ').length === 0) {
      if (comment.length > 0) {
        window.alert(t('comment can not be filled with spaces.'));
        setComment('');
        return;
      }
    }
    //선생님일 경우 모든 정보를 입력하도록 조건
    if (isTutor === '1') {
      if (
        language1 === '' ||
        comment.split('').filter((word) => word !== ' ').length === 0 ||
        contents.split('').filter((word) => word !== ' ').length === 0 ||
        tagList.length === 0 ||
        startTime === '' ||
        endTime === ''
      ) {
        window.alert(t('tutor must fill out all the information.'));
        return;
      }
    }
    e.preventDefault();
    const profileImage = imageRef.current.files[0];

    if (profileImage) {
      const formData = new FormData();
      formData.append('userProfile', profileImage);
      formData.append('userEmail', userInfo.userEmail);
      formData.append('isTutor', userInfo.isTutor);

      for (let key of formData.keys()) {
        console.log(key);
      }
      for (let value of formData.values()) {
        console.log(value);
      }

      dispatch(profileActions.uploadProfileDB(formData));
    }
    //추가정보 디스패치
    const userForm = {
      //유저정보 추가하기
      userEmail: userInfo.userEmail,
      userName: userName ? userName : userInfo.userName,
      pwd: pwd ? pwd : accessInfo,
      language1: language1,
      language2: language2,
      language3: language3,
      contents: contents,
      comment: comment,
      tag: tagList.join(),
      isTutor: isTutor ? isTutor : userInfo.isTutor.toString(),
      startTime: startTime,
      endTime: endTime,
    };
    console.log('전송할 유저정보', userForm);

    dispatch(userActions.editUserDB(userForm));
  };

  return (
    <Content>
      <CloseBtnBox>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </CloseBtnBox>
      <GroupBox1>
        <ImageBox>
          {/* 프로필이미지선택 */}
          <UserImg>
            <label htmlFor="file">
              <img src={previewProfile} alt="userProfileImage" />
              <input
                type="file"
                ref={imageRef}
                onChange={selectFile}
                accept="image/*"
                id="file"
              />
            </label>
          </UserImg>
          <ProfileAddButton htmlFor="file">+</ProfileAddButton>
          {/* 프로필이미지삭제: url제거하고 기본이미지 띄우기 */}
          <button>{t('remove image')}</button>
        </ImageBox>
        <UserInfoBox>
          <p>{t('basic information')}</p>
          {/* 닉네임 */}
          <InputBox>
            <InputLabel>{t('nickname')}</InputLabel>
            <Inputs
              placeholder={t('please enter a nickname to change.')}
              type="text"
              name="userName"
              _onChange={handleUserName}
              _onBlur={checkDuplicatedUserName} // 자동 닉네임 체크
              value={userName}
            />
            <InputLabel styles={{ color: '#8A8A8A' }}>
              {userNameCheck}
            </InputLabel>
          </InputBox>
          {/* 비밀번호 */}
          <InputBox>
            <InputLabel>{t('new password')}</InputLabel>
            <Inputs
              placeholder={t('please enter a password to change.')}
              type="text"
              name="pwd"
              _onChange={handlePwd}
            />
            <InputLabel styles={{ color: '#8A8A8A' }}>{pwdCheck}</InputLabel>
          </InputBox>
          {/* 비밀번호 확인 */}
          <InputBox>
            <InputLabel>{t('confirm password')}</InputLabel>
            <Inputs
              placeholder={t(
                'please enter the password you want to change again.',
              )}
              type="text"
              name="pwdCheck"
              _onChange={handleConfirmPwd}
            />
            <InputLabel styles={{ color: '#8a8a8a' }}>
              {confirmPwdCheck}
            </InputLabel>
          </InputBox>
        </UserInfoBox>
      </GroupBox1>
      <GroupBox>
        <p>{t('additional information')}</p>
        {/* 언어선택 */}
        <LanguageBox>
          <SelectLanguage
            language1={language1}
            language2={language2}
            language3={language3}
            handleLanguage1={handleLanguage1}
            handleLanguage2={handleLanguage2}
            handleLanguage3={handleLanguage3}
          />
        </LanguageBox>
        {/* 자기 소개 */}
        <InputBox
          styles={{
            height: '190px',
            justifyContent: 'flex-start',
          }}
        >
          <LabelWrap>
            <InputLabel>{t('self-introduction')}</InputLabel>
            <InputLabel>{contents.length}/200</InputLabel>
          </LabelWrap>
          <Inputs
            multiLine
            placeholder={t(
              'please feel free to introduce yourself to what you are doing, hobbies, personality, etc.',
            )}
            name="contents"
            value={userInfo.contents}
            _onChange={handleContents}
            maxLength={200}
          />
        </InputBox>
        {/* 한 줄 소개 */}
        <InputBox>
          <LabelWrap>
            <InputLabel>{t('comment')}</InputLabel>
            <InputLabel>{comment.length}/40</InputLabel>
          </LabelWrap>
          <Inputs
            placeholder={t('please write a comment.')}
            name="comment"
            value={userInfo.comment}
            _onChange={handleComment}
            maxLength={40}
          />
        </InputBox>
        {/* 태그 */}
        <InputBox
          styles={{
            height: '210px',
            justifyContent: 'flex-start',
          }}
        >
          <InputLabel>{t('tag')}</InputLabel>
          {/* 태그입력 */}
          <TagInput
            disabled={tagLimit}
            placeholder={
              tagLimit
                ? t('you can register up to 10')
                : t('enter a word and register a tag with space key')
            }
            name="tag"
            onChange={handleTag}
            onKeyUp={inputTag}
            value={tagInput}
            maxLength={8}
          />
          {/* 태그출력 */}
          <TagBox>
            {tagList.length > 0 ? (
              tagList.map((tag, index) => (
                <div key={tag + index}>
                  <p>{tag}</p>
                  <button id={index} onClick={deleteTag}>
                    {/* <img /> */}X
                  </button>
                </div>
              ))
            ) : (
              <>
                <span>{t('example')} :</span>
                {exampleTag.map((example, index) => (
                  <div key={example + index}>
                    <p>{example}</p>
                  </div>
                ))}
              </>
            )}
          </TagBox>
        </InputBox>
      </GroupBox>
      <GroupBox>
        {/* isTutor 선택 */}
        <p>{t('change user setting')}</p>
        <InputBox
          styles={{
            background: 'rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            fontSize: '26px',
            cursor: 'default',
            color: '#999',
          }}
        >
          {t('in friengls i want to')}
          <InputLabel
            styles={{
              width: '140px',
              marginLeft: '10px',
              alignItems: 'center',
              fontSize: '26px',
              color: '#999',
            }}
          >
            <Inputs
              type="radio"
              name="isTutor"
              value="0"
              styles={{
                width: '20px',
                margin: '5px 5px 0 0',
              }}
              checked={userInfo.isTutor === 0 ? true : false}
            />
            {t('learn!')}
          </InputLabel>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <InputLabel
            styles={{
              width: '180px',
              marginLeft: '10px',
              alignItems: 'center',
              fontSize: '26px',
              color: '#999',
            }}
          >
            <Inputs
              type="radio"
              name="isTutor"
              value="1"
              styles={{
                width: '20px',
                margin: '5px 5px 0 0',
              }}
              checked={userInfo.isTutor === 1 ? true : false}
            />
            {t('teach!')}
          </InputLabel>
        </InputBox>
        {/* 선생님인 경우 수업시간 선택 */}
        {userInfo.isTutor === 1 && (
          <TimeSelectContainer>
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
              {t('available time for tutoring')} :&nbsp;&nbsp;
              {/* 기존에 수업시간이 있다면 보여주기 */}
              <Select name="startTime" onChange={handleStartTime}>
                <option value="">
                  {userInfo.startTime
                    ? startNum +
                      1 +
                      `{t('session')}: ` +
                      startNum +
                      ':00 - ' +
                      (startNum + 1) +
                      ':00'
                    : `====={t('first tutoring')}=====`}
                </option>
                {startTimeArray.map((time, index) => (
                  //+ 키 유저아이디 같은걸로 바꿔주기
                  <option value={time} key={index}>
                    {time + 1}
                    {t('session')}: {time}:00 - {time + 1}:00
                  </option>
                ))}
              </Select>
              {t('from')}&nbsp;&nbsp;&nbsp;
              {startTime === '' ? (
                <></>
              ) : (
                <>
                  <Select name="endTime" onChange={handleEndTime}>
                    <option value="">
                      {userInfo.endTime
                        ? endNum +
                          1 +
                          `{t('session')}: ` +
                          endNum +
                          ':00 - ' +
                          (endNum + 1) +
                          ':00'
                        : `====={t('last tutoring')}=====`}
                    </option>
                    {endTimeArray.map((time, index) => (
                      <option value={time} key={startTime + index}>
                        {time + 1}
                        {t('session')}: {time}:00 - {time + 1}:00
                      </option>
                    ))}
                  </Select>
                  {t('to')}
                </>
              )}
            </InputBox>
            <InfoBox>
              <span>
                ※ {t('the tutoring lesson lasts 30 minutes each time.')}
              </span>
              <span>
                ※ {t('tutoring lessons can be organized in two sessions.')}
              </span>
              <span>
                ※ {t('you can take at least 2 sessions and up to 12 sessions.')}
              </span>
            </InfoBox>
          </TimeSelectContainer>
        )}
      </GroupBox>
      <GroupBox>
        <Buttons
          _onClick={editUser}
          styles={{ width: '380px', height: '60px' }}
        >
          {t('save modifications')}
        </Buttons>
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
// 닫기 버튼
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
// 프로필사진 관련
const ImageBox = styled.div`
  width: 320px;
  button {
    margin-top: 25px;
    border: none;
    border-bottom: 1px solid #153587;
    background: none;
    font-size: 20px;
    font-weight: 600;
    color: #153587;
    cursor: pointer;
    position: relative;
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
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  input {
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
  }
`;

const ProfileAddButton = styled.label`
  width: 60px;
  height: 60px;
  padding-bottom: 10px;
  border-radius: 50px;
  background: #153587;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 330px;
  left: 250px;
  font-size: 50px;
  font-weight: 600;
  color: #fff;
`;

// 기본 정보
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
//언어선택 컴포넌트 마진
const LanguageBox = styled.div`
  margin-bottom: 20px;
`;
//자기소개/한줄소개 라벨, 글자수제한 정렬
const LabelWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  p {
    font-size: 20px;
    color: #404040;
  }
`;

// 태그 관련
const TagInput = styled.input`
  width: 100%;
  height: 35px;
  margin-bottom: 20px;
  border: none;
  font-size: 26px;
  font-weight: 400;
  ::-webkit-input-placeholder {
    font-size: 20px;
    color: b5b5b5;
  }
  &: focus {
    outline: none;
  }
`;

const TagBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  //태그 한 개의 속성
  div {
    height: 50px;
    max-width: 180px;
    margin: 0 15px 10px 0;
    padding: 10px 10px 12px;
    display: flex;
    align-items: center;
    border-radius: 25px;
    border: 2px solid #959595;
    cursor: default;
  }

  //태그 한 개의 텍스트
  p {
    margin-right: 10px;
    font-size: 16px;
    display: flex;
    align-items: center;
    cursor: default;
  }
  //태그삭제 버튼
  button {
    background: transparent;
    border: none;
    margin-top: 5px;
    font-size: 25px;
    color: #8a8a8a;
    cursor: pointer;
  }

  span {
    padding: 10px 10px 0 0;
    font-size: 20px;
    color: #8a8a8a;
  }
`;

//수업시간 선택 관련
const Select = styled.select`
  margin-right: 20px;
  height: 50px;
  border: 1px solid #8a8a8a;
  border-radius: 8px;
  font-size: 26px;
`;

const TimeSelectContainer = styled.div`
  // margin: 10px;
`;

const InfoBox = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

//버튼 관련
const ButtonBox = styled.div`
  width: 100%;
  margin-top: 60px;
`;
