import { useGet, usePost } from '.';
import Config from '../config';
export const CurrencyQueryListData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.CurrencyQueryListData}`, data, {
    autoLoading: true,
  });
};

// export const exportCostCenterExcel = (data: Object) => {
//   return usePost(`${Config.Api.Base}${Config.Api.ExportCostCenterData}`, data, {
//     autoLoading: true,
//     responseType: 'blob',
//   });
// };
export const CurrencyImportData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.CurrencyImportData}`, data, {
    autoLoading: true,
  });
};

export const CurrencyDeleteData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.CurrencyDeleteData}`, data, {
    autoLoading: true,
  });
};

// export const logCostCenterDataQuery = (data: Object) => {
//   return usePost(
//     `${Config.Api.Base}${Config.Api.LogCostCenterDataQuery}`,
//     data,
//     {
//       autoLoading: true,
//     },
//   );
// };

export const CurrencyEditDataSave = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.CurrencyEditDataSave}`,
    data,
    {
      autoLoading: true,
    },
  );
};
