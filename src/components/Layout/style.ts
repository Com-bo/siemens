import styled from 'styled-components';
import banner from '@/assets/images/banner.png'
import siderbg from '@/assets/images/sidebg.png'

export const LayoutDiv = styled.div`

  .ant-pro-sider-extra {
    margin-top: 20px;
  }
  .ant-menu-horizontal {
    font-size: 16px;
  }
 
  .ant-menu-sub {
    background-color: rgba(0, 0, 0, 0.05);
  }
  

  .ant-design-pro {
    background: url(${banner}) no-repeat ;
    background-size:100% auto;
  }
  .ant-layout{
    background-color:transparent;
  }
  .ant-layout header.ant-layout-header {
    height: 82px !important;
    line-height: 82px !important;
    color:#fff;
    background-color:transparent;
  }
  .ant-layout-content.ant-pro-basicLayout-content {
    // background-color:blue;
  }
  .ant-pro-grid-content{
    overflow-y: auto;
    margin-top:5px;
    height: calc(100vh - 160px);
    box-shadow: -3px 0px 20px 0px 
		rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color:#fff;
  }
  .ant-pro-global-header{
    background-color:transparent;
  }
  .ant-layout-sider-children {
    height: calc(100vh - 50px);
  }
  .ant-pro-sider-logo{
    padding:0;
    height:80px;
  }
  .ant-pro-page-container-warp,
  .ant-page-header {
    padding: 0;   
    background-color:transparent;
  
  }
  .ant-breadcrumb,.ant-breadcrumb-separator{
    font-size:12px;
    color: rgba(255, 255, 255, 0.45);
    height:20px;
  }
  .ant-breadcrumb > span:last-child{
    color:#fff;
  }
  
  aside.ant-pro-sider-layout-mix {
    margin-top: 160px;
    margin-left: 20px;
    padding-top: 0 !important;
    border-radius: 10px;
    .ant-menu-sub {
      background-color: #fff;
    }
  }
  // .ant-layout-sider-children {
  //   padding: 30px 20px;
  // }
  .ant-menu{
    background-color: #fff;
    border-radius:0 10px 10px 0;
    background-image:url(${siderbg});
    background-position:0 -10px;
    font-size:14px;
  }

  .ant-menu-item:active,
  .ant-menu-submenu-title:active {
    background-color: #fef3eb;
  }
  .ant-menu-submenu-title,.ant-menu-item {
    font-weight: bold;
    color: #333;
  }
  .ant-menu-submenu,.ant-menu-item {
    border-bottom:1px solid #eaeaea; 
  }
  .ant-menu-submenu .ant-menu-item-only-child{
    border-bottom:0;
    font-weight:normal;
  }
  .ant-menu-submenu  .ant-menu-submenu{
    border-bottom:0;
  }
  .ant-pro-sider.ant-layout-sider-light  .ant-menu-submenu .ant-menu-item  {
    color: #666;
  }
 
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected,.ant-menu-item-selected:hover {
    background-color: #f2f9f8;
    font-weight:bold;
    color:#00807d;
  }
  .ant-menu-vertical .ant-menu-item::after, .ant-menu-vertical-left .ant-menu-item::after, .ant-menu-vertical-right .ant-menu-item::after, .ant-menu-inline .ant-menu-item::after{
    border-right-width:4px;
  }
.ant-menu-item{
    height:60px;
    line-height:60px;
  }
 .ant-pro-page-container-children-content{
   margin:0;
 }
  .ant-picker {
    width: 100%;
  }
  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link {
    cursor: pointer;
  }
  .ant-menu-submenu-title .anticon {
    .iconfont {
      font-size: 18px;
      -webkit-text-stroke-width: 0.2px;
    }
  }
  .ant-menu-item a .ant-badge {
    color: inherit;
  }
  .ant-pro-top-nav-header-menu {
    display: flex;
    justify-content: center;
  }
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu {
    margin: 0 60px;
  }
  .spread {
    height: 49px;
    background-image: linear-gradient(180deg, #fefefe 0%, #ececec 100%);
  }
  .ant-pro-sider.ant-layout-sider.ant-pro-sider-fixed {
    height: auto;
    top:0;   
  }
  .ant-pro-sider-light{
    background-color:transparent; 
  }
  .ant-badge-multiple-words {
    padding: 0 4px;
  }
  .ant-pro-top-nav-header-menu .ant-menu.ant-menu-horizontal {
    width: 100%;
    text-align: center;
  }  
`;
export const RightContentDiv = styled.div`
  display: flex;
  height:auto;
  border-radius:5px;
  background-color:rgba(0,0,0,.3);

`;
export const RightIcon = styled.div<{ mode: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  line-height:32px; 
  &:hover {
    background: ${(props) =>
    props.mode === 'mix'
      ? props.theme['com-layout-hover-background']
      : props.theme['com-layout-hover-background']};
    cursor: pointer;
  }
`;


export const LogoImgWrap = styled.div`
  img {
    object-fit: scale-down;
    vertical-align: top;
  }
  span {
    font-size: 18px;
    font-family: logofont;
    color: #333;
    font-weight: bold;
  }
  .ant-divider-vertical {
    height: 30px;
    font-weight: bold;
  }
`;
