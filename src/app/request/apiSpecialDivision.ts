import { useGet, usePost } from '.';
import Config from '../config';
export const SpecialDivisionQueryListData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.SpecialDivisionQueryListData}`, data, {
    autoLoading: true,
  });
};

// export const exportCostCenterExcel = (data: Object) => {
//   return usePost(`${Config.Api.Base}${Config.Api.ExportCostCenterData}`, data, {
//     autoLoading: true,
//     responseType: 'blob',
//   });
// };
export const SpecialDivisionImportData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.SpecialDivisionImportData}`, data, {
    autoLoading: true,
  });
};

export const SpecialDivisionDeleteData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.SpecialDivisionDeleteData}`, data, {
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

export const SpecialDivisionEditDataSave = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.SpecialDivisionEditDataSave}`,
    data,
    {
      autoLoading: true,
    },
  );
};
