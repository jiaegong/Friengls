import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// 엘리먼트
import { InputLabel, InfoInput } from '../elements/index';

const SelectLanguage = (props) => {
  const { t } = useTranslation();
  const {
    language1,
    language2,
    language3,
    handleLanguage1,
    handleLanguage2,
    handleLanguage3,
    confirmed,
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
    <InfoInput
      onlyBox
      styles={{ flexDirection: 'column', alignItems: 'flex-start' }}
      confirmed={confirmed}
    >
      <LabelBox>
        <InputLabel>{t('select available language')}</InputLabel>
        <InputLabel>{t('maximum 3')}</InputLabel>
      </LabelBox>
      <SelectContainer>
        {/* 맵으로 돌리기 */}
        {/* 사용언어1 */}
        <Select name="language1" onChange={handleLanguage1}>
          <option value="">{language1 ? language1 : t('select')}</option>
          {languageList.map((language, index) => (
            <option value={language} key={language + index}>
              {language}
            </option>
          ))}
        </Select>

        {/* 사용언어2 */}
        <Select
          name="language2"
          onChange={handleLanguage2}
          disabled={!language1}
        >
          <option value="">{language2 ? language2 : t('select')}</option>
          {language2List.map((language, index) => (
            <option value={language} key={language + index}>
              {language}
            </option>
          ))}
        </Select>

        {/* 사용언어3 */}
        <Select
          name="language3"
          onChange={handleLanguage3}
          disabled={!(language1 && language2)}
        >
          <option value="">{language3 ? language3 : t('select')}</option>
          {language3List.map((language, index) => (
            <option value={language} key={language + index}>
              {language}
            </option>
          ))}
        </Select>
      </SelectContainer>
    </InfoInput>
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
  margin: 0 20px 5px 0;
  width: 130px;
  height: 24px;
  border: 1px solid #8a8a8a;
  border-radius: 8px;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;
