import { useGet, usePost } from '.';
import Config from '../config';
export const BusinessLineQueryListData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BusinessLineQueryListData}`, data, {
    autoLoading: true,
  });
};

export const BusinessLineExportData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BusinessLineExportData}`, data, {
    autoLoading: true,
    responseType: 'blob',
  });
};

// export const importCostCenterData = (data: Object) => {
//   return usePost(`${Config.Api.Base}${Config.Api.ImportCostCenterData}`, data, {
//     autoLoading: true,
//   });
// };

export const BusinessLineDeleteData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BusinessLineDeleteData}`, data, {
    autoLoading: true,
  });
};

export const BusinessLineQueryLogData = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.BusinessLineQueryLogData}`,
    data,
    {
      autoLoading: true,
    },
  );
};

export const BusinessLineEditDataSave = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.BusinessLineEditDataSave}`,
    data,
    {
      autoLoading: true,
    },
  );
};
