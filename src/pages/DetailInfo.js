import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { ProfileMedium } from '../image';
import { checkSpelling } from '../shared/common';

const DetailInfo = (props) => {
  //+ isTutor왜 두번씩 렌더링 되지? onClick함수랑 관련있는 듯 확인해볼 것
  //+ 완성도높이기1: 인풋값, 길이 제한하기
  //+ 완성도높이기2:
  //+ 완성도높이기3: 자연스러운 용어 사용하기

  const imageRef = useRef();
  const dispatch = useDispatch();

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

  //사용언어1 option
  const languageList = [
    '한국어',
    'English',
    '日本語',
    '中文',
    'Русский',
    'tiếng Việt',
    'ภาษาไทย',
    'français',
    'español',
    'हिन्दी भाषा',
  ];
  //사용언어1 input값
  const [language1, setLanguage1] = useState('');
  const handleLanguage1 = (e) => {
    setLanguage1(e.target.value);
  };
  //사용언어2 option
  const language2List = languageList.filter(
    (language) => language !== language1,
  );
  //사용언어2 input값
  const [language2, setLanguage2] = useState('');
  const handleLanguage2 = (e) => {
    setLanguage2(e.target.value);
  };
  //사용언어3 option
  const language3List = language2List.filter(
    (language) => language !== language2,
  );
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
  //태그 생성(빈 값일 경우 return)
  // + 중복일 경우(완전일치, 대소문자 구분없이) return 필요하다.
  const exampleTag = ['언어교환', '일상회화'];
  const inputTag = (e) => {
    if (e.keyCode === 32) {
      if (tagInput === ' ') {
        window.alert('태그를 입력해주세요');
        setTagInput('');
        return;
      }
      setTagList([...tagList, tagInput]);
      if (tagList.length > 8) {
        setTagLimit(true);
      }
      setTagInput('');
    }
  };
  //태그삭제
  const deleteTag = (e) => {
    console.log(e.target.id);
    setTagList(tagList.filter((tag, index) => index !== Number(e.target.id)));
  };

  //isTutor input값
  const [isTutor, setIsTutor] = useState(false);

  //수업가능시간(시작) option
  const startTimeArray = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  //수업가능시간(시작) input값
  const [startTime, setStartTime] = useState('');
  const handleStartTime = (e) => {
    console.log(e.target.value);
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
    console.log(e.target.value);
    setEndTime(e.target.value);
  };

  //사진업로드, 추가정보 디스패치
  const addDetailInfo = (e) => {
    //사진업로드
    if (language1 === '') {
      window.alert('사용언어는 최소 한 가지의 언어를 선택해 주세요.');
      return;
    }
    e.preventDefault();
    const profileImage = imageRef.current.files[0];
    console.log(profileImage);
    const formData = new FormData();
    formData.append('image', profileImage);

    for (let value of formData.values()) {
      console.log('업로드할 이미지데이터', value);
    }
    // dispatch(formData));

    //추가정보 디스패치
    const userForm = {
      //유저정보 추가하기
      tag: tagList.join(),
      language1: language1,
      language2: language2,
      language3: language3,
      commnt: comment,
      contents: contents,
      isTutor: isTutor,
      startTime: startTime,
      endTime: endTime,
    };
    console.log('전송할 유저정보', userForm);
    // dispatch(userActions.editUserDB(userForm));
    dispatch(userActions.editUser(userForm));
  };

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
      <Grid>
        {/* 사용언어1 */}
        <SelectBox>
          <span>사용하는 언어1:&nbsp;&nbsp;</span>
          <select name="language1" onChange={handleLanguage1}>
            <option value="">필수</option>
            {languageList.map((language, index) => (
              <option value={language} key={language + index}>
                {language}
              </option>
            ))}
          </select>
        </SelectBox>
      </Grid>
      {/* 사용언어2 */}
      <Grid>
        <SelectBox>
          <span>사용하는 언어2:&nbsp;&nbsp;</span>
          <select name="language2" onChange={handleLanguage2}>
            <option value="">선택</option>
            {language2List.map((language, index) => (
              <option value={language} key={language + index}>
                {language}
              </option>
            ))}
          </select>
        </SelectBox>
      </Grid>
      {/* 사용언어3 */}
      <Grid>
        <SelectBox>
          <span>사용하는 언어3:&nbsp;&nbsp;</span>
          <select name="language3" onChange={handleLanguage3}>
            <option value="">선택</option>
            {language3List.map((language, index) => (
              <option value={language} key={language + index}>
                {language}
              </option>
            ))}
          </select>
        </SelectBox>
        <Grid>
          <span>※ 사용하는 언어는 최소 한 종류의 언어를 선택해 주세요.</span>
        </Grid>
      </Grid>
      {/* 자기소개, 한 줄 소개 */}
      <Grid>
        <span>자신을 소개해 주세요</span>
        <Grid>
          <Textarea name="contents" onChange={handleContents} />
        </Grid>
      </Grid>
      <Grid>
        <span>한 줄 소개</span>
        <input name="comment" onChange={handleComment} />
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
        <label onClick={() => setIsTutor(true)}>
          <input type="radio" name="isTutor" value={true} />
          가르치고
        </label>
        <span> / </span>
        <label onClick={() => setIsTutor(false)}>
          <input type="radio" name="isTutor" value={false} />
          배우고
        </label>
        <span> 싶습니다.</span>
      </Grid>
      {/* 수업가능시간(선생님만) */}
      {isTutor && (
        <Grid>
          <span>수업가능시간 :&nbsp;&nbsp;&nbsp;</span>
          <select name="startTime" onChange={handleStartTime}>
            <option value="">=====시작시간=====</option>
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
                <option value="">=====종료시간=====</option>
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
      <button
        type="button"
        onClick={() => {
          history.push('/');
        }}
      >
        건너뛰기
      </button>
      <button type="submit" onClick={addDetailInfo}>
        추가정보 제출
      </button>
    </Container>
  );
};

const Container = styled.div`
  width: 60vw;
  margin: auto;
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
