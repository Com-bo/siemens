import React from 'react';
import { Link } from 'umi';
import nofound from '@/assets/images/404.png';
const Index = () => (
  <div>
    <div
      style={{
        textAlign: 'center',
        margin: '200px auto 20px auto',
      }}
    >
      {' '}
      <img src={nofound} />
    </div>

    <div
      style={{
        textAlign: 'center',
      }}
    >
      {' '}
      <Link to="/">很抱歉，您请求的页面找不到，返回首页？</Link>
    </div>
  </div>
);
export default Index;
