import React from 'react';
import styled from 'styled-components';

const Inputs = (props) => {
  const {
    defaultStyles,
    styles,
    type,
    placeholder,
    _onChange,
    value,
    multiLine,
    disabled,
  } = props;

  console.log(props);

  if (multiLine) {
    <TextareaStyled
      style={{ ...styles }}
      placeholder={placeholder}
      onChange={_onChange}
      {...defaultStyles}
    />;
  }
  return (
    <InputStyled
      style={{ ...styles }}
      type={type}
      placeholder={placeholder}
      onChange={_onChange}
      defaultValue={value}
      disabled={disabled}
      {...defaultStyles}
    />
  );
};

Inputs.defaultProps = {
  multiLine: false,
  type: 'text',
  placeholder: '',
  _onChange: () => {},
  disabled: false,
  defaultStyles: {
    width: '860px',
    height: '80px',
    margin: false,
    padding: '0 0 0 10px',
    borderRadius: '8px',
    fontSize: '26px',
    fontWeight: '400',
    color: '#000',
    placeholderFontSize: '26px',
  },
};

const InputStyled = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderRadius};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  ::placeholder {
    font-size: ${(props) => props.placeholderFontSize};
  }
  //   padding: ${(props) => props.padding};
  //   box-sizing: border-box;
`;

const TextareaStyled = styled.textarea`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
`;

export default Inputs;
