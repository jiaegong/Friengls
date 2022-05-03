import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
  const { styles, className } = props;

  return <InputStyled style={{ ...styles }} className={className} />;
};

Input.defaultProps = {
  fontSize: '14px',
  fontWeight: '400',
  color: '#000',
  width: '100%',
  borderBottom: '1px solid #333',
};

const InputStyled = styled.div`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  border-bottom: ${(props) => props.borderBottom};
`;

export default Input;
