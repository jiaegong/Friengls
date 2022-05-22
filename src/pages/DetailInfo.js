import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as profileActions } from '../redux/modules/profile';
import { Logo, ProfileMedium } from '../image';
import SelectLanguage from '../components/SelectLanguage';
import { InputBox, InputLabel, Inputs, Buttons } from '../elements';

// to do: 자기소개, 한 줄 소개, 태그 글자수제한
//to do: 태그 영어 대소문자 중복 거르기
// to do: 글자수 제한 조건에 따라 색 변경
//to do: 로그인상태에서 로그인 회원가입 페이지는 들어가져야 할까?
//to do: 안내 사항 호버 시 나오도록
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
  //태그 생성(빈 값, 중복일 경우 return)
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
  const handleIstutor = (e) => {
    setIsTutor(e.target.value);
  };

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

    dispatch(userActions.signupDB(formData, loginInfo));

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

  return (
    <Container>
      {/* 로고 */}
      <LogoBox>
        <img src={Logo} alt="userProfileImage" />
      </LogoBox>
      <LogoText>Sign in</LogoText>
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
      <InputBox
        styles={{
          height: '210px',
          justifyContent: 'flex-start',
        }}
      >
        <LabelWrap>
          <InputLabel>자기 소개</InputLabel>
          <p>{contents.length}/200</p>
        </LabelWrap>
        <Inputs
          multiLine
          placeholder={
            '하고 있는 일, 취미, 성격 등 자유롭게 자신을 소개해 주세요.'
          }
          name="contents"
          _onChange={handleContents}
          maxLength={200}
        />
      </InputBox>
      {/* 한 줄 소개 */}
      <InputBox>
        <LabelWrap>
          <InputLabel>한 줄 소개</InputLabel>
          <p>{comment.length}/40</p>
        </LabelWrap>
        <Inputs
          placeholder={'간략한 인사말을 작성해 주세요.'}
          name="comment"
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
        <InputLabel>태그</InputLabel>
        {/* 태그입력 */}
        <TagInput
          disabled={tagLimit}
          placeholder={
            tagLimit
              ? '10개까지 등록할 수 있어요'
              : '단어 입력 후 스페이스로 태그 등록'
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
              <span>예시 :</span>
              {exampleTag.map((example, index) => (
                <div key={example + index}>
                  <p>{example}</p>
                </div>
              ))}
            </>
          )}
        </TagBox>
      </InputBox>
      {/* isTutor */}
      <TimeBox>
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
            _onClick={handleIstutor}
            styles={{
              width: '140px',
              marginLeft: '10px',
              alignItems: 'center',
              fontSize: '26px',
              cursor: 'pointer',
            }}
          >
            <Inputs
              type="radio"
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
            _onClick={handleIstutor}
            styles={{
              width: '180px',
              marginLeft: '10px',
              alignItems: 'center',
              fontSize: '26px',
              cursor: 'pointer',
            }}
          >
            <Inputs
              type="radio"
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
        {isTutor === '1' && (
          <Grid>
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
              <TimeSelectBox>
                수업 가능한 시간 :
                <Select name="startTime" onChange={handleStartTime}>
                  <option value="">=====첫 수업=====</option>
                  {startTimeArray.map((time, index) => (
                    //+ 키 유저아이디 같은걸로 바꿔주기
                    <option value={time} key={index}>
                      {time + 1}회차: {time}:00 - {time + 1}:00
                    </option>
                  ))}
                </Select>
                부터
                {startTime === '' ? (
                  <></>
                ) : (
                  <>
                    <Select name="endTime" onChange={handleEndTime}>
                      <option value="">=====마지막 수업=====</option>
                      {endTimeArray.map((time, index) => (
                        <option value={time} key={startTime + index}>
                          {time + 1}회차: {time}:00 - {time + 1}:00
                        </option>
                      ))}
                    </Select>
                    까지
                  </>
                )}
              </TimeSelectBox>
            </InputBox>
            <InfoBox>
              <span>※ 수업은 한 회차에 30분 씩 진행됩니다.</span>
              <span>※ 수업은 2회차 단위로 구성할 수 있습니다.</span>
              <span>※ 최소 2회차, 최대 12회차까지 수업할 수 있습니다.</span>
            </InfoBox>
          </Grid>
        )}
      </TimeBox>

      {/* 버튼 */}
      <ButtonBox>
        <Buttons
          type="submit"
          _onClick={addUser}
          styles={{ width: '200px', background: '#ababab' }}
        >
          건너뛰기
        </Buttons>
        <Buttons
          type="submit"
          _onClick={addUser}
          styles={{ width: '590px', marginLeft: '10px' }}
        >
          회원가입
        </Buttons>
      </ButtonBox>
      {/* </form> */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  margin: 200px auto;
`;
// 로고관련
const LogoBox = styled.div`
  width: 97px;
  height: 60px;
  margin: 0 auto 20px;
  overflow: hidden;
`;

const LogoText = styled.p`
  font-size: 44px;
  font-weight: 700;
  color: #153587;
`;

const ImageBox = styled.div`
  width: 240px;
  height: 240px;
  margin: 60px auto;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const ImgInput = styled.input`
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
`;

// 라벨, 글자수제한 정렬
const LabelWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  p {
    color: #404040;
    // 글씨색 조건주기
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

  div {
    height: 50px;
    max-width: 180px;
    margin: 0 15px 10px 0;
    padding: 10px 10px 12px;
    display: flex;
    align-items: center;
    border-radius: 25px;
    border: 2px solid #959595;
  }

  p {
    margin-right: 10px;
    font-size: 16px;
  }

  button {
    background: transparent;
    border: none;
    margin-top: 2px;
    font-size: 25px;
    color: #8a8a8a;
    cursor: pointer;
  }

  span {
    padding: 30px 10px 30px 0;
    font-size: 20px;
    color: #8a8a8a;
  }
`;

//수업시간 선택 관련
const TimeBox = styled.div`
  width: 100%;
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

const Grid = styled.div`
  // margin: 10px;
`;

const TimeSelectBox = styled.div`
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  width: 250px;
  height: 50px;
  margin: 0 20px;
  border: 1px solid #8a8a8a;
  border-radius: 8px;
  font-size: 20px;
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

export default DetailInfo;
