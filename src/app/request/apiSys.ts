import { useGet, usePost } from '.';
import Config from '../config';

export const updateRole = (data: any) => {
  let url = '';
  if (!data?.id) {
    url = Config.Api.InsertRole;
  } else {
    url = Config.Api.ModifyRole;
  }
  return usePost(`${Config.Api.Base}${url}`, data, {
    autoLoading: true,
  });
};
// 角色管理-功能授权树
export const queryRoleMapAuthTrees = (roleId: string) => {
  return useGet(
    `${Config.Api.Base}${Config.Api.QueryRoleMapAuthTrees}?roleId=${roleId}`,
    {
      autoLoading: true,
    },
  );
};
// 角色管理-功能授权
export const roleBingAuth = (formData: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.RoleBingAuth}`, formData, {
    autoLoading: true,
  });
};
// 角色管理-人员维护已选列表
export const queryRoleMapUsers = (roleId: string) => {
  return useGet(
    `${Config.Api.Base}${Config.Api.QueryRoleMapUsers}?roleId=${roleId}`,
    {
      autoLoading: true,
    },
  );
};
// 角色管理-列表
export const queryRolePageInfo = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.QueryRolePageInfo}`, data, {
    autoLoading: true,
  });
};

export const queryUserPageInfo = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.QueryUserPageInfo}`, data, {
    autoLoading: true,
  });
};

export const insertUserInfo = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.InsertUserInfo}`, data, {
    autoLoading: true,
  });
};
export const modifyUserInfo = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ModifyUserInfo}`, data, {
    autoLoading: true,
  });
};
// 角色管理-角色绑定人员
export const roleBingUser = (formData: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.RoleBingUser}`, formData, {
    autoLoading: true,
  });
};
export const delRole = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DelRole}`, data, {
    autoLoading: true,
  });
};
export const deleUser = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DeleUser}`, data, {
    autoLoading: true,
  });
};
// 
export const OtherMasterDataQueryAREOCOptionsList = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.OtherMasterDataQueryAREOCOptionsList}`, data, {
    autoLoading: true,
  });
};
export const OtherMasterDataQueryCustemerDivisionSLCOptionsList = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.OtherMasterDataQueryCustemerDivisionSLCOptionsList}`, data, {
    autoLoading: true,
  });
};
export const ExportUserInfo = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ExportUserInfo}`, data, {
    autoLoading: true,
    responseType: 'blob',
  });
};
