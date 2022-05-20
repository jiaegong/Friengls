import React from 'react';
import styled from 'styled-components';

const InputLabel = (props) => {
  const { defaultStyles, styles, children } = props;
  return (
    <Label style={{ ...styles }} {...defaultStyles}>
      {children}
    </Label>
  );
};

InputLabel.defaultProps = {
  defaultStyles: {},
};

const Label = styled.label`
  display: flex;
  height: 22px;
  font-size: 16px;
  font-weight: 400;
  color: #404040;
`;

export default InputLabel;
