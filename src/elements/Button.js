import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const { type, _onClick, text, defaultStyles, styles, children, href } = props;

  return (
    <BlueBtn
      style={{ ...styles }}
      onClick={_onClick}
      type={type}
      href={href}
      {...defaultStyles}
    >
      {text ? text : children}
    </BlueBtn>
  );
};

Button.defaultProps = {
  _onClick: () => {},
  text: false,
  children: null,
  defaultStyles: {
    width: '100%',
    height: '54px',
    margin: false,
    padding: false,
    fontSize: '16px',
    bold: 600,
    color: '#fff',
    backgroundColor: '#153587',
  },
};

const BlueBtn = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.backgroundColor};
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.bold};
  color: ${(props) => props.color};
`;

export default Button;
