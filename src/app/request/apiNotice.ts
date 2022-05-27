import { useGet, usePost } from '.';
import Config from '../config';

export const getBtns = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetBtns}`, {
    autoLoading: true,
  });
};
// subD-列表
export const subDGetNoticeList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.SubDGetNoticeList}`, data, {
    autoLoading: true,
  });
};
// 详情

export const getNoticeInfo = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetNoticeInfo}`, data, {
    autoLoading: true,
  });
};
// bp-公告列表
export const bpGetNoticeList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BpGetNoticeList}`, data, {
    autoLoading: true,
  });
};
// handler-公告列表
export const handlerGetNoticeList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.HandlerGetNoticeList}`, data, {
    autoLoading: true,
  });
};
// 获取标识图标
export const getInformationLogoDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetInformationLogoDdl}`, {
    autoLoading: true,
  });
};
// 删除公告
export const deleteInformation = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DeleteInformation}`, data, {
    autoLoading: true,
  });
};
// 获取标题颜色
export const getInformationSubjectColorDdl = () => {
  return useGet(
    `${Config.Api.Base}${Config.Api.GetInformationSubjectColorDdl}`,
    {
      autoLoading: true,
    },
  );
};
// 获取一级经销商下的子类型
export const getAgencyTypeDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetAgencyTypeDdl}`, {
    autoLoading: true,
  });
};
// 公告详情
export const handlerGetInfo = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.HandlerGetInfo}`, data, {
    autoLoading: true,
  });
};

// 新建公告
export const addInfo = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.AddInfo}`, data, {
    autoLoading: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
// 修改公告
export const updateInfo = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.UpdateInfo}`, data, {
    autoLoading: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
