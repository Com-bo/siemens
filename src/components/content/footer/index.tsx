import React from 'react';
import {FooterDiv} from './style'
import three from '@/assets/images/3.png'
export default (props: any) => {
  return <FooterDiv className='footer'>
      <span className='version'>System Publish Version 2022.5.11</span>
      <div className='right-desc'><div className='right_three_left'>Users in your Business Line using the system now: </div><div className='three'>3</div></div>
      </FooterDiv>;
};