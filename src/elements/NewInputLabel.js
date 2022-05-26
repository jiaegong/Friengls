import React from 'react';
import styled from 'styled-components';

const NewInputLabel = (props) => {
  const { htmlFor, _onClick, styles, defaultStyles, children } = props;

  return (
    <Label
      htmlFor={htmlFor}
      onClick={_onClick}
      style={{ ...styles }}
      {...defaultStyles}
    >
      {children}
    </Label>
  );
};

NewInputLabel.defaultProps = {
  defaultStyles: {},
};

const Label = styled.div`
  display: flex;
  cursor: default;
  font-size: 12px;
  font-weight: 400;
  color: #404040;
`;

export default NewInputLabel;
