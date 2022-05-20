import React from 'react';
import styled from 'styled-components';

const InputBox = (props) => {
  const { defaultStyles, styles, children } = props;

  return (
    <Box style={{ ...styles }} {...defaultStyles}>
      {children}
    </Box>
  );
};

InputBox.defaultProps = {
  defaultStyles: {
    width: '100%',
    height: '80px',
    padding: '0 10px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
};

const Box = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginBottom};
  padding: ${(props) => props.padding};
  border: 2px solid #8a8a8a;
  border-radius: ${(props) => props.borderRadius};
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-around;
`;

export default InputBox;
