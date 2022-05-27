import { useGet, usePost } from '.';
import Config from '../config';
export const getBtns = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetBtns}`, {
    autoLoading: true,
  });
};
// handler-待我处理的订单列表
export const yqHanderlGetPendingOrderList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.YQHanderlGetPendingOrderList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 订单类型
export const getInstrumentOrderTypeDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetInstrumentOrderTypeDdl}`);
};
// 货品分类
export const getInstrumentTypeDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetInstrumentTypeDdl}`, {
    autoLoading: true,
  });
};
// 订单状态
export const getInstrumentOrderStatusDdl = (type?: any) => {
  return useGet(`${Config.Api.Base}${Config.Api.GetInstrumentOrderStatusDdl}`, {
    params: { type },
    autoLoading: true,
  });
};
// 区域
export const getAgencyRegionDdl = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetAgencyRegionDdl}`, data, {
    autoLoading: true,
  });
};
// 终止接口
export const terminateOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.TerminateOrder}`, data, {
    autoLoading: true,
  });
};
// 暂停接口
export const suspendOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.SuspendOrder}`, data, {
    autoLoading: true,
  });
};
// 暂停列表接口
export const yqHandlerGetSuspendOrderList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.YqHandlerGetSuspendOrderList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 进行中的订单
export const yqHandlerGetOnGoingOrderList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.YqHandlerGetOnGoingOrderList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 催收邮件
export const sendUrgeEmail = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.SendUrgeEmail}`, data, {
    autoLoading: true,
  });
};
// 已完成的订单
export const yqHandlerGetCompletedOrderList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.YqHandlerGetCompletedOrderList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 给启动包发邮件
export const sendStartUpReleaseEmail = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.SendStartUpReleaseEmail}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 给订单发邮件
export const sendOrderReleaseEmail = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.SendOrderReleaseEmail}`,
    data,
    {
      autoLoading: true,
    },
  );
};

//我发起的订单列表
export const yqBpGetSubmitOrderList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.YqBpGetSubmitOrderList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 取消订单
export const yqCancelOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.YqCancelOrder}`, data, {
    autoLoading: true,
  });
};
// 我保存的草稿list
export const yQBpGetDraftOrderList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.YQBpGetDraftOrderList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 删除草稿
export const yQDeleteDraft = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.YQDeleteDraft}`, data, {
    autoLoading: true,
  });
};
// 待我处理的订单列表
export const yQBpGetPendingOrderList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.YQBpGetPendingOrderList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 订单详情
export const yQGetOrderInfo = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.YQGetOrderInfo}`, data, {
    autoLoading: true,
  });
};
// 上传启动包SO
export const uploadStartupSO = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.UploadStartupSO}`, data, {
    autoLoading: true,
  });
};
// 确认付款凭证
export const YQConfirmPayment = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.YQConfirmPayment}`, data, {
    autoLoading: true,
  });
};
// 确认尾款凭证
export const yQConfirmDue = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.YQConfirmDue}`, data, {
    autoLoading: true,
  });
};
// 受理订单
export const yQApproveOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.YQApproveOrder}`, data, {
    autoLoading: true,
  });
};
// 交货方式
export const getDeliveryTypeDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetDeliveryTypeDdl}`);
};
// 修改二级备案
export const modifySubRecord = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ModifySubRecord}`, data, {
    autoLoading: true,
  });
};
// shipto
export const getAgencyShipToPartyDdl = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.FuzzyGetAgencyShipToPartyDdl}`,
    data,
  );
};
// 付款方式
export const getInstrumentPaymentDdl = (data: object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.GetInstrumentPaymentDdl}`,
    data,
  );
};
// 付款币种
export const getCurrencyDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.getCurrencyDdl}`);
};
// 外贸公司
export const getFTCompanyDdl = (name: string) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetFTCompanyDdl}`, {
    name,
  });
};
// 产品模糊搜索
export const bPYQGetInstrumentDdl = (keyword: string) => {
  return usePost(`${Config.Api.Base}${Config.Api.BPYQGetInstrumentDdl}`, {
    keyword,
    searchFromDate: '',
    searchToDate: '',
    pageIndex: 1,
    pageSize: 100,
  });
};
//发起销售订单
export const addSaleOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.AddSaleOrder}`, data, {
    autoLoading: true,
  });
};
// 发起租赁订单
export const addRentOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.AddRentOrder}`, data, {
    autoLoading: true,
  });
};
// 新建销售草稿
export const addSaleDraft = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.AddSaleDraft}`, data, {
    autoLoading: true,
  });
};
//建租赁草稿
export const addRentDraft = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.AddRentDraft}`, data, {
    autoLoading: true,
  });
};
//编辑销售订单/提交销售草稿
export const editSaleOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.EditSaleOrder}`, data, {
    autoLoading: true,
  });
};
//编辑租赁订单/提交租赁草稿
export const editRentOrder = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.EditRentOrder}`, data, {
    autoLoading: true,
  });
};
//编辑销售草稿
export const editSaleDraft = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.EditSaleDraft}`, data, {
    autoLoading: true,
  });
};
//编辑租赁草稿
export const editRentDraft = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.EditRentDraft}`, data, {
    autoLoading: true,
  });
};
// 上传付款凭证
export const yQUploadPaymentCert = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.YQUploadPaymentCert}`, data, {
    autoLoading: true,
  });
};
// 上传尾款凭证
export const yQUploadDueCert = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.YQUploadDueCert}`, data, {
    autoLoading: true,
  });
};
// 获取付款方式列表
export const getInstrumentPaymentWayDdl = (data?) => {
  return useGet(`${Config.Api.Base}${Config.Api.GetInstrumentPaymentWayDdl}`, {
    params: data,
  });
};
// 导出已完成订单
export const yQExportFinishExcel = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.YQExportFinishExcel}`, data, {
    autoLoading: true,
  });
};
// 导出进行中的订单
export const yQExportOnGoingExcel = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.YQExportOnGoingExcel}`, data, {
    autoLoading: true,
  });
};
// 暂停中的订单
export const yQExportSuspendExcel = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.YQExportSuspendExcel}`, data, {
    autoLoading: true,
  });
};
// 导出待我处理的订单
export const yQExportPendingExcel = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.YQExportPendingExcel}`, data, {
    autoLoading: true,
  });
};
// 重新发送数据给合同系统
export const yQResendDataToContractSystem = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.ResendDataToContractSystem}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// hetong
export const uploadConstractFile = (data: any) => {
  return usePost(`${Config.Api.Base}${Config.Api.UploadConstractFile}`, data, {
    autoLoading: true,
  });
};

export const getSealTypeDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetSealTypeDdl}`, {
    autoLoading: true,
  });
};
