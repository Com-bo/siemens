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
export const queryRolePageInfo = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.QueryRolePageInfo}`,
    formData,
    {
      autoLoading: true,
    },
  );
};
