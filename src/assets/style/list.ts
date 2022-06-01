import styled from 'styled-components';
const colorTheme = "#00807d";//主题色
const green = "#87962a";
const blue = "#2a8dc6";
const orange = "#e4751f";
const filterBg = "#f6f8f9";
const colors={
  grass:'#85904f',
  theme:'#00807d',
  blue:'#2a8dc6'
}


export const TableWrapDiv = styled.div`
.ant-table-thead th{
  background-color:#dfdfdf;
}
  margin-left: 20px;
  border-radius: 10px;
  // padding: 15px 20px;
  margin-right: 20px;
  .stripe,
  .stripe .ant-table-cell-fix-right,
  .stripe .ant-table-cell-fix-left {
    background-color: #f8f8f8;
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
    border-color: ${prop=>colors[prop.color]??colorTheme};
    color:${prop=>colors[prop.color]??colorTheme};
  }
  .ant-btn:hover,
  .ant-btn:focus {
    border-color:${prop=>colors[prop.color]??colorTheme};
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
export const BtnTextRedWrap = styled.span`
.ant-btn {
  color:${props => props.color ?? colorTheme};
  cursor: pointer;
  text-decoration: underline;
  .anticon{
      margin-right: 5px;
      vertical-align: middle;
    }
  }
`;
export const BtnBlueWrap = styled.span`
  .ant-btn {
  color: #fff;
  border-color: ${blue};
  color:${blue}
}
.ant-btn: hover,
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
.ant-btn: hover,
.ant-btn:focus {
  border-color:${orange};
}
`;

