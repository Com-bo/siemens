import { useGet, usePost } from '.';
import Config from '../config';
export const ServiceLineBasicQueryListData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ServiceLineBasicQueryListData}`, data, {
    autoLoading: true,
  });
};

export const ServiceLineBasicExportData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ServiceLineBasicExportData}`, data, {
    autoLoading: true,
    responseType: 'blob',
  });
};

// export const importCostCenterData = (data: Object) => {
//   return usePost(`${Config.Api.Base}${Config.Api.ImportCostCenterData}`, data, {
//     autoLoading: true,
//   });
// };

export const ServiceLineBasicDeleteData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ServiceLineBasicDeleteData}`, data, {
    autoLoading: true,
  });
};

export const ServiceLineBasicQueryLogData = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.ServiceLineBasicQueryLogData}`,
    data,
    {
      autoLoading: true,
    },
  );
};

export const ServiceLineBasicEditDataSave = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.ServiceLineBasicEditDataSave}`,
    data,
    {
      autoLoading: true,
    },
  );
};
