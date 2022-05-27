import { useGet, usePost } from '.';
import Config from '../config';

// 登录接口
export const apiLogin = (formData: object, autoLoading: boolean) => {
  return usePost(`${Config.Api.Base}${Config.Api.Login}`, formData, {
    autoLoading: true,
  });
};
/**
 * 第三方登录方法
 */
enum SocialMediaEnum {
  Youtube = 0,
  Linkedin = 1,
  Facebook = 2,
  Twitter = 3,
  Wechat = 4,
  Appl = 5,
}
export const apiSocialLogin = (
  Token: string,
  Type: keyof typeof SocialMediaEnum,
  UserTag?: string,
) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.SocialLogin}`,
    {
      UserTag,
      Token,
      Type: SocialMediaEnum[Type],
      // 客户端类型：1:web,2:App
      ClientType: 1,
    },
    {
      autoLoading: true,
    },
  );
};

export const apiMenuTree = (type: string) => {
  return useGet(`${Config.Api.Base}${Config.Api.MenuTree}`, {
    autoLoading: true,
    headers: {
      // pageRouter: 'handler/home',
      pageRouter: type,
      // pageRouter: 'bP/home',
    },
  });
};
// 获取用户信息
export const getUserInfo = (router?: string) => {
  return useGet(`${Config.Api.Base}${Config.Api.GetUserInfo}`, {
    autoLoading: true,
    headers: { pageRouter: router },
  });
};

// 获取代办数量
export const getPendingOrderCount = (router?: string) => {
  let url = Config.Api.HandlerGetPendingOrderCount;
  if (router == 'bP/home') {
    url = Config.Api.BPGetPendingOrderCount;
  }
  return useGet(`${Config.Api.Base}${url}`, {
    headers: { pageRouter: router },
  });
};

export const getCount = (router?: string) => {
  let url: string;
  switch (router) {
    case 'bP/home':
      url = Config.Api.BPGetCount;
      break;
    case 'subD/home':
      url = Config.Api.SubDGetDraftOrderCount;
      break;
    default:
      url = Config.Api.HandlerGetPendingOrderCount;
      break;
  }
  return useGet(`${Config.Api.Base}${url}`, {
    headers: { pageRouter: router },
  });
};
// handler-仪器代办数量
// export const YQHandlerGetPendingOrderCount = (router?: string) => {

//   return useGet(`${Config.Api.Base}${url}`, {
//     headers: { pageRouter: router },
//   });
// };

// export const YQBPGetCount = (router?: string) => {
//   return useGet(`${Config.Api.Base}${url}`, {
//     headers: { pageRouter: router },
//   });
// };

export const getYQCount = (router?: string) => {
  let url: string;
  switch (router) {
    case 'bP/home':
      // 草稿和代办
      url = Config.Api.YQBPGetCount;
      break;
    case 'subD/home':
      return;
    default:
      // 代办
      url = Config.Api.YQHandlerGetPendingOrderCount;
      break;
  }
  return useGet(`${Config.Api.Base}${url}`, {
    headers: { pageRouter: router },
  });
};

export const acceptLicenseAgreement = (data?: null, router?: string) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.AcceptLicenseAgreement}`,
    data,
    {
      autoLoading: true,
      headers: { pageRouter: router },
    },
  );
};
