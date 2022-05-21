import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as profileActions } from '../redux/modules/profile';
import { ProfileMedium } from '../image';
import { checkSpelling } from '../shared/common';
import SelectLanguage from '../components/SelectLanguage';
import { getCookie } from '../shared/Cookie';

const DetailInfo = (props) => {
  const location = useLocation();
  const imageRef = useRef();
  const dispatch = useDispatch();

  //singup페이지에서 가져온 데이터
  const userInfo = location.signupForm;

  // 이미지 미리보기
  const [previewProfile, setPreviewProfile] = useState(ProfileMedium);
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
  // console.log(contents);

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
  //태그 생성(빈 값일 경우 return)
  // + 중복일 경우(완전일치, 대소문자 구분없이) return 필요하다.
  // 특수문자 사용하지 못하도록
  const exampleTag = ['언어교환', '일상회화'];
  const inputTag = (e) => {
    if (e.keyCode === 32) {
      //공백일 경우 거르기
      if (tagInput.split('').filter((word) => word !== ' ').length === 0) {
        window.alert('태그를 입력해주세요');
        setTagInput('');
        return;
      }
      //중복일 경우 거르기
      //to do: 대소문자 중복도 걸러야 할듯
      if (tagList.indexOf(tagInput) !== -1) {
        if (tagInput.length === tagList[tagList.indexOf(tagInput)].length) {
          window.alert('중복x');
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
  const [isTutor, setIsTutor] = useState('0');

  //수업가능시간(시작) option
  const startTimeArray = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  //수업가능시간(시작) input값
  const [startTime, setStartTime] = useState('');
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
  const [endTime, setEndTime] = useState('');
  const handleEndTime = (e) => {
    setEndTime(e.target.value);
  };

  //유저정보 디스패치
  const addUser = (e) => {
    //선생님일 경우 모든 정보를 입력하도록 조건
    if (isTutor === '1') {
      if (
        language1 === '' ||
        comment === '' ||
        contents === '' ||
        tagList.length === 0 ||
        startTime === '' ||
        endTime === ''
      ) {
        window.alert('선생님은 모든 정보를 작성해주세요');
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
    formData.append('isTutor', isTutor);
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);
    //로그인에 필요한 유저정보
    const loginInfo = { userEmail: userInfo.userEmail, pwd: userInfo.pwd };
    console.log(language1, language2, language3);
    // dispatch(userActions.signupDB(formData, loginInfo));

    // //추가정보 디스패치
    // const userForm = {
    //   //유저정보 추가하기
    //   userEmail: userInfo.userEmail,
    //   userName: userInfo.userName,
    //   pwd: userInfo.pwd,
    //   pwdCheck: userInfo.pwdCheck,
    //   tag: tagList.join(),
    //   language1: language1,
    //   language2: language2,
    //   language3: language3,
    //   comment: comment,
    //   contents: contents,
    //   isTutor: isTutor,
    //   startTime: startTime,
    //   endTime: endTime,
    // };
    // console.log('전송할 유저정보', userForm);

    // // dispatch(profileActions.uploadProfileDB(formData));
  };
  // 새로고침 시 필수정보가 사라져 다시 작성하도록 유도
  if (!userInfo) {
    window.alert('새로고침 처음 화면으로 돌아갑니다.');
    history.replace('/signup');
  }

  //to do: 로그인상태에서 로그인 회원가입 페이지는 들어가져야 할까?

  return (
    <Container>
      {/* 프로필등록 */}
      <form>
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
          </ImageBox>
        </label>
      </form>
      {/* 언어선택 컴포넌트 */}
      <SelectLanguage
        language1={language1}
        language2={language2}
        handleLanguage1={handleLanguage1}
        handleLanguage2={handleLanguage2}
        handleLanguage3={handleLanguage3}
      />
      {/* 자기소개, 한 줄 소개 */}
      <Grid>
        <span>자신을 소개해 주세요</span>
        <Grid>
          <Textarea name="contents" onChange={handleContents} maxLength={200} />
          {/* 시간되면 글자수제한 로직짜기 */}
          <span>{contents.length}/200</span>
        </Grid>
      </Grid>
      <Grid>
        <span>한 줄 소개</span>
        <input name="comment" onChange={handleComment} maxLength={40} />
        {/* 시간되면 글자수제한 로직짜기 */}
        <span>{comment.length}/40</span>
      </Grid>
      {/* 태그 */}
      <TagBox>
        <input
          disabled={tagLimit}
          placeholder={
            tagLimit ? '10개까지 등록할 수 있어요' : ' 스페이스로 태그 등록'
          }
          name="tag"
          onChange={handleTag}
          onKeyUp={inputTag}
          value={tagInput}
        />
        {tagList.length > 0 ? (
          tagList.map((tag, index) => (
            <Tag key={tag + index}>
              <span>{tag}</span>
              <button id={index} onClick={deleteTag}>
                삭제
              </button>
            </Tag>
          ))
        ) : (
          <div>
            <TagBox>
              <span>&nbsp;&nbsp;예시: </span>
              {exampleTag.map((example, index) => (
                <Tag key={example + index}>
                  <span>{example}</span>
                </Tag>
              ))}
            </TagBox>
          </div>
        )}
      </TagBox>
      {/* isTutor */}
      <Grid>
        <span>'user' 님은 한국어를 </span>
        <label onClick={() => setIsTutor('1')}>
          <input type="radio" name="isTutor" value={'1'} />
          가르치고
        </label>
        <span> / </span>
        <label onClick={() => setIsTutor('0')}>
          <input type="radio" name="isTutor" value={'0'} />
          배우고
        </label>
        <span> 싶습니다.</span>
      </Grid>
      {/* 수업가능시간(선생님만) */}
      {isTutor === '1' && (
        <Grid>
          <span>수업가능시간 :&nbsp;&nbsp;&nbsp;</span>
          <select name="startTime" onChange={handleStartTime}>
            <option value="">=====첫 수업=====</option>
            {startTimeArray.map((time, index) => (
              //+ 키 유저아이디 같은걸로 바꿔주기
              <option value={time} key={index}>
                {time + 1}회차: {time}:00 - {time + 1}:00
              </option>
            ))}
          </select>
          <span>&nbsp;&nbsp;부터&nbsp;&nbsp;</span>
          {startTime === '' ? (
            <></>
          ) : (
            <>
              <select name="endTime" onChange={handleEndTime}>
                <option value="">=====마지막 수업=====</option>
                {endTimeArray.map((time, index) => (
                  <option value={time} key={startTime + index}>
                    {time + 1}회차: {time}:00 - {time + 1}:00
                  </option>
                ))}
              </select>
              <span>&nbsp;&nbsp;까지&nbsp;&nbsp;</span>
            </>
          )}
          <InfoBox>
            <span>※ 수업은 한 회차에 30분 씩 진행됩니다.</span>
            <span>※ 수업은 2회차 단위로 구성할 수 있습니다.</span>
            <span>※ 최소 2회차, 최대 12회차까지 수업할 수 있습니다.</span>
          </InfoBox>
        </Grid>
      )}
      {/* 버튼 */}
      <button type="submit" onClick={addUser}>
        건너뛰기
      </button>
      <button type="submit" onClick={addUser}>
        추가정보 제출
      </button>
    </Container>
  );
};

const Container = styled.div`
  width: 60vw;
  margin: auto;
  padding: 20px;
  border: 2px solid black;
  border-radius: 10px;
  margin: 60px auto;
  gap: 10px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
`;

const Grid = styled.div`
  margin: 10px;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  width: 80px;
  height: 80px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
`;

// 이미지 파일 선택하는 기본 버튼 숨기기
const ImgInput = styled.input`
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
`;

const SelectBox = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: row;
`;

const TagBox = styled.div`
  margin: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Tag = styled.div`
  margin: auto 10px;
  padding: 5px 10px;
  border-radius: 10px;
  border: 2px solid skyblue;
`;

const Textarea = styled.textarea`
  width: 80%;
  height: 200px;
  resize: none;
`;

const InfoBox = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

export default DetailInfo;
