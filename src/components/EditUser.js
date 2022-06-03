import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import imageCompression from 'browser-image-compression';
import Swal from 'sweetalert2';

// 컴포넌트
import SelectLanguage from '../components/SelectLanguage';

//모듈
import { actionCreators as userActions } from '../redux/modules/user';

//아이콘
import { Profile, CloseIcon } from '../asset/image/index';
import { Button, InputLabel, Input, InfoInput } from '../elements/index';
import { pwdForm, inputLength } from '../utils/validation';
import SelectIsTutor from './SelectIstutor';

const EditUser = ({ onClose, userInfo, accessInfo }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // 입력받은 img 타켓 설정
  const [profileImage, setProfileImage] = useState(null);

  //  사진 미리보기
  const imageRef = useRef();
  const [previewProfile, setPreviewProfile] = useState(
    userInfo.userProfile ? userInfo.userProfile : Profile,
  );

  const selectFile = () => {
    const inputImgFile = imageRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(inputImgFile);
    reader.onloadend = () => {
      setPreviewProfile(reader.result);
    };
    // console.log('입력 받은 이미지 : ', inputImgFile);

    // 이미지 resize 옵션 설정 (최대 width을 200px로 지정)
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 600,
    };

    // 이미지 압축 후 반환
    const compressedFile = imageCompression(inputImgFile, options);
    compressedFile.then((result) => {
      setProfileImage(result);
      // console.log('이미지 압축한거 result : ', result);
    });
  };

  //프로필사진 삭제
  const deleteProfile = () => {
    if (previewProfile === Profile) {
      return;
    }

    const deleteInfo = {
      userEmail: userInfo.userEmail,
      isTutor: userInfo.isTutor.toString(),
    };
    dispatch(userActions.deleteProfileDB(deleteInfo));
    setPreviewProfile(Profile);
  };

  //pwd 유효성 검사, input값 가져오기
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState('\u00A0');

  const handlePwd = (e) => {
    const pwd = e.target.value;
    setPwd(pwd);
    if (pwdForm(pwd)) {
      setPwdCheck(t('this is the correct password format.'));
    } else {
      setPwdCheck(
        t(
          'password format: english uppercase and lowercase letters, 8-20 characters including must-have numbers (special characters)',
        ),
      );
    }
    //비밀번호 확인 먼저 입력했을 경우
    if (confirmPwd.length !== 0) {
      if (pwd === confirmPwd) {
        setConfirmPwdCheck(t('it matches the password.'));
      } else {
        setConfirmPwdCheck(t('the password does not match'));
      }
    }
  };

  //confirmPwd 유효성 검사, input값 가져오기
  const [confirmPwd, setConfirmPwd] = useState('');
  const [confirmPwdCheck, setConfirmPwdCheck] = useState('\u00A0');

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
  //자기소개 input값, 글자 수 체크
  const [contents, setContents] = useState(userInfo.contents);
  const [contentsLength, setContentsLength] = useState(
    inputLength(userInfo.contents),
  );
  const handleContents = (e) => {
    if (inputLength(e.target.value) < 401) {
      setContents(e.target.value);
      setContentsLength(inputLength(e.target.value));
    } else {
      new Swal(t('self-introduction can be up to 400 characters.'));
    }
  };

  //한줄소개 input값, 글자 수 체크
  const [comment, setComment] = useState(userInfo.comment);
  const [commentLength, setCommentLength] = useState(
    inputLength(userInfo.comment),
  );
  const handleComment = (e) => {
    if (inputLength(e.target.value) < 71) {
      setComment(e.target.value);
      setCommentLength(inputLength(e.target.value));
    } else {
      new Swal(t('comment can be up to 70 characters.'));
    }
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
        new Swal(t('please enter tags.'));
        setTagInput('');
        return;
      }
      //중복일 경우 거르기

      if (tagList.indexOf(tagInput) !== -1) {
        if (tagInput.length === tagList[tagList.indexOf(tagInput)].length) {
          new Swal(t('duplicate tags are unable.'));
          setTagInput('');
          return;
        }
      }
      //글자 수 제한
      if (inputLength(tagInput) < 18) {
        //태그리스트에 담기
        setTagList([...tagList, tagInput]);

        //태그 갯수 제한
        if (tagList.length > 8) {
          setTagLimit(true);
        }
        setTagInput('');
        return;
      } else {
        new Swal(t('please write in 8 characters or less.'));
        return;
      }
    }
  };
  //태그삭제
  const deleteTag = (e) => {
    if (tagLimit) {
      setTagLimit(false);
    }
    setTagList(tagList.filter((tag, index) => index !== Number(e.target.id)));
  };

  //수업가능시간(시작) input값
  const [startTime, setStartTime] = useState(userInfo.startTime);
  const handleStartTime = (e) => {
    setStartTime(e.target.value);
  };

  //수업가능시간(종료) input값
  const [endTime, setEndTime] = useState(userInfo.endTime);
  const handleEndTime = (e) => {
    setEndTime(e.target.value);
  };
  //기존 수업시간을 시간선택옵션 초기값에 표시하기 위한 함수
  const startNum = userInfo.startTime ? Number(userInfo.startTime) : '';
  const endNum = userInfo.endTime ? Number(userInfo.endTime) : '';

  //유저정보 변경하기
  const editUser = (e) => {
    //비밀번호 변경 시 조건
    if (pwd) {
      if (pwdCheck !== t('this is the correct password format.')) {
        new Swal(t('please confirm the password you want to change.'));
        return;
      } else if (pwd !== confirmPwd) {
        new Swal(
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
        new Swal(t('please enter the password you want to change.'));
        return;
      } else if (pwdCheck !== t('this is the correct password format.')) {
        new Swal(t('please confirm the password you want to change.'));
        return;
      } else if (pwd !== confirmPwd) {
        new Swal(t('please enter the password you want to change.'));
        return;
      }
    }

    //자기소개 공백으로 채울 경우 리턴
    if (contents.split('').filter((word) => word !== ' ').length === 0) {
      if (contents.length > 0) {
        new Swal(t('self-introduction can not be filled with spaces.'));
        setContents('');
        return;
      }
    }
    //한 줄 소개 공백으로 채울 경우 리턴
    if (comment.split('').filter((word) => word !== ' ').length === 0) {
      if (comment.length > 0) {
        new Swal(t('comment can not be filled with spaces.'));
        setComment('');
        return;
      }
    }
    //선생님일 경우 모든 정보를 입력하도록 조건
    if (userInfo.isTutor === 1) {
      if (
        language1 === '' ||
        comment.split('').filter((word) => word !== ' ').length === 0 ||
        contents.split('').filter((word) => word !== ' ').length === 0 ||
        tagList.length === 0 ||
        startTime === '' ||
        endTime === ''
      ) {
        new Swal(t('tutor must fill out all the information.'));
        return;
      }
    }
    e.preventDefault();

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

      dispatch(userActions.uploadProfileDB(formData));
    }
    //추가정보 디스패치
    const userForm = {
      //유저정보 추가하기
      userEmail: userInfo.userEmail,
      userName: userInfo.userName,
      pwd: pwd ? pwd : accessInfo,
      language1: language1,
      language2: language2,
      language3: language3,
      contents: contents,
      comment: comment,
      tag: tagList.join(),
      isTutor: userInfo.isTutor.toString(),
      startTime: startTime,
      endTime: endTime,
    };

    dispatch(userActions.editUserDB(userForm));
  };

  const closeModal = () => {
    // 프로필사진만 바꾸고 나가는 경우
    if (userInfo.userProfile !== previewProfile) {
      if (previewProfile !== Profile) {
        window.location.reload();
      }
    }
    onClose();
  };

  return (
    <ContentWrap onClick={(e) => e.stopPropagation()}>
      <Content>
        <CloseBtn onClick={closeModal}>
          <img src={CloseIcon} alt="close" />
        </CloseBtn>
        <GroupBox1>
          <ImageBox>
            {/* 프로필이미지선택 */}
            <UserImg userProfile={previewProfile === Profile ? false : true}>
              <label htmlFor="file">
                <img src={previewProfile} alt="userProfile" />
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
            <button onClick={deleteProfile}>{t('remove image')}</button>
          </ImageBox>
          <UserInfoBox>
            <form>
              <p>{t('basic information')}</p>
              <InfoInput
                label={t('email')}
                value={userInfo.userEmail}
                disabled
                styles={{
                  height: '45px',
                  marginBottom: '5px',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  background: 'rgba(0,0,0,0.05)',
                  cursor: 'default',
                  color: '#999',
                }}
              />
              {/* 닉네임 */}
              <InfoInput
                label={t('nickname')}
                value={userInfo.userName}
                disabled
                styles={{
                  height: '45px',
                  marginBottom: '5px',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  background: 'rgba(0,0,0,0.05)',
                  cursor: 'default',
                  color: '#999',
                }}
              />
              {/* 비밀번호 */}
              <InfoInput
                type="password"
                label={t('new password')}
                placeholder={t('please enter a password to change.')}
                value={userInfo.pwd}
                autoComplete="off"
                validationLabel={pwdCheck}
                _onChange={handlePwd}
                styles={{
                  height: '45px',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                }}
              />
              {/* 비밀번호 확인 */}
              <InfoInput
                type="password"
                label={t('confirm password')}
                placeholder={t(
                  'please enter the password you want to change again.',
                )}
                autoComplete="off"
                validationLabel={confirmPwdCheck}
                _onChange={handleConfirmPwd}
                styles={{
                  height: '45px',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                }}
              />
            </form>
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
          <InfoInput
            label={t('self-introduction')}
            label2={contentsLength + `/400`}
            placeholder={t(
              'please feel free to introduce yourself to what you are doing, hobbies, personality, etc.',
            )}
            value={userInfo.contents}
            _onChange={handleContents}
            maxLength="400"
            multiLine
            styles={{
              height: '160px',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          />
          {/* 한 줄 소개 */}
          <InfoInput
            label={t('comment')}
            label2={commentLength + `/70`}
            placeholder={t('please write a comment.')}
            value={userInfo.comment}
            _onChange={handleComment}
            maxLength="70"
            styles={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          />
          {/* 태그 */}
          <InfoInput
            onlyBox
            styles={{
              height: '200px',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
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
              maxLength="16"
              onChange={handleTag}
              onKeyUp={inputTag}
              value={tagInput}
            />
            {/* 태그출력 */}
            <TagBox>
              {tagList.length > 0 ? (
                tagList.map((tag, index) => (
                  <div key={tag + index}>
                    <p>{tag}</p>
                    <button id={index} onClick={deleteTag}>
                      X
                    </button>
                  </div>
                ))
              ) : (
                <React.Fragment>
                  <span>{t('example')} :</span>
                  {exampleTag.map((example, index) => (
                    <div key={example + index}>
                      <p>{example}</p>
                    </div>
                  ))}
                </React.Fragment>
              )}
            </TagBox>
          </InfoInput>
        </GroupBox>
        {/* 수업시간 변경 */}
        <GroupBox>
          <SelectIsTutor
            startTime={Number(startTime)}
            endTime={Number(endTime)}
            startNum={startNum}
            endNum={endNum}
            title={t('change user setting')}
            checked={userInfo.isTutor === 1 ? 'isTutor' : 'isTutee'}
            _onChange={() => {}}
            handleStartTime={handleStartTime}
            handleEndTime={handleEndTime}
            isTutor={userInfo.isTutor}
          />
        </GroupBox>
        <GroupBox>
          <Button
            type="button"
            _onClick={editUser}
            styles={{ width: '380px', height: '60px' }}
          >
            {t('save modifications')}
          </Button>
        </GroupBox>
      </Content>
    </ContentWrap>
  );
};

export default EditUser;

const ContentWrap = styled.div`
  width: 800px;
  height: 700px;
  padding-top: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  position: relative;
  //스크롤바 관련
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    margin: 20px;
    background-color: #fff;
  }

  ::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #d3d3d3;
  }
`;

const Content = styled.div`
  width: 90%;
  height: 100%;
  background: red;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// 닫기 버튼
const CloseBtn = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 30px;
  left: 30px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

const GroupBox1 = styled.div`
  width: 100%;
  margin: 0 auto 20px;
  display: flex;
  border-bottom: 1px solid #c4c4c4;
`;
// 프로필사진 관련
const ImageBox = styled.div`
  width: 320px;
  padding-top: 20px;
  position: relative;
  button {
    margin-top: 25px;
    border: none;
    border-bottom: 1px solid #153587;
    background: none;
    font-size: 14px;
    font-weight: 600;
    color: #153587;
    cursor: pointer;
  }
`;

const UserImg = styled.div`
  width: 180px;
  height: 180px;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: ${(props) => (props.userProfile ? 'cover' : 'contain')};
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
  width: 45px;
  height: 45px;
  border-radius: 50px;
  background: #153587;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 155px;
  left: 152px;
  font-size: 30px;
  font-weight: 400;
  color: #fff;
`;

// 기본 정보
const UserInfoBox = styled.div`
  width: 100%;
  margin-left: 20px;
  p {
    height: 50px;
    text-align: start;
    font-size: 20px;
    font-weight: 600;
  }
  form {
    width: 100%;
  }
`;

const GroupBox = styled.div`
  width: 100%;
  // margin: 0 auto;
  padding: 20px 0;

  p {
    height: 50px;
    text-align: start;
    font-size: 20px;
    font-weight: 600;
  }
`;
//언어선택 컴포넌트 마진
const LanguageBox = styled.div`
  margin-bottom: 10px;
`;

const TagInput = styled.input`
  width: 100%;
  height: 30px;
  margin-bottom: 5px;
  border: none;
  font-size: 14px;
  font-weight: 400;
  ::-webkit-input-placeholder {
    font-size: 14px;
    color: b5b5b5;
  }
  &:focus {
    outline: none;
  }
`;

const TagBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  div {
    height: 30px;
    margin: 0 5px 10px 0;
    padding: 10px 10px 12px;
    display: flex;
    align-items: center;
    border-radius: 25px;
    border: 2px solid #959595;
  }

  p {
    height: 18px;
    margin-right: 5px;
    font-size: 14px;
    cursor: default;
  }

  button {
    background: transparent;
    border: none;
    margin-bottom: 2px;
    font-size: 16px;
    color: #8a8a8a;
    cursor: pointer;
  }

  span {
    padding: 5px 10px 30px 0;
    font-size: 14px;
    color: #8a8a8a;
  }
`;
