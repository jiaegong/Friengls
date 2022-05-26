import React from 'react';
import styled from 'styled-components';

const NewInput = (props) => {
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
    multiLine,
    checked,
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
    <Input
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
      style={{ ...styles }}
      {...defaultStyles}
    />
  );
};

NewInput.defaultProps = {};

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
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

const Input = styled.input`
  width: 100%;
  height: 20px;
  border: none;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  ::-webkit-input-placeholder {
    font-size: 14px;
    color: b5b5b5;
  }
  &:focus {
    outline: none;
  }
`;

export default NewInput;
