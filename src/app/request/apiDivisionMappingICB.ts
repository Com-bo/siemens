import { useGet, usePost } from '.';
import Config from '../config';
export const DivisionMappingICBQueryListData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DivisionMappingICBQueryListData}`, data, {
    autoLoading: true,
  });
};

export const DivisionMappingICBExportData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DivisionMappingICBExportData}`, data, {
    autoLoading: true,
    responseType: 'blob',
  });
};
export const DivisionMappingICBImportData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DivisionMappingICBImportData}`, data, {
    autoLoading: true,
  });
};

export const DivisionMappingICBDeleteData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DivisionMappingICBDeleteData}`, data, {
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

export const DivisionMappingICBEditDataSave = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.DivisionMappingICBEditDataSave}`,
    data,
    {
      autoLoading: true,
    },
  );
};
