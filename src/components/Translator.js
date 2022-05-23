import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Translator = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const resultHandler = (data) => {
    setResult(data);
  };

  const translate = () => {
    return function () {
      axios({
        method: 'get',
        url: `https://jg-jg.shop/translate/${text}`,
      })
        .then((res) => {
          resultHandler(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log('번역에 실패했습니다!', err);
        });
    };
  };

  return (
    <Wrap>
      <textarea
        className="translate-text"
        onBlur={(e) => {
          setText(e.target.value);
        }}
        onFocus={() => {
          if (!text) setResult('');
        }}
      />
      <button className="translate-button" onClick={translate}>
        번역하기
      </button>
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
  .translate-text {
    width: 100%;
    height: 100%;
    outline-color: #171b78;
    border: 1px solid #171b78;
  }

  .translate-button {
    width: 100px;
    background-color: #171b78;
    color: #fff;
    padding: 10px;
  }

  .translate-result {
    width: 100%;
    height: 100%;
    border: 1px solid #171b78;
  }
`;
