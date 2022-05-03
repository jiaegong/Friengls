import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
  const { styles, children, className, _onClick } = props;
  return (
    <GridDiv onClick={_onClick} style={{ ...styles }} className={className}>
      {children}
    </GridDiv>
  );
};

Grid.defaultProps = {
  width: '100%',
};

const GridDiv = styled.div`
  display: grid;
  width: ${(props) => props.width};
`;

export default Grid;
