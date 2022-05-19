import React from 'react';
import styled from 'styled-components';

const Buttons = (props) => {
  const { defaultStyles, styles, type, _onClick, children, text } = props;

  console.log(props);

  return (
    <BlueBtn
      style={{ ...styles }}
      onClick={_onClick}
      type={type}
      {...defaultStyles}
    >
      {text ? text : children}
    </BlueBtn>
  );
};

Buttons.defaultProps = {
  _onClick: () => {},
  text: false,
  children: null,
  defaultStyles: {
    width: '380px',
    height: '60px',
    margin: false,
    padding: false,
    fontSize: '20px',
    bold: 600,
    color: '#fff',
    backgroundColor: '#153587',
  },
};

const BlueBtn = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 4px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.bold};
  color: ${(props) => props.color};
`;

// const SmallBtn = styled.button`
//   width: ${(props) => props.size};
//   height: ${(props) => props.size};
//   font-size: 0;
//   border-radius: 4px;
//   border: none;
//   cursor: pointer;
//   margin: ${(props) => props.margin};

//   background-color: #fff;
//   background-image: url('${(props) => props.src}');
//   // background-position: 50% 50%;
//   // background-repeat: no-repeat;
// `;

// const PurpleBtn = styled.button`
//   width: ${(props) => props.width};
//   height: ${(props) => props.height};
//   border: ${(props) => (props.border ? props.border : '1px solid #5f0080')};
//   border-radius: 3px;
//   max-width: 100%;
//   background-color: ${(props) =>
//     props.backgroundColor ? props.backgroundColor : '#5f0080'};
//   color: #ffffff;
//   font-family: 'Noto Sans KR';
//   font-size: ${(props) => props.fontSize};
//   font-weight: ${(props) => (props.bold ? '700' : '500')};
//   text-align: center;
//   box-sizing: border-box;
//   ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
//   ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
//   ${(props) => (props.flex ? `display: flex;` : '')}
//   cursor: ${(props) => (props.deactivate ? props.deactivate : 'pointer')};
// `;

export default Buttons;
