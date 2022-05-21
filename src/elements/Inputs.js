import React from 'react';
import styled from 'styled-components';

const Inputs = (props) => {
  const {
    defaultStyles,
    styles,
    type,
    name,
    placeholder,
    _onChange,
    _onBlur,
    value,
    disabled,
    multiLine,
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
        {...defaultStyles}
      />
    );
  }
  return (
    <InputStyled
      style={{ ...styles }}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={_onChange}
      onBlur={_onBlur}
      defaultValue={value}
      disabled={disabled}
      {...defaultStyles}
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
    fontSize: '26px',
    fontWeight: '400',
  },
};

const InputStyled = styled.input`
  width: 100%;
  height: 35px;
  border: none;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  ::-webkit-input-placeholder {
    font-size: 20px;
    color: b5b5b5;
  }
  &: focus {
    outline: none;
  }
`;

const TextareaStyled = styled.textarea`
  width: 100%;
  height: 160px;
  border: none;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  ::-webkit-input-placeholder {
    padding: 10px 0;
    font-size: 20px;
    color: b5b5b5;
  }
  &: focus {
    outline: none;
  }
  resize: none;
`;

export default Inputs;
