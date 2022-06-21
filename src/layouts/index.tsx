import { theme } from '@/app/config/theme';
//import useAuthService, { AuthService } from '@/modules/User/useAuthService';
import useFormatLanguageService, {
  FormatLanguageService,
} from '@/tools/formatLanguage';
import { UseRequestProvider } from 'ahooks';
import 'antd/dist/antd.less';
import axios from 'axios';
// import Mgr from '@/services/SecurityService';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { IRouteComponentProps } from 'umi';
import React, { useEffect, useRef, useState, createContext } from 'react';
import { useLocalStorageState } from 'ahooks';
import enUS from 'antd/lib/locale/en_US';
const GlobalStyle = createGlobalStyle`
 /**
    全局样式
   */
   
  ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      background-color: #c1c1c1;
  }
 
  /* 提升dropdown弹出框的显示优先级 */
  .ant-dropdown{
    z-index: 9999;
  }
  @font-face
  {
  font-family: 'youshe';
  src: url('./font/YouSheBiaoTiHei.ttf');
  }
  @font-face
  {
  font-family: 'siemens';
  src: url(./font/SiemensSans_Global_Roman.ttf);
  }
 
  body{
    font-family:siemens,  Arail;
    background-color:#e6e6e6;
    min-width:1366px;
  }
  .ant-input-affix-wrapper{
    border-radius:5px;
    border-color:#efefef;
  }
  .ant-row{
    width:100%
  }
  // table
 
  .ant-table-thead > tr > th{
    font-weight:bold;
  }
  .ant-table-container table > thead > tr:first-child th:last-child{
    border-bottom-right-radius:5px;
  }
  .ant-table-container table > thead > tr:first-child th:first-child{
      border-bottom-left-radius:5px;
  }
  .ant-table-pagination{
    text-align:center;
  }
  .ant-pagination-total-text{
    position:absolute;
    left:0;
    bottom:-3px;
  }
  .ant-pagination-item{
    border-color:transparent;
    border-radius:0;
    height:22px;
    min-width:22px;
    line-height:20px;
  }
  .ant-pagination-prev, .ant-pagination-next, .ant-pagination-jump-prev, .ant-pagination-jump-next{
    height:22px;
    min-width:22px;
    line-height:20px;
  }
  .ant-pagination-item-active,.ant-pagination-item:focus-visible, .ant-pagination-item:hover{
    border-color:#009999;
  }
  .ant-pagination-item-active a,.ant-pagination-item:focus-visible a, .ant-pagination-item:hover a{
    color:#009999;
  }
  .ant-pagination-prev:focus-visible .ant-pagination-item-link, .ant-pagination-next:focus-visible .ant-pagination-item-link, .ant-pagination-prev:hover .ant-pagination-item-link, .ant-pagination-next:hover .ant-pagination-item-link{
     border-color:none;
  }
  .ant-pagination-disabled .ant-pagination-item-link, .ant-pagination-disabled:hover .ant-pagination-item-link, .ant-pagination-disabled:focus-visible .ant-pagination-item-link{
    background:#ccc !important;
    color:#fff;
  }
 
  .ant-pagination-prev button, .ant-pagination-next button{
    color:#fff !important;
  }
  .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link{
    background-color:#009999;
  }

  // 表单
  .ant-form-item{
    margin-bottom:10px;
  }
  .ant-collapse > .ant-collapse-item:last-child, .ant-collapse > .ant-collapse-item:last-child > .ant-collapse-header{
    border-radius: 5px 0px 0px 0px;
  }
  .ant-collapse-content > .ant-collapse-content-box{
    padding-left:0;
    padding-right:0;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header{
    padding:0;
    height:40px;
    line-height:40px;

    background-image: linear-gradient(90deg,
      #e7f5f5 0%,
      #fff 100%);
      border-radius: 5px 0px 0px 0px;
      font-weight:bold;
      color: #009999;
      font-size:16px;
  }
  .ant-input[disabled],.ant-picker-input > input[disabled],.ant-picker.ant-picker-disabled,.ant-input-number-disabled .ant-input-number-input{
    cursor:default;
    color:#333;
    background-color:#fbfbfb;
  }
  .ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector,.ant-checkbox-disabled + span,.ant-select-disabled.ant-select-multiple .ant-select-selection-item{
    cursor:default;
 
    color:#333;
  }
  .ant-checkbox-disabled{
     
    cursor:default;
  }
  .ant-btn.ant-btn-default{
    background-color: #fdefe5;
    border: solid 1px #ec6602;
    color:#ec6602;

  }
  // modal
  .remarkModalClass  .ant-modal{
    width: auto !important;
    max-width:800px;
  }
  .ant-checkbox-inner,.ant-tree-checkbox-inner{
    border-radius:0px;
  }
  .ant-list-pagination{
    text-align:center;
  }
  .noticeClass,.templateClass{
    .ant-modal-close-x{
      background-color: #ec6602;
      box-shadow: 0 2px 4px 0 rgb(236 102 2 / 20%), 0 2px 4px 0 rgb(236 102 2 / 19%);
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      margin: 10px;
      font-size: 14px;
      color: #fff;
    }
    
  }
  .templateClass{
    ul{
      padding:0;
      margin:10px 0;
      li{
        display:block;
        line-height:2em;
      }
    }
  }
  .ant-tree .ant-tree-treenode-disabled .ant-tree-node-content-wrapper {
    color: rgba(0, 0, 0, 1);
    cursor: not-allowed;
  }
 .ant-btn  .iconfont{
    font-size: 20px;
    position: absolute;
    left: 5px;
    top: 0;
 }
 .ant-btn .iconfont+span{
   padding-left:15px;
 }
 .ant-pagination-options .ant-select-single .ant-select-selector .ant-select-selection-item{
  line-height: 22px;
 }
 .ant-pagination-options .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
   height:22px;
 }
 .ant-table-empty .ant-table-placeholder .ant-table-cell .ant-empty{
  background:url(${noData}) no-repeat;
  height: 200px;
  background-position: center;
 }
 .ant-table-empty .ant-table-placeholder .ant-table-cell .ant-empty .ant-empty-image,.ant-table-empty .ant-table-placeholder .ant-table-cell .ant-empty .ant-empty-description{
  display:none;
 }
 .ant-table-body{
   overflow-y:auto !important;
 }
 .ant-table-hide-scrollbar { &::-webkit-scrollbar { background:transparent !important; }}

.change-scrollBal   .ant-table-thead > tr > th{ 
   right:0 !important;
 }
 .ant-radio-disabled + span {
  color: #001529;
  cursor: default;
}
.ant-dropdown-menu-item:hover, .ant-dropdown-menu-submenu-title:hover{
  color:#00807d;
}
.ant-select-item-option-selected:not(.ant-select-item-option-disabled){
  background-color:#f5f5f5;
}
`;
import noData from '@/assets/images/noData.png';
import MedalsoftLayout from '@/components/Layout';
import PersonalDropdown from '@/components/PersonalDropdown';
import { ConfigProvider } from 'antd';
export default function Layout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  const formatLanguageService = useFormatLanguageService();
  const [mode, setMode] = useLocalStorageState<'side' | 'top' | 'mix'>(
    'layout-mode',
    'side',
  );

  const [userName, setUserName] = useState('');
  useEffect(() => {
    setUserName(sessionStorage.getItem('user'));
  }, []);

  // const authService = useAuthService({ mode: 'normal', formatLanguageService });
  return (
    <ConfigProvider locale={enUS}>
      <ThemeProvider theme={theme}>
        {/* 全局样式 */}
        <GlobalStyle />
        {/* <FormatLanguageService.Provider value={formatLanguageService}> */}
        {/* <UseRequestProvider
          value={{
            requestMethod: (param) =>
              axios(param).then((r) => {
                return r.data;
              }),
          }}
        > */}
        <MedalsoftLayout
          search={true}
          layout={mode}
          navTheme="light"
          rightContentRender={() => [<PersonalDropdown userName={userName} />]}
        >
          {children}
        </MedalsoftLayout>
        {/* </UseRequestProvider> */}
        {/* </FormatLanguageService.Provider> */}
      </ThemeProvider>
    </ConfigProvider>
  );
}
