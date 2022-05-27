import { useGet, usePost } from '.';
import Config from '../config';
export const getBtns = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetBtns}`, {
    autoLoading: true,
  });
};
// 订单类型
export const getOrderType = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetOrderTypeDdl}`, {
    autoLoading: true,
  });
};
//   货品分类
export const getProductCategoryDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetProductCategoryDdl}`, {
    autoLoading: true,
  });
};
//   ship to party
export const getAgencyShipToPartyDdl = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.FuzzyGetAgencyShipToPartyDdl}`,
    data,
  );
};
export const subDGetOrderProductByNo = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.SubDGetOrderProductByNo}`,
    data,
  );
};
export const bPAddSubmitOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BPAddSubmitOrder}`, data, {
    autoLoading: true,
  });
};
// 更新订单
export const bPModifySubmitOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BPModifySubmitOrder}`, data, {
    autoLoading: true,
  });
};
// 编辑存至草稿
export const bPModifyDraftOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BPModifyDraftOrder}`, data, {
    autoLoading: true,
  });
};
// 产品是否超限额
export const getProductLimitForAgency = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.GetProductLimitForAgency}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 新建草稿
export const bPAddDraftOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BPAddDraftOrder}`, data, {
    autoLoading: true,
  });
};
// bp订单详情
export const bPGetOrderInfo = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BPGetOrderInfo}`, data, {
    autoLoading: true,
  });
};

// bp 我发起的订单
export const bPGetSubmitOrderList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BPGetSubmitOrderList}`, data, {
    autoLoading: true,
  });
};
// 取消我发起的订单，只有超限额待审核、已下单待受理、订单受理被退回、
export const bPCancleSubmitOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BPCancleSubmitOrder}`, data, {
    autoLoading: true,
  });
};
// 订单状态
export const getOrderStatusDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetOrderStatusDdl}`, {
    autoLoading: true,
  });
};
// 原订单号模糊查询
export const bPGetCanAddOrderList = (data: Object) => {
  return useGet(`${Config.Api.Base}${Config.Api.BPGetCanAddOrderList}`, {
    params: data,
  });
};
// bp-追加订单-提交
export const bPAddAdditionalOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BPAddAdditionalOrder}`, data, {
    autoLoading: true,
  });
};
// 合并下单数据获取

export const getMergeOrderInfo = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetMergeOrderInfo}`, data, {
    autoLoading: true,
  });
};

// 合并下单接口
export const mergeOrderInfo = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.MergeOrderInfo}`, data, {
    autoLoading: true,
  });
};
// 我保存的草稿列表-bp
export const bPGetDraftOrderList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BPGetDraftOrderList}`, data, {
    autoLoading: true,
  });
};
// 删除草稿
export const bPDelDraftOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BPDelDraftOrder}`, data, {
    autoLoading: true,
  });
};
// 获取付款方式列表
export const getPaymentTypeInfos = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetPaymentTypeInfos}`);
};
// 获取b2g下的报备月份
export const getB2GReportYMInfo = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetB2GReportYMInfo}`, data, {
    autoLoading: true,
  });
};
// 模糊查询产品代码
export const bpGetB2GOrderProductByNo = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.BpGetB2GOrderProductByNo}`,
    data,
  );
};
// b2g订单提交
export const bPAddSubmitB2GOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BPAddSubmitB2GOrder}`, data, {
    autoLoading: true,
  });
};
// 获取poc固定产品列表
export const getAcProducts = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetAcProducts}`, {
    autoLoading: true,
  });
};
// bp-获取pto产品代码
export const bpGetOrderProductByNo = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BpGetOrderProductByNo}`, data);
};
// b2g订单编辑
export const bPModifySubmitOrderToB2G = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.BPModifySubmitOrderToB2G}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// b2g保存草稿
export const bPAddDraftB2GOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BPAddDraftB2GOrder}`, data, {
    autoLoading: true,
  });
};
// b2g编辑草稿
export const bPModifyDraftOrderToB2G = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.BPModifyDraftOrderToB2G}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 追加订单保存草稿
export const bPAddAdditionalDraftOrder = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.BPAddAdditionalDraftOrder}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 上传凭证
export const uploadOrderPaymentCert = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.UploadOrderPaymentCert}`,
    data,
    {
      autoLoading: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const importOrderProduct = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ImportOrderProduct}`, data, {
    autoLoading: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
// 导出
export const bpExportOrderExcel = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BpExportOrderExcel}`, data, {
    autoLoading: true,
  });
};
