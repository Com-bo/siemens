import { useGet, usePost } from '@/app/request';
import Config from '@/app/config';
export const getBtns = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetBtns}`, {
    autoLoading: true,
  });
};
export const request1 = (formData: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.Login}`, formData, {
    autoLoading: true,
  });
};

//#region SubD接口
//获取SubD草稿分页数据
export const subDGetDraftOrderList = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/SubDGetDraftOrderList'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

///获取SubD订单分页数据
export const subDGetSubmitOrderList = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/SubDGetSubmitOrderList'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

///获取SubD订单分页详情
export const subDGetOrderInfo = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/SubDGetOrderInfo'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

export const bPGetGetSubDOrderInfo = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/BPGetGetSubDOrderInfo'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

//取消订单
export const subDCancleSubmitOrder = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/SubDCancleSubmitOrder'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

//获取订单状态
export const getOrderStatusDdl = (data?) => {
  return useGet(
    `${Config.Api.Base}${'/api/Dictionary/GetOrderStatusDdl'}${
      '?type=' + data
    }`,
    {
      autoLoading: true,
    },
  );
};

//删除订单
export const subDDelDraftOrder = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/SubDDelDraftOrder'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

//提交SubD草稿订单
export const subDAddDraftOrder = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/SubDAddDraftOrder'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

//编辑SubD 草稿订单
export const subDModifyDraftOrder = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/SubDModifyDraftOrder'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

//提交SubD订单
export const subDAddSubmitOrder = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/SubDAddSubmitOrder'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

//#endregion OrderType接口

//#region Agency接口
export const saveAgency = (formData: object) => {
  return usePost(`${Config.Api.Base}${'/api/Agency/SaveAgency'}`, formData, {
    autoLoading: true,
  });
};

//#endregion

export const getOrderTypeDdl = () => {
  return useGet(`${Config.Api.Base}${'/api/OrderType/GetOrderTypeDdl'}`, {
    autoLoading: true,
  });
};

//#region  OrderType接口

//#endregion

//#region Product产品接口

export const getProductCategoryDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetProductCategoryDdl}`, {
    autoLoading: true,
  });
};

export const subDGetOrderProductByNo = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Product/SubDGetOrderProductByNo'}`,
    formData,
    {
      autoLoading: false,
    },
  );
};

//产品导入
export const importOrderProduct = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/ImportOrderProduct'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

//经销商获取产品分页查询
export const getAgencyProductList = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Product/GetAgencyProductList'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

//#endregion

//#region  SysConfig

export const fuzzyGetAgencyRegionDdl = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/AgencyRegion/FuzzyGetAgencyRegionDdl'}`,
    formData,
    {
      autoLoading: false,
    },
  );
};

export const getAgencyTypeDdl = () => {
  return useGet(`${Config.Api.Base}${'/api/Dictionary/GetAgencyTypeDdl'}`, {
    autoLoading: true,
  });
};

export const getValidStatusDdl = () => {
  return useGet(`${Config.Api.Base}${'/api/Dictionary/GetValidStatusDdl'}`, {
    autoLoading: true,
  });
};

export const getBpAgencyProductCategoryList = (agencyId?: string) => {
  return useGet(
    `${Config.Api.Base}${'/api/Agency/GetBpAgencyProductCategoryList'}${
      agencyId ? '?agencyId=' + agencyId : ''
    }`,
    {
      autoLoading: true,
    },
  );
};

export const getBpAgencyOrderTypeList = (agencyId?: string) => {
  return useGet(
    `${Config.Api.Base}${'/api/Agency/GetBpAgencyOrderTypeList'}${
      agencyId ? '?agencyId=' + agencyId : ''
    }`,
    {
      autoLoading: true,
    },
  );
};

export const getBpAgencyList = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Agency/GetBpAgencyList'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

