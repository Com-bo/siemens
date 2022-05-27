import { useGet, usePost } from '.';
import Config from '../config';
export const getBtns = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetBtns}`, {
    autoLoading: true,
  });
};
// 外贸公司管理列表
export const handlerGetForeignTradeCompanyList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.HandlerGetForeignTradeCompanyList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 删除外贸公司信息
export const deleteForeignTradeCompany = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.DeleteForeignTradeCompany}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 外贸公司详情
export const handlerGetForeignTradeCompanyInfo = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.HandlerGetForeignTradeCompanyInfo}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 修改外贸公司
export const modifyForeignTradeCompany = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.ModifyForeignTradeCompany}`,
    data,
    {
      autoLoading: true,
    },
  );
};

// 新建外贸公司
export const addForeignTradeCompany = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.AddForeignTradeCompany}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 外贸公司导出
export const tradeCompanyExportExcel = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.TradeCompanyExportExcel}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 外贸公司导入
export const importForeignTradeCompany = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.ImportForeignTradeCompany}`,
    data,
    {
      autoLoading: true,
    },
  );
};
