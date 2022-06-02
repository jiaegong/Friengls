import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Translator = () => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [source, setSource] = useState('en');
  const [target, setTarget] = useState('ko');
  const [result, setResult] = useState('');

  const language = [
    { value: 'en', name: 'English' },
    { value: 'ko', name: '한국어' },
    { value: 'ja', name: '日本語' },
    { value: 'zh-CN', name: '中文简体' },
    { value: 'zh-TW', name: '中文繁体' },
    { value: 'hi', name: 'हिन्दी' },
    { value: 'es', name: 'español' },
    { value: 'fr', name: 'Français' },
    { value: 'de', name: 'Deutsch' },
    { value: 'pt', name: 'Português' },
    { value: 'vi', name: 'tiếng Việt' },
    { value: 'id', name: 'Bahasa Indonesia' },
    { value: 'fa', name: 'زبان فارسی' },
    { value: 'ar', name: 'اللغة العربية' },
    { value: 'mm', name: 'ဗမာစာ မြန်မာစာ' },
    { value: 'th', name: 'ภาษาไทย' },
    { value: 'ru', name: 'русский язык' },
    { value: 'it', name: 'italiano' },
  ];

  const sourceValue = (e) => {
    setSource(e.target.value);
  };

  const targetValue = (e) => {
    setTarget(e.target.value);
  };

  const resultHandler = (data) => {
    setResult(data);
  };

  const translate = (source, target, text) => {
    return function () {
      axios({
        method: 'get',
        url: `https://hjg521.link/translate?source=${source}&target=${target}&text=${text}`,
      })
        .then((res) => {
          resultHandler(res.data);
        })
        .catch((err) => {
          console.log('번역에 실패했습니다!', err);
        });
    };
  };

  return (
    <Wrap>
      <select name="source" onChange={sourceValue} defaultValue={source}>
        {language.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.name}
          </option>
        ))}
      </select>
      <textarea
        className="translate-text"
        onBlur={(e) => {
          setText(e.target.value);
        }}
        onFocus={() => {
          if (!text) setResult('');
        }}
      />
      <button
        className="translate-button"
        onClick={translate(source, target, text)}
      >
        {t('translate')}
      </button>
      <select name="target" onChange={targetValue} defaultValue={target}>
        {language.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.name}
          </option>
        ))}
      </select>
      <textarea
        className="translate-result"
        value={result}
        onChange={resultHandler}
      />
    </Wrap>
  );
};

export default Translator;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: auto;
  max-width: 360px;
  box-sizing: border-box;
  gap: 10px;

  .translate-text {
    width: 100%;
    height: 100%;
    border: 2px solid #8a8a8a;
    outline-color: #171b78;
    border-radius: 10px;
    padding: 10px;
  }

  .translate-button {
    border: none;
    border-radius: 5px;
    padding: 8px;
    background-color: #7f83ea;
    color: #fff;
  }

  .translate-result {
    width: 100%;
    height: 100%;
    border: 2px solid #8a8a8a;
    outline-color: #171b78;
    border-radius: 10px;
    padding: 10px;
  }
`;
