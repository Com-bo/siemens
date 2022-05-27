import { useGet, usePost, useExport } from '.';
import Config from '../config';
export const getBtns = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetBtns}`, {
    autoLoading: true,
  });
};
// 最终用户跟踪列表
export const getBpEndUserTrackList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.GetBpEndUserTrackList}`,
    data,
    {
      autoLoading: true,
    },
  );
};

export const deleteEndUserTrackInfo = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.DeleteEndUserTrackInfo}`,
    data,
    {
      autoLoading: true,
    },
  );
};
//   获取发货年月
export const getBpEndUserTrackYmDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetBpEndUserTrackYmDdl}`, {
    autoLoading: true,
  });
};
export const getEndUserTrackYmDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetEndUserTrackYmDdl}`, {
    autoLoading: true,
  });
};

//   申报类型
export const getEndUserReportTypeDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetEndUserReportTypeDdl}`, {
    autoLoading: true,
  });
};
//   申报状态
export const getEndUserTrackStatusDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetEndUserTrackStatusDdl}`, {
    autoLoading: true,
  });
};
//上传
export const importEndUserTrackDetail = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.ImportEndUserTrackDetail}`,
    data,
    {
      autoLoading: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};
//  新建&&编辑申报单
export const submitEndUserTrack = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.SubmitEndUserTrack}`, data, {
    autoLoading: true,
  });
};
//  新建&&编辑申报单草稿
export const saveEndUserTrack = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.SaveEndUserTrack}`, data, {
    autoLoading: true,
  });
};
// 申报单详情接口
export const getEndUserTrackInfo = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetEndUserTrackInfo}`, data, {
    autoLoading: true,
  });
};
// 删除申报产品明细
export const deleteEndUserTrackDetailInfo = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.DeleteEndUserTrackDetailInfo}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// handler
// 用户跟踪列表
export const getEndUserTrackList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetEndUserTrackList}`, data, {
    autoLoading: true,
  });
};

export const returned = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.Returned}`, data, {
    autoLoading: true,
  });
};
// 经销商库存明细
export const getStockPageList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetStockPageList}`, data, {
    autoLoading: true,
  });
};
// 可订货品分类
export const getAgencyProductCategoryList = (data?: Object) => {
  return useGet(`${Config.Api.Base}${Config.Api.GetProductCategoryDdl}`, {
    params: data,
    autoLoading: true,
  });
};
// 区域
export const getAgencyRegionDdl = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetAgencyRegionDdl}`, data);
};
// 导出
export const stockListExport = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.StockListExport}`, data, {
    autoLoading: true,
  });
};

// 最终用户导出
export const endUserTrackExportExcel = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.EndUserTrackExportExcel}`,
    data,
    {
      autoLoading: true,
    },
  );
};
//   获取产品线
export const getProductTypeDdl = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.FuzzyGetProductTypeDdl}`,
    data,
  );
};
// bp-经销商库存明细
export const getBpStockPageList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetBpStockPageList}`, data, {
    autoLoading: true,
  });
};
// 获取用户信息
export const getUserInfo = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetUserInfo}`, {
    autoLoading: true,
  });
};
// 货品分类
export const getProductCategoryDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetProductCategoryDdl}`, {
    autoLoading: true,
  });
};
// 西门子出库导入
export const importSiemensOut = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ImportSiemensOut}`, data, {
    autoLoading: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
// 西门子信息列表
export const getSiemensOutList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetSiemensOutList}`, data, {
    autoLoading: true,
  });
};
// 出库年月
export const getSiemensOutYmDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetSiemensOutYmDdl}`, {
    autoLoading: true,
  });
};
// 库存明细详情
export const getBpDetail = (data: Object) => {
  return useGet(`${Config.Api.Base}${Config.Api.GetBpDetail}`, {
    autoLoading: true,
    params: data,
  });
};
// 损耗编辑、新增
export const stockLossSave = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.StockLossSave}`, data, {
    autoLoading: true,
  });
};
// 损耗详情
export const getLossBpDetail = (data: Object) => {
  return useGet(`${Config.Api.Base}${Config.Api.GetLossBpDetail}`, {
    autoLoading: true,
    params: data,
  });
};
// bp-经销商库存损耗管理
export const getBpAgencyStockLossList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.GetBpAgencyStockLossList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// bp-经销商库存损耗管理删除
export const deleteBpAgencyStockLoss = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.DeleteBpAgencyStockLoss}`,
    data,
    {
      autoLoading: true,
    },
  );
};

// handler-经销商库存损耗记录
export const getAgencyStockLossList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.GetAgencyStockLossList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// handler-经销商库存损耗记录导出
export const exportAgencyStockLossExcel = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.ExportAgencyStockLossExcel}`,
    data,
    {
      autoLoading: true,
    },
  );
};
export const fuzzyGetAgencyRegionDdl = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/AgencyRegion/FuzzyGetAgencyRegionDdl'}`,
    formData,
    {
      autoLoading: false,
    },
  );
};
export const getOrderProductByNoForEndUserTrack = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.GetOrderProductByNoForEndUserTrack}`,
    data,
    {
      autoLoading: false,
    },
  );
};
