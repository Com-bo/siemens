import { useGet, usePost } from '.';
import Config from '../config';
export const QueryLogicH2R = () => {
  return useGet(`${Config.Api.Base}${Config.Api.QueryLogicH2R}`);
};
// export const QueryLogicH2R = (data: Object) => {
//   return usePost(`${Config.Api.Base}${Config.Api.QueryLogicH2R}`, data, {
//     autoLoading: true,
//   });
// };

// export const SpecialDivisionExportData = (data: Object) => {
//   return usePost(`${Config.Api.Base}${Config.Api.SpecialDivisionExportData}`, data, {
//     autoLoading: true,
//     responseType: 'blob',
//   });
// };
// export const SpecialDivisionImportData = (data: Object) => {
//   return usePost(`${Config.Api.Base}${Config.Api.SpecialDivisionImportData}`, data, {
//     autoLoading: true,
//   });
// };

export const DeleteLogicH2R = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DeleteLogicH2R}`, data, {
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

export const EditLogicH2R = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.EditLogicH2R}`,
    data,
    {
      autoLoading: true,
    },
  );
};
export const AddLogicH2R = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.AddLogicH2R}`,
    data,
    {
      autoLoading: true,
    },
  );
};
