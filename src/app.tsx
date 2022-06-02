import { history } from 'umi';
import Mgr from '@/services/SecurityService';
import { message, notification, Modal } from 'antd';
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import '@/app/framework';
import React from 'react';
let sysroutes = [];
const parseTree = (datas) => {
  //遍历树  获取id数组
  for (var i in datas) {
    datas[i].path = '/' + datas[i].path;

    if (!datas[i].routes || !datas[i].routes.length) {
      sysroutes.push(datas[i].path);
    } else {
      parseTree(datas[i].routes);
    }
  }
};
const options = {
  loginType: LoginType.Popup,
  tokenRefreshUri: window.location.origin + '/auth.html',
};

const config: any = {
  auth: {
    authority:
      'https://login.microsoftonline.com/5dbf1add-202a-4b8d-815b-bf0fb024e033',
    clientId: process.env.CLIENT_ID,
    redirectUri: 'http://localhost:8834',
    postLogoutRedirectUri: process.env.WEB_URL + '/#/logout',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
};

// Authentication Parameters
const authenticationParameters = {
  scopes: [
    '<property (i.e. user.read)>',
    'https://<your-tenant-name>.onmicrosoft.com/<your-application-name>/<scope (i.e. demo.read)>',
  ],
};

const authProvider = new MsalAuthProvider(
  config,
  authenticationParameters,
  options,
);
export function patchRoutes({ routes }) {
  // 这里都是约定式路由，需要进行屏蔽处理
  // console.log(routes[0].routes);
  // routes[0].routes.map((sys) => {
  //   sys.routes?.map((route, index) => {
  //     if (
  //       sysroutes.indexOf(route.path) == -1 &&
  //       route.path !== helpIndex[useType]
  //     ) {
  //       sys.routes.splice(index, 1);
  //     }
  //   });
  // });
}


let modalPrivacy: any;

export async function render(oldRender) {
  // oldRender();
  const Mgrs = new Mgr();
  const result = await Mgrs.getSignedIn();
  if (!result) {
    //存一下当前的路由
    if (location.hash) {
      sessionStorage.setItem('re', window.btoa(location.hash));
    }
    return;
  }
  const infos = await Mgrs.getProfile();
  if (!infos) {
    return;
  }
  oldRender();

  // hideModalAction(oldRender);
  // const usersInfo = await getUserInfo(homeIndex[useType]);
  // if (usersInfo.isSuccess) {
  //   if (usersInfo.data.acceptLicenseAgreement) {
  //     sessionStorage.setItem('userInfo', JSON.stringify(usersInfo.data));
  //     hideModalAction(oldRender);
  //   } else {
  //     modalPrivacy = Modal.warning({
  //       title: null,
  //       icon: null,
  //       width: '1000px',
  //       okText: '确认',
  //       okButtonProps: { disabled: true },
  //       content: (
  //         <>  
  //         </>
  //       ),
  //     });
  //     return;
  //   }
  // } else {
  //   Modal.warning({
  //     title: 'Tips',
  //     content: usersInfo.msg,
  //     okText: '确定登出',
  //     onOk: () => {
  //       const Mgrs = new Mgr();
  //       if (useType == 'Inner') {
  //         authProvider.logout();
  //       } else {
  //         Mgrs.signOut();
  //       }
  //     },
  //     centered: true,
  //   });
  //   return;
  // }
}
const hideModalAction = async (oldRender: any) => {
  modalPrivacy?.destroy();

  // const res = await apiMenuTree(homeIndex[useType]);
  // if (res.isSuccess) {
  //   parseTree(res.data);
  //   let data = res.data || [];
  //   data.push({
  //     icon: '',
  //     name: '帮助',
  //     // path:
  //     //   process.env.WEB_URL +
  //     //   '/template/西门子医学诊断全国经销商采购和库存管理系统培训操作手册V1.pdf',
  //     path: helpIndex[useType],
  //     priType: 0,
  //     routes: [],
  //   });
  //   sessionStorage.setItem('routes', JSON.stringify(data));
  oldRender();
  // 此处判断路由跳转
  // } else {
  //   Modal.warning({
  //     title: 'Tips',
  //     content: res.msg,
  //     okText: '确定登出',
  //     onOk: () => {
  //       const Mgrs = new Mgr();
  //       Mgrs.signOut();
  //     },
  //     centered: true,
  //   });
  // }
};
// 路由变化
export function onRouteChange({ location, routes, action }) {
  // if (!useType) {
  //   return;
  // }
  if (location.pathname == '/logout') {
    const Mgrs = new Mgr();
    Mgrs.signOut();
    return;
  }

  if (location.pathname == '/') {
    history.replace('/home');
    // } else {
    // 如果页面没有权限
    //   if (
    //     sysroutes.indexOf(location.pathname) == -1 &&
    //     location.pathname != '/404' &&
    //     location.pathname != '/logout' 
    //   ) {
    //     history.replace('/404');
    //   }
  }
}

// notification全局配置
notification.config({
  placement: 'topRight',
  top: 60,
});
