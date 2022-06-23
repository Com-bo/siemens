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
