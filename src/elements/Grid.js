import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
  const { styles, children, className, _onClick, defaultStyles } = props;
  return (
    <GridDiv
      onClick={_onClick}
      style={{ ...styles }}
      className={className}
      {...defaultStyles}
    >
      {children}
    </GridDiv>
  );
};

Grid.defaultProps = {
  defaultStyles: {
    width: '',
  },
};

const GridDiv = styled.div`
  display: grid;
  width: ${(props) => props.width};
`;

export default Grid;
