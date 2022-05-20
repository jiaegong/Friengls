import React from 'react';
import styled from 'styled-components';

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
    <React.Fragment>
      <Grid>
        {/* 사용언어1 */}
        <SelectBox>
          <span>사용하는 언어1:&nbsp;&nbsp;</span>
          <select name="language1" onChange={handleLanguage1}>
            <option value="">선택</option>
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
    </React.Fragment>
  );
};

export default SelectLanguage;

const Grid = styled.div`
  margin: 10px;
`;

const SelectBox = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: row;
`;
