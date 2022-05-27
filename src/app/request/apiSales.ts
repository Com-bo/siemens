import { useGet, usePost } from '.';
import Config from '../config';
export const getBtns = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetBtns}`, {
    autoLoading: true,
  });
};
// 销售预测列表-bp
export const bpGetForecastList = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BpGetForecastList}`, data, {
    autoLoading: true,
  });
};
//   年下拉
export const getForecastYearDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetForecastYearDdl}`, {
    autoLoading: true,
  });
};
//   月下拉
export const getForecastMonthDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetForecastMonthDdl}`, {
    autoLoading: true,
  });
};
// 获取状态
export const getForecastStatusDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetForecastStatusDdl}`, {
    autoLoading: true,
  });
};
// 删除预测
export const deleteForecastInfo = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DeleteForecastInfo}`, data, {
    autoLoading: true,
  });
};
// 导入预测
export const importForecastDetailAndSubmit = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.ImportForecastDetailAndSubmit}`,
    data,
    {
      autoLoading: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};
//   预测单详情
export const getForecastInfo = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetForecastInfo}`, data, {
    autoLoading: true,
  });
};
// 预测单导入
export const importForecastDetail = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ImportForecastDetail}`, data, {
    autoLoading: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
// 退回
export const forecastReturned = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ForecastReturned}`, data, {
    autoLoading: true,
  });
};
//提交
export const forecastSubmit = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ForecastSubmit}`, data, {
    autoLoading: true,
  });
};
// 预测列表-handler
export const handlerGetForecastList = (data: object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.HandlerGetForecastList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 导出
export const forecastExport = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ForecastExport}`, data, {
    autoLoading: true,
  });
};
// 货品分类
export const getProductCategoryDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetProductCategoryDdl}`, {
    autoLoading: true,
  });
};
//   获取产品线
export const getProductTypeDdl = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.FuzzyGetProductTypeDdl}`,
    data,
  );
};
// 区域
export const getAgencyRegionDdl = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetAgencyRegionDdl}`, data);
};
// 预测明细汇总
export const getSummaryForecastList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.GetSummaryForecastList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 预测明细汇总导出
export const exportSummaryExcel = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ExportSummaryExcel}`, data, {
    autoLoading: true,
  });
};
