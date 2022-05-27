import { useGet, usePost } from '.';
import Config from '../config';
export const getBtns = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetBtns}`, {
    autoLoading: true,
  });
};
export const getAgencyRegionDdl = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetAgencyRegionDdl}`, data);
};
// 账号列表
export const getManagerUserInfos = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetManagerUserInfos}`, data, {
    autoLoading: true,
  });
};
//删除账户
export const deleteManagerUserInfo = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.DeleteManagerUserInfo}`,
    data,
    {
      autoLoading: true,
    },
  );
};

export const getValidStatusDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetValidStatusDdl}`, {
    autoLoading: true,
  });
};

export const getUserTypeDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetUserTypeDdl}`, {
    autoLoading: true,
  });
};
export const resetPwd = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ResetUserPassword}`, data, {
    autoLoading: true,
  });
};
// 一级经销商列表
export const getBpAgencyDdlByName = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.FuzzyGetBpAgencyDdlByName}`,
    data,
  );
};
// 二级经销商列表
export const getSubDAgencyDdlByName = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.FuzzyGetSubDAgencyDdlByName}`,
    data,
  );
};

export const getRoleDdlByUserType = (data: Object) => {
  return useGet(`${Config.Api.Base}${Config.Api.GetRoleDdlByUserType}`, {
    params: data,
    autoLoading: true,
  });
};
// 新增用户
export const insertManagerUserInfo = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.InsertManagerUserInfo}`,
    data,
    {
      autoLoading: true,
    },
  );
};
export const getUserInfoById = (data: Object) => {
  return useGet(`${Config.Api.Base}${Config.Api.GetUserInfoById}`, {
    params: data,
    autoLoading: true,
  });
};
export const saveManagerUserInfo = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.SaveManagerUserInfo}`, data, {
    autoLoading: true,
  });
};
// bp——二级商管理
// 二级经销商列表
export const getSubDAgencyList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetSubDAgencyList}`, data, {
    autoLoading: true,
  });
};
// 删除二级商
export const deleteAgency = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DeleteAgency}`, data, {
    autoLoading: true,
  });
};
// 导出二级经销商
export const exportExcelSubD = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ExportExcelSubD}`, data, {
    autoLoading: true,
  });
};
// 提交二级经销商
export const saveSubDAgency = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.SaveSubDAgency}`, data, {
    autoLoading: true,
  });
};
// 获取二级商详情
export const getSubDAgency = (id: string) => {
  return useGet(`${Config.Api.Base}${Config.Api.GetSubDAgency}`, {
    params: { id },
    autoLoading: true,
  });
};
// 获取用户列表
export const getSubDAgencyUserList = (agencyId: string) => {
  return useGet(`${Config.Api.Base}${Config.Api.GetSubDAgencyUserList}`, {
    params: { agencyId },
    autoLoading: true,
  });
};
// 获取用户信息
export const getUserInfo = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetUserInfo}`, {
    autoLoading: true,
  });
};

// 用户账号导出
export const exportAccountExcel = (data) => {
  return usePost(`${Config.Api.Base}${Config.Api.ExportExcel}`, data, {
    autoLoading: true,
  });
};
export const getAgencyRegionDdlForInnerUser = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.GetAgencyRegionDdlForInnerUser}`,
    data,
    {
      autoLoading: true,
    },
  );
};
