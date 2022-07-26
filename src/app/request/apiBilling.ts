import { useGet, usePost } from '.';
import Config from '../config';
export const importDataSave = (data: object, type: number) => {
  let url = '';
  switch (type) {
    case 1: //manual
      url = Config.Api.ImportUIPathResult;
      break;
    case 2: //r2r
      url = Config.Api.ImportTEXTDISP;
      break;
    case 3: //h2r bvi
      url = Config.Api.ImportVF05;
      break;
    default:
      //   url = Config.Api.ImportDataSave;
      break;
  }
  return usePost(`${Config.Api.Base}${url}`, data, {
    autoLoading: true,
  });
};
export const bviGroupQuery = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BviGroupQuery}`, data, {
    autoLoading: true,
  });
};
// copy function
export const bivCopyDta = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BivCopyDta}`, data, {
    autoLoading: true,
  });
};
// export data
export const exportExcel = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ExportBVIData}`, data, {
    autoLoading: true,
    responseType: 'blob',
  });
};
export const unConfirmData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.UnConfirmData}`, data, {
    autoLoading: true,
  });
};
export const confirmData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ConfirmData}`, data, {
    autoLoading: true,
  });
};

export const deleteBVIData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DeleteBVIData}`, data, {
    autoLoading: true,
  });
};
export const InsertBVIData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.InsertBVIData}`, data, {
    autoLoading: true,
  });
};
export const getProductData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.PopWinPagingQuery}`, data, {
    autoLoading: true,
  });
};
export const EditBVIData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.EditBVIData}`, data, {
    autoLoading: true,
  });
};
export const EditDataListSave = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.EditDataListSave}`, data, {
    autoLoading: true,
  });
};
export const getAbnormalOriginDataByBVI = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.GetAbnormalOriginDataByBVI}`,
    data,
    {
      autoLoading: true,
    },
  );
};
export const exportOriginalData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ExportOriginalData}`, data, {
    autoLoading: true,
    responseType: 'blob',
  });
};
//
export const QueryData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.QueryData}`, data, {
    autoLoading: true,
  });
};
export const ExportBillingData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ExportBillingData}`, data, {
    autoLoading: true,
    responseType: 'blob',
  });
};
export const FreezeData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.FreezeData}`, data, {
    autoLoading: true,
  });
};
export const QuickEditDataSave = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.QuickEditDataSave}`, data, {
    autoLoading: true,
  });
};
export const EditDataSaveBill = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.EditDataSaveBill}`, data, {
    autoLoading: true,
  });
};
export const EditDataSpecialSave = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.EditDataSpecialSave}`, data, {
    autoLoading: true,
  });
};
export const SetStatusSave = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.SetStatusSave}`, data, {
    autoLoading: true,
  });
};
export const BatchFileManual = (data) => {
  console.log(data);
  return usePost(
    `${Config.Api.Base}${Config.Api.BatchFileManual}?businessLine=${data}`,{},
    // `${Config.Api.Base}${Config.Api.BatchFileManual}`,
    // data,
    {
      autoLoading: true,
      responseType: 'blob',
    },
  );
};
export const BatchFileAuto = (data: Object) => {
  return usePost(`
  ${Config.Api.Base}${Config.Api.BatchFileAuto}?businessLine=${data}`, {}, {
    autoLoading: true,
    responseType: 'blob',
  });
};
export const AllocationFile = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.AllocationFile}?businessLine=${data}`, {}, {
    autoLoading: true,
    responseType: 'blob',
  });
};
