import styled from 'styled-components';
const colorTheme = "#00807d";//主题色
const green = "#87962a";
const blue = "#2a8dc6";
const orange = "#e4751f";
const filterBg = "#f6f8f9";

export const SearchDiv = styled.div`
  border-radius: 10px;
  background-color: #fff;
  padding: 20px 0px 10px 20px;
  margin-right: 20px;
  margin-left: 20px;
  .searchBtn {
    position: absolute;
    right: 10px;
    top: 0;
  }
  .keywordInput {
    width: calc(100% - 85px);
  }
`;
export const TableWrapDiv = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 10px;
  padding: 15px 20px;
  background: #fff;
  margin-right: 20px;
  .stripe,
  .stripe .ant-table-cell-fix-right,
  .stripe .ant-table-cell-fix-left {
    background-color: #f9f9f9;
  }

  .ant-table {
    color: #666;
  }
  .ant-table-tbody > tr > td {
    border: none;
  }
`;
export const FilterGroupDiv = styled.div`
background-color:${filterBg};
padding:22px;
border-bottom:1px solid #e3e5e5;
.ant-select{
  min-width:580px;
  margin:0 20px 0 10px;
}
.ant-space .ant-btn{
  width:40px;
}

`
export const TableTopDiv = styled.div`
  overflow: hidden;
  margin:24px;
`;
export const TableTitleDiv = styled.div`
  float: left;
  font-size: 16px;
  font-weight: bold;
`;
export const TaleTitleIconDiv = styled.div`
  margin-right: 10px;
  display: inline-block;
  span {
    display: inline-block;
    width: 4px;
    height: 16px;
    margin-right: 3px;
    vertical-align: middle;
  }
  span {
    background-color: ${colorTheme};
    width:10px;
    border-radius: 5px;
    height:24px;
  } 
`;
export const TableBtnDiv = styled.div`
  float: right;
`;
export const BtnThemeWrap = styled.span`
  .ant-btn {
    color: #fff;
    border-color: ${colorTheme};
    color:${colorTheme}
  }
  .ant-btn:hover,
  .ant-btn:focus {
    border-color:${colorTheme};
  }
`;
export const BtnGreenWrap = styled.span`
  .ant-btn {
    color: #fff;
    border-color: ${green};
    color:${green}
  }
  .ant-btn:hover,
  .ant-btn:focus {
    border-color:${green};
  }
`;
export const BtnBlueWrap = styled.span`
.ant-btn {
  color: #fff;
  border-color: ${blue};
  color:${blue}
}
.ant-btn:hover,
.ant-btn:focus {
  border-color:${blue};
}
`;
export const BtnOrangeWrap = styled.span`
.ant-btn {
  color: #fff;
  border-color: ${orange};
  color:${orange}
}
.ant-btn:hover,
.ant-btn:focus {
  border-color:${orange};
}
`;
export const OperDiv = styled.div`
  text-align: center;
  .ant-btn-link {
    color: #009999;
  }
  .ant-btn-link span {
    text-decoration: underline;
  }
  .ant-btn-dangerous.ant-btn-link {
    color: #ff4d4f;
  }
`;
