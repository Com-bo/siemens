import React from 'react';
// import Home from '@/modules/home';
import { ContentWrap } from '@/assets/style';

// export default (props: any) => {
//   return <Home {...props} />;
// };
import noData from '@/assets/images/noData.png';
import ReactEcharts from "echarts-for-react";
import * as echarts from 'echarts';
import { isNull } from 'lodash';
export default (props: any) => {

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name:'line1',
        data: ["820", 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        // smooth: true,
      },
      {
        name:'line2',
        data: [900, "", 200, null, 700, 800, 900],
        type: 'line',
        // smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };
  return (
    <ContentWrap>

      <ReactEcharts
        echarts={echarts}
        option={options}
        style={{ height: 400 }}
      />

      {/* {' '}
      <p
        style={{
          paddingTop: '200px',
          textAlign: 'center',
        }}
      >
        {' '}
        <img src={noData} />
      </p> */}
    </ContentWrap>
  );
};
