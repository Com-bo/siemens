import React from 'react';
import { WelComeDiv } from '@/assets/style';

const Welcome = () => (
  <div
    style={{
      height: '100%',
      background: '#fff',
      position: 'absolute',
      width: '100%',
    }}
  >
    <WelComeDiv>
      <img src={require('@/assets/images/loadding.gif')} />
      <br />
      <p> Welcome to DX Ordering</p>
    </WelComeDiv>
  </div>
);
export default Welcome;
