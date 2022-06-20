import styled from 'styled-components';
const themeColor = '#00807d';
export const TabWrapDiv = styled.div`
  .ant-tabs-top > .ant-tabs-nav,
  .ant-tabs-bottom > .ant-tabs-nav,
  .ant-tabs-top > div > .ant-tabs-nav,
  .ant-tabs-bottom > div > .ant-tabs-nav {
    margin: 0;
  }
  .ant-tabs-tabpane {
    height: calc(100vh - 198px);
    background-color: #fff;
    border-radius: 0 10px 0 0;
    border-radius: 0 10px;
    overflow-x: hidden;
  }
  .ant-tabs-top > .ant-tabs-nav::before,
  .ant-tabs-bottom > .ant-tabs-nav::before,
  .ant-tabs-top > div > .ant-tabs-nav::before,
  .ant-tabs-bottom > div > .ant-tabs-nav::before {
    border-bottom: none;
  }
  .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab,
  .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab {
    background-color: #cedcda;
    border: none;
  }
  .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active,
  .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab-active {
    background: #f6f8f9;
    position: relative;
    .ant-tabs-tab-btn::after {
      content: '';
      display: inline-block;
      height: 4px;
      width: 50px;
      background-color: ${themeColor};
      position: absolute;
      left: 40%;
      bottom: 0;
    }
  }
`;
