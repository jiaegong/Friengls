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
    height: '54px',
    paddingLeft: '5px',
    marginBottom: '10px',
    border: '1px solid #8a8a8a',
    borderRadius: '8px',
  },
};

const Box = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginBottom};
  padding: ${(props) => props.padding};
  paddingleft: 5px;
  border: ${(props) => props.border}
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  // background: red;
`;

export default InputBox;
