import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
  const { styles, children, className, _onClick, defaultStyles } = props;

  return (
    <TextStyled
      style={{ ...styles }}
      onClick={_onClick}
      className={className}
      {...defaultStyles}
    >
      {children}
    </TextStyled>
  );
};

Text.defaultProps = {
  defaultStyles: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#000',
  },
};

const TextStyled = styled.p`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;

export default Text;
