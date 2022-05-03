import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
  const { styles, children, className, _onClick } = props;

  return (
    <TextStyled style={{ ...styles }} onClick={_onClick} className={className}>
      {children}
    </TextStyled>
  );
};

Text.defaultProps = {
  fontSize: '14px',
  fontWeight: '400',
  color: '#000',
};

const TextStyled = styled.span`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;

export default Text;
