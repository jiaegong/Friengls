import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
  const {
    styles,
    className,
    type,
    placeholder,
    _onChange,
    value,
    multiLine,
    defaultStyles,
  } = props;

  if (multiLine) {
    <TextareaStyled
      style={{ ...styles }}
      className={className}
      placeholder={placeholder}
      onChange={_onChange}
      value={value}
      {...defaultStyles}
    />;
  }
  return (
    <InputStyled
      style={{ ...styles }}
      className={className}
      type={type}
      placeholder={placeholder}
      onChange={_onChange}
      // value={value}
      {...defaultStyles}
    />
  );
};

Input.defaultProps = {
  multiLine: false,
  type: 'text',
  placeholder: '',
  value: '',
  _onChange: () => {},
  defaultStyles: {
    fontSize: '14px',
    fontWeight: '400',
    color: '#000',
    width: '300px',
    padding: '20px',
  },
};

const InputStyled = styled.input`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
`;

const TextareaStyled = styled.textarea`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
`;

export default Input;
