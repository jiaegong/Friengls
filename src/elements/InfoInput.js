import React from 'react';
import styled from 'styled-components';
import { Input, InputLabel } from '../elements/index';

const InfoInput = (props) => {
  const {
    type,
    name,
    id,
    placeholder,
    _onChange,
    _onKeyUp,
    _onBlur,
    value,
    disabled,
    maxLength,
    multiLine,
    checked,
    autoComplete,
    _onMouseOver,
    _onMouseOut,
    styles,
    defaultStyles,
    label,
    label2,
    validationLabel,
    onlyBox,
    children,
  } = props;

  if (onlyBox) {
    return (
      <InputBox
        style={{ ...styles }}
        {...defaultStyles}
        onMouseOver={_onMouseOver}
        onMouseOut={_onMouseOut}
      >
        {children}
      </InputBox>
    );
  }

  return (
    <InputBoxWrap>
      <InputBox style={{ ...styles }} {...defaultStyles}>
        {label && (
          <LabelWrap>
            {label && <InputLabel>{label}</InputLabel>}
            {label2 && <InputLabel>{label2}</InputLabel>}
          </LabelWrap>
        )}
        <Input
          type={type}
          name={name}
          id={id}
          value={value}
          placeholder={placeholder}
          _onChange={_onChange}
          _onKeyUp={_onKeyUp}
          _onBlur={_onBlur}
          defaultValue={value}
          disabled={disabled}
          maxLength={maxLength}
          checked={checked}
          autoComplete={autoComplete}
          multiLine={multiLine}
        />
      </InputBox>
      {validationLabel && (
        <InputLabel
          styles={{ padding: '0 10px 15px 10px', alignItems: 'flex-start' }}
        >
          {validationLabel}
        </InputLabel>
      )}
    </InputBoxWrap>
  );
};

InfoInput.defaultProps = {
  defaultStyles: {
    height: '54px',
    flexDirection: 'row',
  },
};

const InputBoxWrap = styled.div`
  width: 100%;
`;
const InputBox = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  padding: 0 10px;
  margin-bottom: 5px;
  border: 1px solid #8a8a8a;
  border-radius: 8px;
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
`;

const LabelWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default InfoInput;
