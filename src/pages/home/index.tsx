import React from 'react';
// import Home from '@/modules/home';
import { ContentWrap } from '@/assets/style';

// export default (props: any) => {
//   return <Home {...props} />;
// };
import noData from '@/assets/images/noData.png';
export default (props: any) => {
  return (
    <ContentWrap>
      {' '}
      <p
        style={{
          paddingTop: '200px',
          textAlign: 'center',
        }}
      >
        {' '}
        <img src={noData} />
      </p>
    </ContentWrap>
  );
};
