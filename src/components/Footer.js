import React from 'react';
import styled from 'styled-components';
import { Flex, Text } from '../elements/index';

const Footer = () => {
  return (
    <Flex
      styles={{
        width: '100%',
        height: '100px',
        background: '#f9f9f9',
      }}
    >
      <Text
        styles={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#000',
        }}
      >
        Friengles
      </Text>
    </Flex>
  );
};

export default Footer;