export const fuzzyGetAgencyShipToPartyDdl = (formData: object) => {
  return usePost(
    `${
      Config.Api.Base
    }${'/api/AgencyShiptoParty/FuzzyGetAgencyShipToPartyDdl'}`,
    formData,
    {
      autoLoading: false,
    },
  );
};

export const getAgencyShipToParty = (agencyId?: string) => {
  return useGet(
    `${Config.Api.Base}${'/api/Agency/GetAgencyShipToParty'}${
      agencyId ? '?agencyId=' + agencyId : ''
    }`,
    {
      autoLoading: true,
    },
  );
};

export const getAgency = (Id: string) => {
  return useGet(
    `${Config.Api.Base}${'/api/Agency/GetAgency'}${Id ? '?Id=' + Id : ''}`,
    {
      autoLoading: true,
    },
  );
};

export const getAgencyUserList = (agencyId?: string) => {
  return useGet(
    `${Config.Api.Base}${'/api/Agency/GetAgencyUserList'}${
      agencyId ? '?agencyId=' + agencyId : ''
    }`,
    {
      autoLoading: true,
    },
  );
};

export const getRoleInfoList = (formData: object) => {
  return usePost(`${Config.Api.Base}${'/api/Role/GetRoleInfoList'}`, formData, {
    autoLoading: true,
  });
};

export const deleteRole = (formData: object) => {
  return usePost(`${Config.Api.Base}${'/api/Role/DeleteRole'}`, formData, {
    autoLoading: true,
  });
};

export const getRoleTypeDdl = () => {
  return useGet(`${Config.Api.Base}${'/api/Role/GetRoleTypeDdl'}`, {
    autoLoading: true,
  });
};

export const getRolePrivilegesByType = (roleTypeId?: string) => {
  return useGet(
    `${Config.Api.Base}${
      '/api/Role/GetRolePrivilegesByType?roleTypeId=' + roleTypeId
    }`,
    {
      autoLoading: true,
    },
  );
};

export const getDataPrivilegeList = (type?: string) => {
  return useGet(
    `${Config.Api.Base}${Config.Api.GetDataPrivilegeList}?type=${type}`,
    {
      autoLoading: true,
    },
  );
};

export const getDataPrivilegeByRole = (type?: string, roleId?) => {
  return useGet(
    `${Config.Api.Base}${Config.Api.GetDataPrivilegeByRole}?type=${type}&roleId=${roleId}`,
    {
      autoLoading: true,
    },
  );
};

export const saveRole = (formData: object) => {
  return usePost(`${Config.Api.Base}${'/api/Role/SaveRole'}`, formData, {
    autoLoading: true,
  });
};

export const getRolePrivilegesById = (roleId?: string) => {
  return useGet(
    `${Config.Api.Base}${'/api/Role/GetRolePrivilegesById?roleId=' + roleId}`,
    {
      autoLoading: true,
    },
  );
};

//#endregion

//#region 二级经销商

export const getSubDAgencyList = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Agency/GetSubDAgencyList'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

export const deleteAgency = (formData: object) => {
  return usePost(`${Config.Api.Base}${'/api/Agency/DeleteAgency'}`, formData, {
    autoLoading: true,
  });
};

export const getBpRoleDdl = () => {
  return useGet(`${Config.Api.Base}${'/api/Role/GetBpRoleDdl'}`, {
    autoLoading: true,
  });
};

export const getSubDAgencyUserList = (agencyId: string) => {
  return useGet(
    `${Config.Api.Base}${
      '/api/Agency/GetSubDAgencyUserList?agencyId=' + agencyId
    }`,
    {
      autoLoading: true,
    },
  );
};

export const getSubDAgency = (id: string) => {
  return useGet(`${Config.Api.Base}${'/api/Agency/GetSubDAgency?id=' + id}`, {
    autoLoading: true,
  });
};

export const saveSubDAgency = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Agency/SaveSubDAgency'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

