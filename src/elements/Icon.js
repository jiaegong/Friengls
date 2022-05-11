import React from 'react';
import styled from 'styled-components';

const Icon = (props) => {
  const { styles, href, src, _onClick, defaultStyles } = props;
  return (
    <IconA
      href={href}
      onClick={_onClick}
      style={{ ...styles }}
      {...defaultStyles}
    >
      <IconImg src={src} />
    </IconA>
  );
};

Icon.defaultProps = {
  defaultStyles: { width: '25px', height: '25px' },
};

const IconA = styled.a`
  //   width: 30px;
  //   height: 30px;
  overflow: hidden;
  position: relative;
`;

const IconImg = styled.img`
  width: 100%;
  height: 100%;
  src: ${(props) => props.src};
`;

export default Icon;
