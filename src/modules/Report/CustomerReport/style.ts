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
  }
  .ant-table-thead th .title {
    padding: 10px 5px 10px 0;
  }
  tfoot {
    tr {
      position: sticky;
      bottom: 0;
      background-color: #fff;
      z-index: 999;
      td {
        box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%);
      }
    }
  }
`;

export const FilterGroupDivReport = styled.div`
  padding: 22px;
  background-color: #f6f8f9;
  border-bottom: 1px solid #e3e5e5;
  position: absolute;
  height: 80px;
  width: 100%;
  .ant-select {
    width: 200px !important;
    margin: 0 20px 0 10px;
  }
  .ant-space .ant-btn {
    width: 40px;
  }
`;
export const ReactEChartsDiv = styled.div`
  padding: 22px;
  margin-top: 80px;
  /* border-bottom: 1px solid #e3e5e5; */
  label{
    display: block;
    font-size: 28px;
    margin-bottom: 20px;
  }
`;
export const ReactEChartsDivWrap = styled.div`
margin-bottom: 80px;
`
