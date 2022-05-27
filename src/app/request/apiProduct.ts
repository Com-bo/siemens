import { useGet, usePost } from '.';
import Config from '../config';

export const getBtns = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetBtns}`, {
    autoLoading: true,
  });
};
// 产品列表接口
export const getProductList = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetProductList}`, data, {
    autoLoading: true,
  });
};
// 删除产品
export const delPro = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DelPro}`, data, {
    autoLoading: true,
  });
};
//   获取产品线
export const getProductTypeDdl = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.FuzzyGetProductTypeDdl}`,
    data,
    {
      autoLoading: false,
    },
  );
};

//   保存产品
export const savePro = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.savePro}`, data, {
    autoLoading: true,
  });
};

export const getCurrencyDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.getCurrencyDdl}`, {
    autoLoading: true,
  });
};
export const getAgencyProLimitList = (data: object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.GetAgencyProLimitList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
export const getAgencyRegionDdl = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetAgencyRegionDdl}`, data);
};

export const importAgencyProLimit = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ImportAgencyProLimit}`, data, {
    autoLoading: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
// 导入限额
export const importLimit = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ImportLimit}`, data, {
    autoLoading: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const getBpAgencyList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetBpAgencyList}`, data, {
    autoLoading: true,
  });
};

export const getProductById = (data: Object) => {
  return useGet(`${Config.Api.Base}${Config.Api.GetProductById}`, {
    params: data,
    autoLoading: true,
  });
};

// 产品管理导出
export const exportExcel = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ProExportExcel}`, data, {
    autoLoading: true,
    // responseType:'arraybuffer'
    // responseType: 'blob',
  });
};
//导出订货限额
export const limitExportExcel = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.LimitExportExcel}`, data, {
    autoLoading: true,
  });
};
// Pto列表
export const getPtoProductList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetPtoProductList}`, data, {
    autoLoading: true,
  });
};
// handler-产品报备列表
export const getB2GProductReportList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetPageList}`, data, {
    autoLoading: true,
  });
};
// 获取年下拉框
export const getReportYearDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetReportYearDdl}`, {
    autoLoading: true,
  });
};
export const getReportMonthDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetReportMonthDdl}`, {
    autoLoading: true,
  });
};
// 删除产品报备
export const delB2GPro = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.B2GDel}`, data, {
    autoLoading: true,
  });
};
// 导出产品报备
export const exportB2GExcel = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.B2GExportExcel}`, data, {
    autoLoading: true,
  });
};
//导入b2g产品报备

export const importB2GProReport = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.B2GImport}`, data, {
    autoLoading: true,
  });
};
// 导入Pto库位
export const importPTO = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ImportPTO}`, data, {
    autoLoading: true,
  });
};
// 导出pto
export const exportPTO = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.PTOExport}`, data, {
    autoLoading: true,
  });
};
// 限额清空
export const clearAgencyProLimit = () => {
  return usePost(
    `${Config.Api.Base}${Config.Api.ClearAgencyProLimit}`,
    {},
    {
      autoLoading: true,
    },
  );
};
// bp-产品查询列表
export const getAgencyProductList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetAgencyProductList}`, data, {
    autoLoading: true,
  });
};

export const exportPtoProductExcel = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.ExportPtoProductExcel}`,
    data,
    {
      autoLoading: true,
    },
  );
};
