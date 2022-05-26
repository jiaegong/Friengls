import React from 'react';
import styled from 'styled-components';

const Inputs = (props) => {
  const {
    defaultStyles,
    styles,
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
  } = props;

  if (multiLine) {
    return (
      <TextareaStyled
        style={{ ...styles }}
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        defaultValue={value}
        disabled={disabled}
        maxLength={maxLength}
        {...defaultStyles}
      />
    );
  }
  return (
    <InputStyled
      style={{ ...styles }}
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
      {...defaultStyles}
      checked={checked}
    />
  );
};

Inputs.defaultProps = {
  multiLine: false,
  type: 'text',
  _onChange: () => {},
  disabled: false,
  placeholder: '',
  defaultStyles: {
    fontSize: '14px',
    fontWeight: '400',
  },
};

const InputStyled = styled.input`
  width: 100%;
  height: 54px;
  padding: 0 5px;
  border: 1px solid #8a8a8a;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  ::-webkit-input-placeholder {
    font-size: 12px;
    color: b5b5b5;
  }
  &:focus {
    outline: none;
  }
`;

const TextareaStyled = styled.textarea`
  width: 100%;
  height: 160px;
  font-size: 14px;
  border: none;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  ::-webkit-input-placeholder {
    /* padding: 10px 0; */
    font-size: 16px;
    color: b5b5b5;
  }
  &:focus {
    outline: none;
  }
  resize: none;
`;

export default Inputs;
