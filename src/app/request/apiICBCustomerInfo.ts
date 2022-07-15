import { useGet, usePost } from '.';
import Config from '../config';
export const ICBCustomerInfoQueryListData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ICBCustomerInfoQueryListData}`, data, {
    autoLoading: true,
  });
};

export const ICBCustomerInfoExportData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ICBCustomerInfoExportData}`, data, {
    autoLoading: true,
    responseType: 'blob',
  });
};

// export const importCostCenterData = (data: Object) => {
//   return usePost(`${Config.Api.Base}${Config.Api.ImportCostCenterData}`, data, {
//     autoLoading: true,
//   });
// };

export const ICBCustomerInfoDeleteData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ICBCustomerInfoDeleteData}`, data, {
    autoLoading: true,
  });
};

export const ICBCustomerInfoQueryLogData = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.ICBCustomerInfoQueryLogData}`,
    data,
    {
      autoLoading: true,
    },
  );
};

export const ICBCustomerInfoEditDataSave = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.ICBCustomerInfoEditDataSave}`,
    data,
    {
      autoLoading: true,
    },
  );
};
