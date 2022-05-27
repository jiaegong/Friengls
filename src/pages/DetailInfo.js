import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { Logo, Profile } from '../image/index';
import SelectLanguage from '../components/SelectLanguage';
import { Buttons, NewInputLabel } from '../elements';
import InfoInput from '../components/InfoInput';
import { useTranslation } from 'react-i18next';

// to do: 자기소개, 한 줄 소개, 태그 글자수제한
//to do: 태그 영어 대소문자 중복 거르기
// to do: 글자수 제한 조건에 따라 색 변경
//to do: 로그인상태에서 로그인 회원가입 페이지는 들어가져야 할까?
//to do: 안내 사항 호버 시 나오도록
const DetailInfo = (props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const imageRef = useRef();
  const dispatch = useDispatch();

  //singup페이지에서 가져온 데이터
  const userInfo = location.signupForm;

  // 이미지 미리보기
  const [previewProfile, setPreviewProfile] = useState(Profile);
  const selectFile = (e) => {
    const previewFile = imageRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(previewFile);
    reader.onloadend = () => {
      setPreviewProfile(reader.result);
    };
  };

  //사용언어1 input값
  const [language1, setLanguage1] = useState('');
  const handleLanguage1 = (e) => {
    setLanguage1(e.target.value);
  };

  //사용언어2 input값
  const [language2, setLanguage2] = useState('');
  const handleLanguage2 = (e) => {
    setLanguage2(e.target.value);
  };

  //사용언어3 input값
  const [language3, setLanguage3] = useState('');
  const handleLanguage3 = (e) => {
    setLanguage3(e.target.value);
  };

  //자기소개 input값
  const [contents, setContents] = useState('');
  const handleContents = (e) => {
    setContents(e.target.value);
  };

  //한줄소개 input값
  const [comment, setComment] = useState('');
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  //태그 input값
  const [tagInput, setTagInput] = useState('');
  const [tagList, setTagList] = useState([]);
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
  //유저정보 디스패치
  const addUser = (e) => {
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
    if (userInfo.isTutor === '1') {
      if (
        language1 === '' ||
        comment.split('').filter((word) => word !== ' ').length === 0 ||
        contents.split('').filter((word) => word !== ' ').length === 0 ||
        tagList.length === 0
      ) {
        window.alert(t('tutor must fill out all the information.'));
        return;
      }
    }
    e.preventDefault();
    const profileImage = imageRef.current.files[0];
    //폼데이터에 유저정보 담기
    const formData = new FormData();
    formData.append('userProfile', profileImage);
    formData.append('userEmail', userInfo.userEmail);
    formData.append('userName', userInfo.userName);
    formData.append('pwd', userInfo.pwd);
    formData.append('pwdCheck', userInfo.pwdCheck);
    formData.append('language1', language1);
    formData.append('language2', language2);
    formData.append('language3', language3);
    formData.append('comment', comment);
    formData.append('contents', contents);
    formData.append('tag', tagList.join());
    formData.append('isTutor', userInfo.isTutor);
    if (userInfo.isTutor === '1') {
      formData.append('startTime', userInfo.startTime);
      formData.append('endTime', userInfo.endTime);
    }
    //로그인에 필요한 유저정보
    const loginInfo = { userEmail: userInfo.userEmail, pwd: userInfo.pwd };
    dispatch(userActions.signupDB(formData, loginInfo));
  };
  // 새로고침 시 필수정보가 사라져 다시 작성하도록 유도
  if (!userInfo) {
    window.alert(t('refreshing will return to the first screen.'));
    history.replace('/signup');
  }

  console.log(comment);

  return (
    <Container>
      {/* 로고 */}
      <LogoBox>
        <img src={Logo} alt="userProfileImage" />
      </LogoBox>
      <LogoText>{t('signup')}</LogoText>
      {/* 프로필등록 */}
      {/* <form> */}
      <label htmlFor="file">
        <ImageBox>
          <Image src={previewProfile} />
          <ImgInput
            type="file"
            ref={imageRef}
            onChange={selectFile}
            accept="image/*"
            id="file"
          />
          <ProfileAddButton htmlFor="file">+</ProfileAddButton>
        </ImageBox>
      </label>

      {/* 언어선택 컴포넌트 */}
      <SelectLanguage
        language1={language1}
        language2={language2}
        handleLanguage1={handleLanguage1}
        handleLanguage2={handleLanguage2}
        handleLanguage3={handleLanguage3}
      />
      {/* 자기소개 */}
      <InfoInput
        label={t('self-introduction')}
        label2={contents.length + `/500`}
        placeholder={t(
          'please feel free to introduce yourself to what you are doing, hobbies, personality, etc.',
        )}
        _onChange={handleContents}
        maxLength={500}
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
        label2={comment.length + `/40`}
        placeholder={t('please write a comment.')}
        _onChange={handleComment}
        maxLength={40}
        styles={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      />
      {/* 태그 */}
      <InfoInput
        onlyBox
        styles={{
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <NewInputLabel>{t('tag')}</NewInputLabel>
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
      </InfoInput>
      {/* 버튼 */}
      <ButtonBox>
        <Buttons
          type="submit"
          _onClick={addUser}
          styles={{ width: '125px', background: '#ababab' }}
        >
          {t('skip')}
        </Buttons>
        <Buttons
          type="submit"
          _onClick={addUser}
          styles={{ width: '365px', marginLeft: '10px' }}
        >
          {t('signup')}
        </Buttons>
      </ButtonBox>
      {/* </form> */}
    </Container>
  );
};
const Container = styled.div`
  width: 500px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
// 로고관련
const LogoBox = styled.div`
  width: 96px;
  height: 80px;
  margin: 0 auto 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;

const LogoText = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #153587;
  cursor: default;
`;

const ImageBox = styled.div`
  width: 180px;
  height: 180px;
  margin: 60px auto 30px;
  background: #c4c4c4;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ImgInput = styled.input`
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
`;

const ProfileAddButton = styled.label`
  width: 45px;
  height: 45px;
  padding-bottom: 10px;
  border-radius: 50px;
  background: #153587;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 311px;
  left: 295px;
  font-size: 40px;
  font-weight: 600;
  color: #fff;
`;

// 태그 관련
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
  &: focus {
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
    max-width: 180px;
    margin: 0 5px 10px 0;
    padding: 10px 10px 12px;
    display: flex;
    align-items: center;
    border-radius: 25px;
    border: 2px solid #959595;
    // background: red;
  }

  p {
    margin-right: 5px;
    font-size: 14px;
    cursor: default;
  }

  button {
    background: transparent;
    border: none;
    margin-top: 2px;
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

//버튼 관련
const ButtonBox = styled.div`
  width: 100%;
  margin-top: 60px;
`;

export default DetailInfo;
