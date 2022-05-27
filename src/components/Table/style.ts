import styled from 'styled-components';
export const TableMixDiv = styled.div`
margin:0 24px 24px;
  .stripe {
    background-color: #f9f9f9;
  }
  .ant-table {
    color: #666;
  }
  .ant-table-tbody > tr > td {
    border: none;
  }
  .ant-pagination{
    justify-content: center;
  }
  .ant-table-thead th{
    padding:0;
  }
  .ant-table-thead th{
    background-color:#dfdfdf;
    padding-bottom:50px; 
    position:relative;  
  }
  .ant-table-thead th .title{
    padding:5px 5px 0;
  }
  .ant-table-thead th .ant-form-item{
    background-color:#f8f8f8;
    margin-bottom: 0;
    padding:0 5px;
    height:50px;
    line-height:50px;
    position:absolute;
    bottom:0px;
  }
  .stripe,
  .stripe .ant-table-cell-fix-right,
  .stripe .ant-table-cell-fix-left {
    background-color: #f9f9f9;
  }
  .total{
    strong{
      margin-right:20px;
    }
  }
  label{
    margin-right:10px;
  }
  .ant-select{
    width:80px;
  }
`;
