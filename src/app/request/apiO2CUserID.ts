import { useGet, usePost } from '.';
import Config from '../config';
export const getO2CUserIDListData = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.QueryO2CUserIDListData}`,
    data,
    {
      autoLoading: true,
    },
  );
};

export const exportO2CUserIDData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ExportO2CUserIDData}`, data, {
    autoLoading: true,
    responseType: 'blob',
  });
};

export const deleteO2CUserIDData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DeleteO2CUserIDData}`, data, {
    autoLoading: true,
  });
};

export const queryO2CUserIDLogData = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.QueryO2CUserIDLogData}`,
    data,
    {
      autoLoading: true,
    },
  );
};

export const editO2CUserIDDataSave = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.EditO2CUserIDDataSave}`,
    data,
    {
      autoLoading: true,
    },
  );
};
