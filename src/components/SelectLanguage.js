import { Rowing } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { InputBox, InputLabel } from '../elements/index';

const SelectLanguage = (props) => {
  const {
    language1,
    language2,
    handleLanguage1,
    handleLanguage2,
    handleLanguage3,
  } = props;
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

  //사용언어2 option
  const language2List = languageList.filter(
    (language) => language !== language1,
  );

  //사용언어3 option
  const language3List = language2List.filter(
    (language) => language !== language2,
  );

  return (
    <InputBox styles={{ height: '70px' }}>
      <LabelBox>
        <InputLabel styles={{ fontSize: '14px', marginBottom: '4px' }}>
          활용 가능 언어 선택
        </InputLabel>
        <InputLabel styles={{ fontSize: '14px' }}>최대 3개</InputLabel>
      </LabelBox>
      <SelectContainer>
        {/* 사용언어1 */}
        <Select name="language1" onChange={handleLanguage1}>
          <option value="">선택</option>
          {languageList.map((language, index) => (
            <option value={language} key={language + index}>
              {language}
            </option>
          ))}
        </Select>

        {/* 사용언어2 */}
        <Select name="language2" onChange={handleLanguage2}>
          <option value="">선택</option>
          {language2List.map((language, index) => (
            <option value={language} key={language + index}>
              {language}
            </option>
          ))}
        </Select>

        {/* 사용언어3 */}
        <Select name="language3" onChange={handleLanguage3}>
          <option value="">선택</option>
          {language3List.map((language, index) => (
            <option value={language} key={language + index}>
              {language}
            </option>
          ))}
        </Select>
      </SelectContainer>
    </InputBox>
  );
};

export default SelectLanguage;

const LabelBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Select = styled.select`
  margin-right: 20px;
  width: 160px;
  height: 30px;
  border: 1px solid #8a8a8a;
  border-radius: 8px;
`;
