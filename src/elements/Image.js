import React from 'react';
import styled from 'styled-components';

const Image = (props) => {
  const { styles, shape, src, _onClick, className, defaultStyles } = props;

  if (shape === 'circle') {
    return (
      <ImageCircle
        style={{ ...styles }}
        src={src}
        onClick={_onClick}
        className={className}
        {...defaultStyles}
      />
    );
  }

  if (shape === 'rectangle') {
    return (
      <ImageRectangle
        style={{ ...styles }}
        src={src}
        onClick={_onClick}
        className={className}
        {...defaultStyles}
      />
    );
  }
};

Image.defaultProps = {
  shape: 'circle',
  src: '',
  defaultStyles: {
    width: '100%',
    height: 'auto',
  },
};

const ImageRectangle = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const ImageCircle = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
`;

export default Image;
