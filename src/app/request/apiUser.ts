import axios from 'axios';
import { useGet, usePost } from '.';
import Config from '../config';

// 获取用户登录信息
export const getMyIdLoginInfo = (RedirectUrl: string) => {
  return useGet(`${Config.Api.Base}${Config.Api.GetMyIdLoginInfo}`, {
    autoLoading: true,
    params: { RedirectUrl },
  });
};
// 获取用户信息
export const getMyIdUserInfo = () => {
  let t = sessionStorage.getItem('authorization');
  if (t) {
    axios.defaults.headers.common['uimToken'] =
      sessionStorage.getItem('umiToken');
    axios.defaults.headers.common['myAuthorization'] = t;
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + sessionStorage.getItem('token');
  }
  return useGet(`${Config.Api.Base}${Config.Api.GetMyIdUserInfo}`, {
    autoLoading: true,
  });
};
// 获取项目中的信息
export const getLoginUser = () => {
  return useGet(`${Config.Api.Base}${Config.Api.QueryLoginUser}`, {
    autoLoading: true,
  });
};
// 获取用户的token认证，麻烦麻烦麻烦
export const createToken = () => {
  return usePost(
    `${Config.Api.Base}${Config.Api.CreateToken}`,
    {},
    {
      autoLoading: true,
    },
  );
};
