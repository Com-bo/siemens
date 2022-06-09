import styled from 'styled-components';
export const TableMixDiv = styled.div`
margin:0 24px 24px;
  .stripe {
    background-color: #f8f8f8;
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
    // padding-bottom:50px; 
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
  .ant-table-tbody > tr.ant-table-row-selected > td{
    background-color: #fff !important;
  }
  .stripe,
  .stripe .ant-table-cell-fix-right,
  .stripe .ant-table-cell-fix-left , .ant-table-tbody >tr.ant-table-row-selected.stripe > td{
    background-color: #f8f8f8 !important;
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
  th.ant-table-cell.ant-table-selection-column::after{
    background-color: #f8f8f8;
    margin-bottom: 0;
    padding: 0 5px;
    line-height: 50px;
    width: 100%;
    display: block;
    content: '';
  }
 th .ant-table-selection{
  top: 17px;
  left: 5px;
  height: 50px;
 }
 .ant-table-tbody > tr.ant-table-row-selected > td{
  background: unset;
 }

`;
