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
    marginBottom: '10px',
  },
};

const Box = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginBottom};
  padding: ${(props) => props.padding};
  border: none;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-around;
  // 현수님: justify-content: center;
  position: relative;
`;

export default InputBox;
