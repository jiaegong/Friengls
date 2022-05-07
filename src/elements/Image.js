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
  defaultStyles: {
    shape: 'circle',
    src: 'https://1.bp.blogspot.com/-jd26syUy6_s/XqPj6jt4eWI/AAAAAAAAMnU/AJ4mxNl2BPwrGOtInwf1Kz-PqPL14dS4wCLcBGAsYHQ/s1600/%25EB%258B%25A4%25EB%259E%258C%2B%25E3%2582%25B0%25E3%2583%259F%2BPoppy.png',
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
