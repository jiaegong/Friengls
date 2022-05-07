import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const { styles, _onClick, children, className, defaultStyles } = props;

  return (
    <ButtonStyle
      className={className}
      style={{ ...styles }}
      onClick={_onClick}
      {...defaultStyles}
    >
      {children}
    </ButtonStyle>
  );
};

Button.defaultProps = {
  defaultStyles: {
    bg: '#fff',
    width: '',
    height: '',
    borderRadius: '4px',
  },
};

const ButtonStyle = styled.button`
  background-color: ${(props) => props.bg};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  cursor: pointer;
  transition: 0.2s;
`;

export default Button;
