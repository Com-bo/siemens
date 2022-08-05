import { history } from 'umi';
import Mgr from '@/services/SecurityService';
import { message, notification, Modal } from 'antd';
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import '@/app/framework';
import { getLoginUser } from '@/app/request/apiUser';
let authBtnCodes = {};
let sysRoutes = [];
const parseTree = (datas, resultData) => {
  for (var i in datas) {
    // 路由层
    if (datas[i].path) {
      resultData.push({
        authCode: datas[i].authCode,
        name: datas[i].authName,
        path: datas[i].path,
        icon: datas[i].icon,
      });
      // if (resultData[0].redirect) {
      //   k = k + 1;
      // }
      // 存在子路由
      if (
        datas[i].subTree &&
        datas[i].subTree.length &&
        datas[i].subTree[0].path
      ) {
        // 路由层 ，设置redirect
        // resultData[k].routes = [{
        //   path: datas[i].path,
        //   redirect: datas[i].subTree[0].path
        // }]
        sysRoutes.push(datas[i].path);
        resultData[i].routes = [];
        parseTree(datas[i].subTree, resultData[i].routes);
      } else {
        // 按钮层
        if (
          datas[i].subTree &&
          datas[i].subTree.length &&
          !datas[i].subTree[0].path
        ) {
          sysRoutes.push(datas[i].path);
          resultData[i].routes = [];
        }
      }
      // 不存在子路由
    }
    if (
      datas[i].subTree &&
      datas[i].subTree.length &&
      !datas[i].subTree[0].path
    ) {
      // 按钮层
      if (!authBtnCodes[datas[i].authCode]) {
        authBtnCodes[datas[i].authCode] = datas[i].subTree;
        parseTree(datas[i].subTree, []);
      }
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
let _routes = [];
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
  getLoginUser().then((res: any) => {
    if (res.isSuccess) {
      sessionStorage.setItem('user', res.data?.realName);
      sessionStorage.setItem(
        'businessLines',
        JSON.stringify(res.data?.businessLines),
      );
      parseTree(res.data.auhtList, _routes);
      // _routes[1].routes[0].path="/CertificateList/list"
      sessionStorage.setItem('authCodes', JSON.stringify(authBtnCodes));
      sessionStorage.setItem('routes', JSON.stringify(_routes));
      oldRender();
    } else {
      Modal.error({
        title: 'Tips',
        content: res?.Value?.msg,
        okText: () => {},
        cancelText: '',
        centered: true,
        keyboard: false,
      });
    }
  });
}

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

    if(_routes[0].path != "/home"){

      history.replace(_routes[0]["routes"][0].path);

    }else{

      history.replace(_routes[0].path);
      
    }
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
