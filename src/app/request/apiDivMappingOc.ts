import { useGet, usePost } from '.';
import Config from '../config';
export const DivMappingOcQueryListData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DivMappingOcQueryListData}`, data, {
    autoLoading: true,
  });
};

export const DivMappingOcExportData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DivMappingOcExportData}`, data, {
    autoLoading: true,
    responseType: 'blob',
  });
};
export const DivMappingOcImportData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DivMappingOcImportData}`, data, {
    autoLoading: true,
  });
};

export const DivMappingOcDeleteData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DivMappingOcDeleteData}`, data, {
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

export const DivMappingOcEditDataSave = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.DivMappingOcEditDataSave}`,
    data,
    {
      autoLoading: true,
    },
  );
};
