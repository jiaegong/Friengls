import React from 'react';
import styled from 'styled-components';

const Flex = (props) => {
  const { styles, children, className, _onClick } = props;
  return (
    <FlexDiv onClick={_onClick} style={{ ...styles }} className={className}>
      {children}
    </FlexDiv>
  );
};

Flex.defaultProps = {
  width: '100%',
  jc: 'center',
  ai: 'center',
};

const FlexDiv = styled.div`
  display: flex;
  justify-content: ${(props) => props.jc};
  align-items: ${(props) => props.ai};
  width: ${(props) => props.width};
  border: ${(props) => props.border};
`;

export default Flex;
