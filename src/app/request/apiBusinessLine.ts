import { useGet, usePost } from '.';
import Config from '../config';
export const getCostCenterData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetCostCenterData}`, data, {
    autoLoading: true,
  });
};

export const exportCostCenterExcel = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ExportCostCenterData}`, data, {
    autoLoading: true,
    responseType: 'blob',
  });
};

export const importCostCenterData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ImportCostCenterData}`, data, {
    autoLoading: true,
  });
};

export const deleteCostCenterData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DeleteCostCenterData}`, data, {
    autoLoading: true,
  });
};

export const logCostCenterDataQuery = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.LogCostCenterDataQuery}`,
    data,
    {
      autoLoading: true,
    },
  );
};

export const editCostCenterDataSave = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.EditCostCenterDataSave}`,
    data,
    {
      autoLoading: true,
    },
  );
};