export const fuzzyGetBpAgencyDdlByName = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Agency/FuzzyGetBpAgencyDdlByName'}`,
    formData,
    {
      autoLoading: false,
    },
  );
};

//#endregion

export const handlerGetSubmitOrderList = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/HandlerGetSubmitOrderList'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

export const handlerGetSuspendOrderList = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/HandlerGetSuspendOrderList'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

export const suspendOrder = (formData: object) => {
  return usePost(`${Config.Api.Base}${'/api/Order/SuspendOrder'}`, formData, {
    autoLoading: true,
  });
};

export const handlerGetOnGoingOrderList = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/HandlerGetOnGoingOrderList'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

export const handlerGetFinishOrderList = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/HandlerGetFinishOrderList'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

export const handlerGetSubDOrderList = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/HandlerGetSubDOrderList'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

export const terminateOrder = (formData: object) => {
  return usePost(`${Config.Api.Base}${'/api/Order/TerminateOrder'}`, formData, {
    autoLoading: true,
  });
};

export const bPGetPendingOrderList = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/BPGetPendingOrderList'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

export const bPGetSubDOrderList = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/BPGetSubDOrderList'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

export const bPCancleSubmitOrder = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/BPCancleSubmitOrder'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

export const handlerGetOrderInfo = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/HandlerGetOrderInfo'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

export const handlerGetSubDOrderInfo = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/HandlerGetSubDOrderInfo'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

export const handleLimitOrder = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/HandleLimitOrder'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

export const handleOrder = (formData: object) => {
  return usePost(`${Config.Api.Base}${'/api/Order/HandleOrder'}`, formData, {
    autoLoading: true,
  });
};

export const uploadOrderConfirm = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${'/api/Order/UploadOrderConfirm'}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

// handler经销商管理列表导出
export const exportDealerExcel = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ExportDealerExcel}`, data, {
    autoLoading: true,
  });
};

// handler二级经销商管理列表导出
export const exportSubDExcel = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ExportSubDExcel}`, data, {
    autoLoading: true,
  });
};

// handler 暂停中的订单导出
export const exportStopOrderExcel = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ExportStopOrderExcel}`, data, {
    autoLoading: true,
  });
};
// handler 进行中的订单导出
export const exportGoingOrderExcel = (data: object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.ExportGoingOrderExcel}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// handler 待我处理的订单导出
export const exportToDoOrderExcel = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ExportToDoOrderExcel}`, data, {
    autoLoading: true,
  });
};
// handler 已完成订单导出
export const exportCompletedOrderExcel = (data: object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.ExportCompletedOrderExcel}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// handler 二级商发起的订单导出
export const exportSecOrderExcel = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ExportSecOrderExcel}`, data, {
    autoLoading: true,
  });
};
// handler 确认付款凭证
export const handleConfirmPayment = (formData: object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.HandleConfirmPayment}`,
    formData,
    {
      autoLoading: true,
    },
  );
};

// 获取用户信息
export const getUserInfo = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetUserInfo}`, {
    autoLoading: true,
  });
};

// 获取库位数据
export const getStorageLocationList = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetStorageLocationList}`, {
    autoLoading: true,
  });
};

// 获取PublicKey
export const getPublicKey = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetPublicKey}`, {
    autoLoading: false,
  });
};
// bp 修改密码
export const resetSelfPassword = (data: object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ResetSelfPassword}`, data, {
    autoLoading: true,
  });
};
// 更新登录时间
export const loginUpdate = (data: Object, router?: string) => {
  return usePost(`${Config.Api.Base}${Config.Api.LoginUpdate}`, data, {
    autoLoading: true,
    headers: { pageRouter: router },
  });
};
// bp&handler 获取二级商订单类型
export const getSubdOrderTypeDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetSubdOrderTypeDdl}`, {
    autoLoading: true,
  });
};

// handler 经销商管理可订货种类接口
export const getAgencyOrderTypeDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetAgencyOrderTypeDdl}`, {
    autoLoading: true,
  });
};
