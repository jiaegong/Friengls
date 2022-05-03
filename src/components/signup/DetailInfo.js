import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

const DetailInfo = (props) => {
  const {} = props;

  //유저정보를 저장할 form
  const [form, setForm] = useState({
    userEmail: '',
    userName: '',
    pwd: '',
    pwdCheck: '',
    firstLanguage: '',
    learnLanguage: '',
    userProfile: '',
    tag: '',
    contents: '',
  });
  //각각 input에 입력한 값을 넣기 위한 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);

    setForm({ ...form, [name]: value });
  };
  //사진관련
  const selectProfile = (e) => {
    console.log(e.target);
    console.log(e.target.files[0]);
    console.log();
  };

  const signup = () => {
    console.log('최종 보낼 데이터', form);
  };

  return (
    <Container>
      <li>환영합니다 {form.userName}님!</li>
      <li>추가정보는 마이페이지에서도 작성할 수 있어요!</li>
      <a href="/login">지금은 쓰고 싶지 않아요.. </a>
      <div>
        <input type="file" name="userProfile" onChange={selectProfile} />
      </div>
      <div>
        <select
          name="firstLanguage"
          value={form.firstLanguage}
          onChange={handleChange}
        >
          <option value="">사용언어</option>
          <option value="한국어">한국어</option>
          <option value="영어">영어</option>
          <option value="일본어">일본어</option>
          <option value="중국어">중국어</option>
          <option value="기타">기타</option>
        </select>
      </div>
      <div>
        <select
          name="learnLanguage"
          value={form.learnLanguage}
          onChange={handleChange}
        >
          <option value="">관심언어</option>
          <option value="한국어">한국어</option>
          <option value="영어">영어</option>
          <option value="일본어">일본어</option>
          <option value="중국어">중국어</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <div>
        <input
          placeholder="관심주제를 입력 후 스페이스바를 눌러 등록하세요"
          type="text"
          name="tag"
          value={form.tag}
          onChange={handleChange}
        />
        <li>예: '영어', '어학연수'</li>
      </div>
      <div>
        <input
          placeholder="자신을 소개해주세요"
          type="text"
          name="contents"
          value={form.contents}
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={signup}>가입하기</button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 50vw;
  margin: auto;
`;

export default DetailInfo;
