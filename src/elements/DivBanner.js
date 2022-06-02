import React, { Children } from 'react';
import styled from 'styled-components';
import { BannerImg } from '../asset/image/index';

const DivBanner = (props) => {
  const { children, className } = props;

  return <BannerWrap className={className}>{children}</BannerWrap>;
};

export default DivBanner;

const BannerWrap = styled.div`
  width: 100%;
  height: 420px;
  padding-top: 60px;
  background-image: url('${BannerImg}');
  background-size: cover;
  background-position: center;
  margin-bottom: 30px;
`;
