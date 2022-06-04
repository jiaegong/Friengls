import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
  const {
    type,
    name,
    id,
    placeholder,
    _onChange,
    _onKeyUp,
    _onBlur,
    value,
    disabled,
    maxLength,
    checked,
    readOnly,
    autoComplete,
    multiLine,
    styles,
    defaultStyles,
  } = props;

  if (multiLine) {
    return (
      <Textarea
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        defaultValue={value}
        disabled={disabled}
        maxLength={maxLength}
        style={{ ...styles }}
        {...defaultStyles}
      />
    );
  }
  return (
    <InputNormal
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={_onChange}
      onKeyUp={_onKeyUp}
      onBlur={_onBlur}
      defaultValue={value}
      disabled={disabled}
      maxLength={maxLength}
      checked={checked}
      readOnly={readOnly}
      autoComplete={autoComplete}
      style={{ ...styles }}
      {...defaultStyles}
    />
  );
};

Input.defaultProps = {};

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  padding-top: 5px;
  border: none;
  font-size: 14px;
  font-weight: 400;
  resize: none;
  ::-webkit-input-placeholder {
    font-size: 14px;
    color: b5b5b5;
  }
  &:focus {
    outline: none;
  }
`;

const InputNormal = styled.input`
  width: 100%;
  height: 25px;
  border: none;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  ::-webkit-input-placeholder {
    font-size: 14px;
    color: b5b5b5;
  }
  &:focus {
    outline: none;
  }
`;

export default Input;
