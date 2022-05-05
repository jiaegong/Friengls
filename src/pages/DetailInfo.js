import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { ProfileMedium } from '../image';

const DetailInfo = (props) => {
  // 사진업로드: formdata
  // 태그: onSpace 같은 것 찾아보기
  // 사용언어는 어떻게 하지?
  // 폼데이터에 데이터 저장하려면 useState값으로 저장해야 하나?

  //test
  const imageRef = useRef();
  // const preview = useSelector((state) => state.image.preview);

  // 이미지 미리보기(데이터URL을 스테이트로?)

  const selectFile = (e) => {
    const profileImage = imageRef.current.files[0];

    console.log(profileImage);
    // dispatch(imageActions.getPreview(e));
  };

  //사용언어 option설정
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

  //사용언어2 input값
  const language2List = languageList.filter(
    (language) => language !== language1,
  );
  const [language2, setLanguage2] = useState('');
  const handleLanguage2 = (e) => {
    setLanguage2(e.target.value);
  };
  //사용언어3 input값
  const language3List = language2List.filter(
    (language) => language !== language2,
  );
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
  const [tag, setTag] = useState('');
  const handleTag = (e) => {
    setTag(e.target.value);
  };

  //isTutor왜 두번씩 렌더링 되지? onClick함수랑 관련있는 듯 확인해볼 것
  //isTutor input값
  const [isTutor, setIsTutor] = useState(false);

  //수업가능시간(시작) option설정
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
  // 추가정보 디스패치
  const addDetailInfo = (e) => {
    if (language1 === '') {
      window.alert('사용언어는 최소 한 가지의 언어를 선택해 주세요.');
      return;
    }
    e.preventDefault();
    const profileImage = imageRef.current.files[0];

    console.log(profileImage);
    const formData = new FormData();
    formData.append('image', profileImage);
    formData.append('language1', language1);
    formData.append('language2', language2);
    formData.append('language3', language3);
    formData.append('contents', contents);
    formData.append('comment', comment);
    formData.append('tag', tag);
    formData.append('isTutor', isTutor);
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);

    for (let value of formData.values()) {
      console.log(value);
    }
    // dispatch(formData));
  };

  return (
    <Container>
      <form>
        <label htmlFor="file">
          <ImageBox>
            <Image src={ProfileMedium} />
            <ImgInput
              type="file"
              ref={imageRef}
              onChange={selectFile}
              accept="image/*"
              id="file"
            />
          </ImageBox>
        </label>
        <Grid>
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
        <Grid>
          <span>자신을 소개해 주세요</span>
          <Textarea name="contents" onChange={handleContents} />
        </Grid>
        <Grid>
          <span>한 줄 소개</span>
          <input name="comment" onChange={handleComment} />
        </Grid>
        <Grid>
          <span>태그</span>
          <input name="tag" onChange={handleTag} />
        </Grid>
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
        <Grid>
          <span>수업가능시간 :&nbsp;&nbsp;&nbsp;</span>
          <select name="startTime" onChange={handleStartTime}>
            <option value="">=====시작시간=====</option>
            {startTimeArray.map((time, index) => (
              //키 유저아이디 같은걸로 바꿔주기
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
      </form>
      <button type="button">건너뛰기</button>
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

const Div = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background: red;
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
  @media screen and (max-width: 767px) {
    width: 56px;
    height: 56px;
  }
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
