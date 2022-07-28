import { useGet, usePost } from '.';
import Config from '../config';
export const getBtns = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetBtns}`, {
    autoLoading: false,
  });
};
//   handler-试剂-进行中
export const handlerGetOnGoingOrderCount = () => {
  return useGet(`${Config.Api.Base}${Config.Api.HandlerGetOnGoingOrderCount}`, {
    autoLoading: false,
  });
};
//   handler-仪器-进行中
export const handlerGetInstrumentOnGoingOrderCount = () => {
  return useGet(
    `${Config.Api.Base}${Config.Api.HandlerGetInstrumentOnGoingOrderCount}`,
    {
      autoLoading: false,
    },
  );
};
// handler试剂订单-代办数量
export const getPendingOrderCount = (router?: string) => {
  let url = Config.Api.HandlerGetPendingOrderCount;

  return useGet(`${Config.Api.Base}${url}`, {
    headers: { pageRouter: router },
  });
};
//  bp-试剂代办
export const getBPPendingOrderCount = () => {
  return useGet(`${Config.Api.Base}${Config.Api.BPGetPendingOrderCount}`);
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
  return useGet(`${Config.Api.Base}${url}`);
};
// 仪器代办数量
export const getYQCount = (router?: string) => {
  let url: string;
  switch (router) {
    case 'bP/home':
      // 草稿和代办
      url = Config.Api.YQBPGetCount;
      break;
    default:
      // 代办
      url = Config.Api.YQHandlerGetPendingOrderCount;
      break;
  }
  return useGet(`${Config.Api.Base}${url}`);
};
// 智能提醒
export const getRemindersList = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetRemindersList}`, data);
};

export const handlerGetOrderRegionCount = (data: object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.HandlerGetOrderRegionCount}`,
    data,
  );
};
// 仪器-产品类别
export const getHomeInstrumentTypeDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetHomeInstrumentTypeDdl}`, {
    autoLoading: false,
  });
};
// 仪器地图
export const handlerGetInsOrderRegionCount = (data: object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.HandlerGetInsOrderRegionCount}`,
    data,
  );
};

export const readInformation = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ReadInformation}`, data, {
    autoLoading: true,
  });
};

export const getDashboardProductCategoryDdl = () => {
  return useGet(
    `${Config.Api.Base}${Config.Api.GetDashboardProductCategoryDdl}`,
    {
      autoLoading: false,
    },
  );
};

// 
export const HomeQueryData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.HomeQueryData}`, data, {
    autoLoading: true,
  });
};
