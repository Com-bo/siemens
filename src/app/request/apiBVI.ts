import { useGet, usePost } from '.';
import Config from '../config';
export const importDataSave = (data: object, type: number) => {
  let url = '';
  switch (type) {
    case 1: //manual
      url = Config.Api.ImportManualDataSave;
      break;
    case 2: //r2r
      url = Config.Api.ImportDataSave;
      break;
    case 3: //h2r bvi
      url = Config.Api.ImportH2R;
      break;
    case 4: //H2RTE
      url = Config.Api.ImportH2RTE;
      break;
    case 5:
      url = Config.Api.ImportH2RGMM;
      break;
    case 6:
      url = Config.Api.ImportO2C;
      break;
    case 7:
      url = Config.Api.ImportO2CTI;
      break;
    default:
      url = Config.Api.ImportDataSave;
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
