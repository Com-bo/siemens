import ProLayout, {
  BasicLayoutProps,
  PageContainer,
} from '@ant-design/pro-layout';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import { MenuDataItem, Route } from '@ant-design/pro-layout/lib/typings';
import React, { useEffect, useState, createContext, useRef } from 'react';
import { Link, useHistory } from 'umi';
import { defaultRoute } from './defaultprop';
import logo from '@/assets/images/logo.png';
import MedalsoftMenuItem, { IMenuItemNotice } from './MenuItem';
import { RightContentDiv, RightIcon, LayoutDiv, LogoImgWrap } from './style';
import { MenuFoldOutlined, MenuUnfoldOutlined, RightOutlined } from '@ant-design/icons';
import '@/assets/iconfont/iconfont.css';
import Footer from '@/components/content/footer'
import HeaderTitle from '@/assets/images/title.png'
import { getLoginUser } from '@/app/request/apiUser'
export type IMedalsoftLayoutProps = {
  component?: string;
  /** 菜单数据 */
  route: IRoute;
  /** 菜单搜索 - 即时的前端搜索，对标antd树控件搜索UE，默认开启搜索功能 */
  search?: boolean;
  /** 重写rightContentRender，套接默认间距等样式 */
  rightContentRender?: (props: HeaderViewProps) => React.ReactNode[];
} & Omit<
  BasicLayoutProps,
  | 'location'
  | 'menuItemRender'
  | 'menuExtraRender'
  | 'menuDataRender'
  | 'postMenuData'
  | 'rightContentRender'
  | 'route'
>;

export type IRoute = {
  /** children */
  routes?: IRoute[];
  /** 子菜单提醒 */
  notice?: IMenuItemNotice;
} & Route;

/** 支持多级菜单附增icon的dom */
const IconMenu = (icon: {}, name: {}) => {
  if (icon) {
    return (
      <>
        <span role="img" className="anticon">
          <span className={'gbs  gbs-' + icon}></span>
        </span>
        <span style={{ fontSize: '16px' }}>{name}</span>
      </>
    );
  } else {
    return (
      <>
        <span>{name}</span>
      </>
    );
  }
};

// /** 支持菜单notice的dom */
const NoticeMenu = (
  menuItemProps: IRoute,
  collapsed: boolean,
  menuDom: React.ReactNode,
) =>
  menuItemProps.notice?.path === menuItemProps.path &&
    menuItemProps.notice?.request ? (
    <MedalsoftMenuItem
      menu={menuItemProps}
      defaultdom={menuDom}
      collapsed={collapsed}
    ></MedalsoftMenuItem>
  ) : (
    menuDom
  );

/**
 * <a href="https://procomponents.ant.design/components/layout/">👉参考文档</a>
 * <hr/>
 * 基于antd ProLayout额外拓展以下属性：<br/>
 * 1、子菜单显示（数量/红点/其他拓展位）<br/>
 * 2、支持权限过滤<br/>
 * 3、权限过滤模式选择（隐藏/禁用）<br/>
 * 4、重写rightContentRender，套接默认间距、hover等样式<br/>
 * 5、个性化配置（押后）<br/>
 * @author: 耀军
 *
 * @param {IMedalsoftLayoutProps}
 * @extends ProLayout https://procomponents.ant.design/components/layout/
 * @author: Phoebe.Lv
 */
export const MedalsoftLayout = (props: any) => {
  const history = useHistory();
  const [routes, setRoutes] = useState(Object);
  // 子模块的面包屑字段
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let res = sessionStorage.getItem('routes');
    setRoutes(JSON.parse(res));
    // setRoutes(defaultRoute);

  }, []);


  return (
    <LayoutDiv>
      <ProLayout
        collapsedButtonRender={false}
        collapsed={collapsed}
        headerTheme="light"

        breadcrumbProps={{
          separator: <RightOutlined />,
          itemRender: (route, params, routes, paths) => {
            return <span>{route.breadcrumbName}</span>;
          },
        }}
        navTheme="light"
        fixedHeader={true}
        logo={<LogoImgWrap>
          <img
            src={logo}
            onClick={() => history.push(routes.routes[0].path)}
          />
        </LogoImgWrap>}
        title={null}
        pageTitleRender={() => 'B&B System'}
        siderWidth={240}
        route={{
          path: '/',
          routes: routes,
        }}
        location={{ pathname: history.location.pathname }}
        // disableMobile={true}
        fixSiderbar={true}
        rightContentRender={(defalutprops) => (
          <RightContentDiv>
            {props?.rightContentRender?.(defalutprops)?.map((child, index) => {
              if (!child) {
                return;
              }
              return (
                <RightIcon mode={props.layout} key={index}>
                  {child}
                </RightIcon>
              );
            })}
          </RightContentDiv>
        )}
        contentStyle={{ margin: '0 10px' }}
        menuProps={{
          // { item, key, keyPath, selectedKeys, domEvent }
          onSelect: ({ item, key, keyPath, selectedKeys, domEvent }) => {
            if (!selectedKeys) {
              return false;
            }
            if (
              (key as string)?.startsWith('http://') ||
              (key as string)?.startsWith('https://')
            ) {
              return false;
            }
            if (key) {
              history.replace(key as string);
            }
          },
        }}
        subMenuItemRender={(subMenuProps) => (
          subMenuProps.icon ? (
            <div>
              <span className="anticon">
                <span
                  style={{ fontWeight: 'normal' }}
                  className={`gbs   gbs-${subMenuProps.icon as string}`}
                ></span>
              </span>
              <span style={{ fontSize: "16px",verticalAlign:'middle' }}>{subMenuProps.name}</span>
            </div>
          ) : (
            <div>
              <span >{subMenuProps.name}</span>
            </div>
          )

        )}
        onCollapse={setCollapsed}
        headerContentRender={() => {
          return (
            <div>
              <div
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  display: 'inline-block',
                  cursor: 'pointer',
                  fontSize: '16px',
                  marginRight: '20px'
                }}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
              <img src={HeaderTitle} />
            </div>
          );
        }}
        menuItemRender={(menuItemProps, defaultDom) => {
          /** 支持多级菜单附增icon的dom */
          // console.log(menuItemProps.name)

          const iconMenu = IconMenu(
            menuItemProps.icon,
            menuItemProps.name,
          );
          /** 绑定外链进行跳转 */
          if (
            menuItemProps.path?.startsWith('http://') ||
            menuItemProps.path?.startsWith('https://')
          ) {
            return (
              <a href={menuItemProps.path} target="_blank">
                {menuItemProps.name}
              </a>
            );
          }
          /** 使用path，视为使用本地路由进行跳转，path使用优先级大于component */
          if (
            menuItemProps.path &&
            location.pathname !== menuItemProps.path &&
            menuItemProps.priType != 0
          ) {
            // console.log(menuItemProps)
            return (
              <Link to={menuItemProps.path} target={menuItemProps.target}>
                {iconMenu}
              </Link>
            );
          }
          /** 使用component进行跳转，path使用优先级大于component */
          return iconMenu;
        }}

      >
        <PageContainer header={{ title: '' }} style={{ margin: '0' }}>
          {props.children}
        </PageContainer>
      </ProLayout>
      <Footer />
    </LayoutDiv>
  );
};

let defaultProp: IMedalsoftLayoutProps = {
  route: defaultRoute,
  search: true,
  title: '',
};
MedalsoftLayout.defaultProps = defaultProp;
export default MedalsoftLayout;
