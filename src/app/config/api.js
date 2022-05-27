export const Api = {
  ReflushToken: '/Api/User/Authentication/ReflushToken', // 刷新token
  Login: '/Api/User/Authentication/Login', // 登录
  SocialLogin: '/Api/User/Authentication/ThirdPartyLogin', //第三方社交媒体登录登录
  // 通用
  GetOrderStatusDdl: '/api/Dictionary/GetOrderStatusDdl', //订单状态
  MenuTree: '/api/Privilege/GetUserMenuTree', //菜单
  GetUserInfo: '/api/ManagerUser/GetUserInfo', // 获取用户信息
  GetPublicKey: '/api/ManagerUser/GetKey', // 获取publicKey
  ResetSelfPassword: '/api/ManagerUser/ResetSelfPassword', // bp修改密码

  // 产品管理
  GetProductList: '/api/Product/GetProductList', //产品管理列表
  FuzzyGetProductTypeDdl: '/api/ProductType/FuzzyGetProductTypeDdl', //产品线下拉框
  DelPro: '/api/Product/Delete', //删除产品
  savePro: '/api/Product/Save', //保存产品
  getCurrencyDdl: '/api/Dictionary/GetCurrencyDdl', //获取币种
  GetProductById: '/api/Product/GetProductById', //产品明细
  ProExportExcel: '/api/Product/ExportExcel', //导出
  ImportLimit: '/api/Product/ImportLimit', //导入限额
  GetAgencyProductList: '/api/Product/GetAgencyProductList', //bp-产品查询列表
  // 经销商限额
  GetAgencyProLimitList: '/api/AgencyProLimit/GetAgencyProLimitList', //限额列表
  GetAgencyRegionDdl: '/api/AgencyRegion/FuzzyGetAgencyRegionDdl', //区域接口
  ImportAgencyProLimit: '/api/AgencyProLimit/ImportAgencyProLimit', //导入限额excel
  LimitExportExcel: '/api/AgencyProLimit/ExportExcel', //导出订货限额
  ClearAgencyProLimit: '/api/AgencyProLimit/Clear', //清空产品限额

  // 用户账号管理
  GetUserTypeDdl: '/api/Dictionary/GetUserTypeDdl', //账号类型接口
  GetValidStatusDdl: '/api/Dictionary/GetValidStatusDdl', //账号状态
  GetManagerUserInfos: '/api/ManagerUser/GetManagerUserInfos', //账号列表
  DeleteManagerUserInfo: '/api/ManagerUser/DeleteManagerUserInfo', //删除账号
  ResetUserPassword: '/api/ManagerUser/ResetUserPassword', //重置账号密码
  FuzzyGetBpAgencyDdlByName: '/api/Agency/FuzzyGetBpAgencyDdlByName', //一级经销商接口
  FuzzyGetSubDAgencyDdlByName: '/api/Agency/FuzzyGetSubDAgencyDdlByName', //二级经销商列表
  GetRoleDdlByUserType: '/api/Role/GetRoleDdlByUserType', //用户角色
  InsertManagerUserInfo: '/api/ManagerUser/InsertManagerUserInfo', //新增用户
  GetUserInfoById: '/api/ManagerUser/GetUserInfoById', //用户详情
  SaveManagerUserInfo: '/api/ManagerUser/SaveManagerUserInfo', //编辑用户
  ExportExcel: '/api/ManagerUser/ExportExcel', // 用户账号导出
  LoginUpdate: '/api/ManagerUser/LoginUpdate', //更新登录时间
  // bP
  //我保存的草稿
  BPGetDraftOrderList: '/api/Order/BPGetDraftOrderList', //我保存的草稿列表
  BPDelDraftOrder: '/api/Order/BPDelDraftOrder', //删除草稿
  // 我发起的订单
  GetPaymentTypeInfos: '/api/Order/GetPaymentTypeInfos', //获取付款方式列表
  GetMergeOrderInfo: '/api/Order/GetMergeOrderInfo', //合并下单数据获取
  BPGetSubmitOrderList: '/api/Order/BPGetSubmitOrderList', //我发起的订单分页查询
  BPCancleSubmitOrder: '/api/Order/BPCancleSubmitOrder', //取消订单
  GetOrderTypeDdl: '/api/OrderType/GetOrderTypeDdl', //订单类型
  GetProductCategoryDdl: '/api/ProductCategory/GetProductCategoryDdl', //货品分类
  FuzzyGetAgencyShipToPartyDdl:
    '/api/AgencyShiptoParty/FuzzyGetAgencyShipToPartyDdl', //ship to party
  SubDGetOrderProductByNo: '/api/Product/SubDGetOrderProductByNo', //二级商根据产品No、订单类型、货品分类获取产品明细
  BPAddSubmitOrder: '/api/Order/BPAddSubmitOrder', //提交订单
  BPModifySubmitOrder: '/api/Order/BPModifySubmitOrder', //编辑接口
  BPModifyDraftOrder: '/api/Order/BPModifyDraftOrder', //保存至草稿、、
  GetProductLimitForAgency: '/api/Order/GetProductLimitForAgency', //是否超限额
  BPAddDraftOrder: '/api/Order/BPAddDraftOrder', //bp新增草稿
  BPGetOrderInfo: '/api/Order/BPGetOrderInfo', //订单详情
  BPGetCanAddOrderList: '/api/Order/BPGetCanAddOrderList', //原订单号
  BPAddAdditionalOrder: '/api/Order/BPAddAdditionalOrder', //提交追加订单
  MergeOrderInfo: '/api/Order/MergeOrderInfo', //合并下单提交接口
  GetB2GReportYMInfo: '/api/Order/GetB2GReportYMInfo', //获取b2g订单下的报备月份
  BpGetB2GOrderProductByNo: '/api/Product/BpGetB2GOrderProductByNo', //b2g产品代码模糊查询
  BPAddSubmitB2GOrder: '/api/Order/BPAddSubmitB2GOrder', //B2G类型订单提交
  GetAcProducts: '/api/Order/GetAcProducts', //获取pto订单的固定产品
  BpGetOrderProductByNo: '/api/Product/BpGetOrderProductByNo', //pto获取产品代码信息
  BPModifySubmitOrderToB2G: '/api/Order/BPModifySubmitOrderToB2G', //编辑b2g订单
  BPAddDraftB2GOrder: '/api/Order/BPAddDraftB2GOrder', //b2g保存草稿
  BPModifyDraftOrderToB2G: '/api/Order/BPModifyDraftOrderToB2G', //b2G编辑草稿
  BPAddAdditionalDraftOrder: '/api/Order/BPAddAdditionalDraftOrder', //追加订单保存草稿
  UploadOrderPaymentCert: '/api/Order/UploadOrderPaymentCert', //待我处理的订单-上传凭证
  ImportOrderProduct: '/api/Order/ImportOrderProduct', //导入
  // bp-二级经销商管理
  GetSubDAgencyList: '/api/Agency/GetSubDAgencyList', //二级经销商列表
  DeleteAgency: '/api/Agency/DeleteAgency', //删除二级商
  ExportExcelSubD: '/api/Agency/ExportExcelSubD', //导出二级经销商
  SaveSubDAgency: '/api/Agency/SaveSubDAgency', //提交二级经销商
  GetSubDAgency: '/api/Agency/GetSubDAgency', //二级商详情
  GetSubDAgencyUserList: '/api/Agency/GetSubDAgencyUserList', //获取二级商用户列表
  GetUserInfo: '/api/ManagerUser/GetUserInfo', //获取用户信息
  // 产品管理-Pto
  GetPtoProductList: '/api/PtoProduct/GetPtoProductList', //Pto列表接口

  // 最终用户跟踪
  GetBpEndUserTrackList: '/api/EndUserTrack/GetBpEndUserTrackList', //最终用户跟踪列表
  DeleteEndUserTrackInfo: '/api/EndUserTrack/DeleteEndUserTrackInfo', //删除接口
  GetBpEndUserTrackYmDdl: '/api/EndUserTrack/GetBpEndUserTrackYmDdl', //发货年月
  GetEndUserReportTypeDdl: '/api/Dictionary/GetEndUserReportTypeDdl', //申报类型
  GetEndUserTrackStatusDdl: '/api/Dictionary/GetEndUserTrackStatusDdl', //申报状态
  SaveEndUserTrack: '/api/EndUserTrack/Save', //新增、编辑最终用户草稿
  SubmitEndUserTrack: '/api/EndUserTrack/Submit', //新建编辑用户跟踪信息
  ImportEndUserTrackDetail: '/api/EndUserTrack/ImportEndUserTrackDetail', //上传
  GetEndUserTrackInfo: '/api/EndUserTrack/GetEndUserTrackInfo', //用户跟踪详情接口
  DeleteEndUserTrackDetailInfo:
    '/api/EndUserTrack/DeleteEndUserTrackDetailInfo', // 删除申报产品明细
  // handler-用户跟踪
  GetEndUserTrackList: '/api/EndUserTrack/GetEndUserTrackList', //用户跟踪列表
  GetEndUserTrackYmDdl: '/api/EndUserTrack/GetEndUserTrackYmDdl', //发货年月
  Returned: '/api/EndUserTrack/Returned', //退回
  EndUserTrackExportExcel: '/api/EndUserTrack/ExportExcel', //最终用户导出
  // handler-b2g产品报备
  GetReportYearDdl: '/api/B2gProduct/GetReportYearDdl', //报备年份
  GetReportMonthDdl: '/api/B2gProduct/GetReportMonthDdl', //报备月份
  B2GImport: '/api/B2gProduct/Import', //上传
  B2GExportExcel: '/api/B2gProduct/ExportExcel', //导出
  B2GDel: '/api/B2gProduct/Delete', //删除
  GetPageList: '/api/B2gProduct/GetPageList', //b2G产品报备列表
  // handler-PTO列表
  ImportPTO: '/api/PtoProduct/ImportPtoProduct', //导入PTO
  PTOExport: '/api/PtoProduct/ExportExcel', //导出PTO  // handler-经销商库存明细
  GetStockPageList: '/api/AgencyStock/GetPageList', //经销商库存明细列表
  GetBpAgencyProductCategoryList: '/api/Agency/GetBpAgencyProductCategoryList', //可订货品分类
  StockListExport: '/api/AgencyStock/ExportExcel', //导出
  // bp-经销商库存明细
  GetBpStockPageList: '/api/AgencyStock/GetBpPageList', //bp-经销商库存明细\
  GetProductCategoryDdl: '/api/ProductCategory/GetProductCategoryDdl', //货品分类
  // hanler-西门子出库信息
  ImportSiemensOut: '/api/SiemensOut/ImportSiemensOut', //导入
  GetSiemensOutList: '/api/SiemensOut/GetSiemensOutList', //西门子信息列表
  GetSiemensOutYmDdl: '/api/SiemensOut/GetSiemensOutYmDdl', //获取出库年月
  // handler-系统配置
  ExportDealerExcel: '/api/Agency/ExportExcelBp', // 经销商管理导出
  ExportSubDExcel: '/api/Agency/ExportExcelSubD', // 二级经销商管理导出
  GetAgencyOrderTypeDdl: '/api/Dictionary/GetAgencyOrderTypeDdl', // 经销商管理可订货种类接口
  // handler-订单管理
  ExportStopOrderExcel: '/api/Order/ExportSuspendExcel', // 暂停中的订单导出
  ExportGoingOrderExcel: '/api/Order/ExportOnGoingExcel', // 进行中的订单导出
  HandlerGetOrderInfo: '/api/Order/HandlerGetOrderInfo', // 进行中详情
  HandleConfirmPayment: '/api/Order/HandleConfirmPayment', // 确认付款凭证
  ExportToDoOrderExcel: '/api/Order/ExportPendingExcel', // 待我处理的订单导出
  ExportCompletedOrderExcel: '/api/Order/ExportFinishExcel', // 已完成订单导出
  ExportSecOrderExcel: '/api/Order/ExportSubDOrderExcel', // 二级商发起的订单导出
  // bp-库存损耗详情
  GetBpDetail: '/api/AgencyStock/GetBpDetail', //库存明细详情
  StockLossSave: '/api/AgencyStockLoss/Save', //新增，编辑
  GetStorageLocationList: '/api/Order/GetStorageLocationList', // 库位数据获取
  GetLossBpDetail: '/api/AgencyStockLoss/GetBpDetail', //获取损耗详情
  // bp 经销商库存损耗管理
  GetBpAgencyStockLossList: '/api/AgencyStockLoss/GetBpPageList', // 经销商库存损耗管理列表
  DeleteBpAgencyStockLoss: '/api/AgencyStockLoss/Delete', // 删除经销商库存损耗
  // handler 经销商库存损耗记录
  GetAgencyStockLossList: '/api/AgencyStockLoss/GetPageList', // 经销商库存损耗记录列表
  ExportAgencyStockLossExcel: '/api/AgencyStockLoss/ExportExcel', // 经销商库存损耗记录列表导出
  // 角色
  GetDataPrivilegeList: '/api/Role/GetDataPrivilegeList',
  GetDataPrivilegeByRole: '/api/Role/GetDataPrivilegeByRole',
  // 销售预测
  GetForecastYearDdl: '/api/Forecast/GetForecastYearDdl', //下拉年
  GetForecastMonthDdl: '/api/Forecast/GetForecastMonthDdl', //下拉月
  GetForecastStatusDdl: '/api/Dictionary/GetForecastStatusDdl', //状态
  BpGetForecastList: '/api/Forecast/BpGetForecastList', //销售预测列表
  DeleteForecastInfo: '/api/Forecast/DeleteForecastInfo', //删除
  ImportForecastDetailAndSubmit: '/api/Forecast/ImportForecastDetailAndSubmit', //导入预测
  GetForecastInfo: '/api/Forecast/GetForecastInfo', //预测单详情
  ImportForecastDetail: '/api/Forecast/ImportForecastDetail', //上传预测单
  ForecastReturned: '/api/Forecast/Returned', //退回
  ForecastSubmit: '/api/Forecast/Submit', //预测提交
  HandlerGetForecastList: '/api/Forecast/HandlerGetForecastList', //预测列表
  ForecastExport: '/api/Forecast/ExportExcel', //导出
  // handler-销售管理
  GetSummaryForecastList: '/api/Forecast/GetSummaryForecastList', // 预测明细汇总列表
  ExportSummaryExcel: '/api/Forecast/ExportSummaryExcel', // 预测明细汇总列表导出
  // subD公告
  SubDGetNoticeList: '/api/Information/SubDGetInformationList', //公告列表
  GetNoticeInfo: '/api/Information/GetInformationPopupInfo', //公告详情
  // bp-公告
  BpGetNoticeList: '/api/Information/BpGetInformationList', //公告列表
  // handler-公告
  HandlerGetNoticeList: '/api/Information/HandlerGetInformationList', //公告列表
  HandlerGetInfo: '/api/Information/HandlerGetInformationInfo', //公告明细
  AddInfo: '/api/Information/AddInformation', //新建公告
  UpdateInfo: '/api/Information/ModifyInformation', //修改公告
  DeleteInformation: '/api/Information/DeleteInformation', //删除公告
  GetAgencyTypeDdl: '/api/Dictionary/GetAgencyTypeDdl', //一级经销商类型
  GetInformationLogoDdl: '/api/Dictionary/GetInformationLogoDdl', //获取标识图标下拉框列表接口
  GetInformationSubjectColorDdl:
    '/api/Dictionary/GetInformationSubjectColorDdl', //获取标题颜色下拉框列表接口
  // bp&handler 获取二级商订单类型
  GetSubdOrderTypeDdl: '/api/OrderType/GetSubdOrderTypeDdl', // 获取二级商订单类型
  GetBtns: '/api/Privilege/GetUserPageBtnPrivilege',
  // 获取待办数量
  HandlerGetPendingOrderCount: '/api/order/HandlerGetPendingOrderCount', //handler的代办数量
  BPGetPendingOrderCount: '/api/order/BPGetPendingOrderCount', //bp的代办数量
  BPGetCount: '/api/order/BPGetCount', //bp的代办数量和草稿数量
  SubDGetDraftOrderCount: '/api/order/SubDGetDraftOrderCount', //subd我保存的草稿数量
  YQBPGetCount: '/api/InstrumentOrder/BPGetCount', //bp-仪器代办数量和草稿数量
  YQHandlerGetPendingOrderCount:
    '/api/InstrumentOrder/HandlerGetPendingOrderCount', //handler-仪器代办数量

  // handler-主数据
  // 外贸公司
  HandlerGetForeignTradeCompanyList:
    '/api/ForeignTradeCompany/HandlerGetForeignTradeCompanyList', //外贸公司管理列表
  DeleteForeignTradeCompany:
    '/api/ForeignTradeCompany/DeleteForeignTradeCompany', //删除接口
  // bp-仪器
  // 我保存的草稿
  YQBpGetDraftOrderList: '/api/InstrumentOrder/BpGetDraftOrderList', //我保存的草稿
  GetInstrumentDdl: '/api/InstrumentType/GetInstrumentDdl', //产品类别下拉框
  GetInstrumentOrderTypeDdl: '/api/OrderType/GetInstrumentOrderTypeDdl', //订单类型下拉框
  YQDeleteDraft: '/api/InstrumentOrder/DeleteDraft', //删除草稿
  YQBpGetSubmitOrderList: '/api/InstrumentOrder/BpGetSubmitOrderList', //仪器我发起的订单
  YQCancelOrder: '/api/InstrumentOrder/CancelOrder', //取消订单
  YQBpGetPendingOrderList: '/api/InstrumentOrder/BpGetPendingOrderList', //bp-待我处理的订单列表
  YQBpGetInstrumentList: '/api/Instrument/BpGetInstrumentList', //产品查询列表
  // handler-仪器
  // 待我处理的订单
  YQHanderlGetPendingOrderList:
    '/api/InstrumentOrder/HanderlGetPendingOrderList', //仪器-待我处理的订单列表
  GetInstrumentOrderTypeDdl: '/api/OrderType/GetInstrumentOrderTypeDdl', //订单类型
  GetInstrumentTypeDdl: '/api/InstrumentType/GetInstrumentTypeDdl', //产品类别
  GetInstrumentOrderStatusDdl: '/api/Dictionary/GetInstrumentOrderStatusDdl', //订单状态
  TerminateOrder: '/api/InstrumentOrder/TerminateOrder', //终止接口
  SuspendOrder: '/api/InstrumentOrder/SuspendOrder', //暂停接口
  YqHandlerGetSuspendOrderList:
    '/api/InstrumentOrder/HandlerGetSuspendOrderList', //暂停列表
  YqHandlerGetOnGoingOrderList:
    '/api/InstrumentOrder/HandlerGetOnGoingOrderList', //进行中的订单
  SendUrgeEmail: '/api/InstrumentOrder/SendUrgeEmail', //催收邮件
  YqHandlerGetCompletedOrderList:
    '/api/InstrumentOrder/HandlerGetCompletedOrderList', //已完成的订单
  SendStartUpReleaseEmail: '/api/InstrumentOrder/SendStartUpReleaseEmail', //启动包Release邮件发送
  SendOrderReleaseEmail: '/api/InstrumentOrder/SendOrderReleaseEmail', //订单Release邮件发送
  HandlerGetInstrumentList: '/api/Instrument/HandlerGetInstrumentList', //产品管理列表
  DeleteInstrument: '/api/Instrument/DeleteInstrument', //删除接口
  HandlerGetInstrumentInfo: '/api/Instrument/HandlerGetInstrumentInfo', //获取产品详情
  AddInstrument: '/api/Instrument/AddInstrument', //新建接口
  ModifyInstrument: '/api/Instrument/ModifyInstrument', //修改产品
  YQGetOrderInfo: '/api/InstrumentOrder/GetOrderInfo', //订单详情
  UploadStartupSO: '/api/InstrumentOrder/UploadStartupSO', //上传启动包SO
  YQConfirmPayment: '/api/InstrumentOrder/ConfirmPayment', //确认付款凭证
  YQConfirmDue: '/api/InstrumentOrder/ConfirmDue', //确认尾款凭证
  YQApproveOrder: '/api/InstrumentOrder/ApproveOrder', //受理订单
  GetDeliveryTypeDdl: '/api/Dictionary/GetDeliveryTypeDdl', //交货方式
  ModifySubRecord: '/api/InstrumentOrder/ModifySubRecord', //修改二级备案
  GetInstrumentBomByCondition: '/api/InstrumentBom/GetInstrumentBomByCondition', //BOM列表
  ImportBomList: '/api/InstrumentBom/ImportBomList', //导入BOM
  DeleteInstrumentBom: '/api/InstrumentBom/DeleteInstrumentBom', //删除BOM
  YQExportFinishExcel: '/api/InstrumentOrder/ExportFinishExcel', //导出已完成订单
  YQExportOnGoingExcel: '/api/InstrumentOrder/ExportOnGoingExcel', //导出进行中的订单
  YQExportSuspendExcel: '/api/InstrumentOrder/ExportSuspendExcel', //暂停中的订单
  YQExportPendingExcel: '/api/InstrumentOrder/ExportPendingExcel', //导出待我处理的订单
  YQExportExcel: '/api/InstrumentBom/ExportExcel', //导出BOM
  YQPROExportExcel: '/api/Instrument/ExportExcel', //产品管理导出
  HandlerGetForeignTradeCompanyInfo:
    '/api/ForeignTradeCompany/HandlerGetForeignTradeCompanyInfo', //外贸公司详情接口
  ModifyForeignTradeCompany:
    '/api/ForeignTradeCompany/ModifyForeignTradeCompany', //修改
  AddForeignTradeCompany: '/api/ForeignTradeCompany/AddForeignTradeCompany', //新建外贸公司
  TradeCompanyExportExcel: '/api/ForeignTradeCompany/ExportExcel', //外贸公司导出
  // bp-仪器
  // 我发起的订单
  YqBpGetSubmitOrderList: '/api/InstrumentOrder/BpGetSubmitOrderList', //我发起的订单列表
  YqCancelOrder: '/api/InstrumentOrder/CancelOrder', //取消接口
  GetInstrumentPaymentDdl: '/api/Dictionary/GetInstrumentPaymentDdl', //付款方式
  GetFTCompanyDdl: '/api/ForeignTradeCompany/GetFTCompanyDdl', //外贸公司中文名称
  BPYQGetInstrumentDdl: '/api/Instrument/GetInstrumentDdl', //产品模糊搜索
  AddSaleOrder: '/api/InstrumentOrder/AddSaleOrder', //发起销售订单
  AddRentOrder: '/api/InstrumentOrder/AddRentOrder', //发起租赁订单
  AddSaleDraft: '/api/InstrumentOrder/AddSaleDraft', //新建销售草稿
  AddRentDraft: '/api/InstrumentOrder/AddRentDraft', //建租赁草稿
  EditSaleOrder: '/api/InstrumentOrder/EditSaleOrder', //编辑销售订单/提交销售草稿
  EditRentOrder: '/api/InstrumentOrder/EditRentOrder', //编辑租赁订单/提交租赁草稿
  EditSaleDraft: '/api/InstrumentOrder/EditSaleDraft', //编辑销售草稿
  EditRentDraft: '/api/InstrumentOrder/EditRentDraft', //编辑租赁草稿
  YQUploadPaymentCert: '/api/InstrumentOrder/UploadPaymentCert', //上传付款凭证
  YQUploadDueCert: '/api/InstrumentOrder/UploadDueCert', //上传尾款凭证
  GetInstrumentPaymentWayDdl: '/api/Dictionary/GetInstrumentPaymentWayDdl', //获取付款途径
  GetOperaiontLogByCondition: '/api/LogOperation/GetOperaiontLogByCondition', //日志查询列表
  AcceptLicenseAgreement: '/api/ManagerUser/AcceptLicenseAgreement', //隐私协议
  GetAgencyRegionDdlForInnerUser:
    '/api/AgencyRegion/GetAgencyRegionDdlForInnerUser', //获取经销商区域
  ResendDataToContractSystem: '/api/InstrumentOrder/ResendDataToContractSystem', //重新发送数据给合同系统
  ImportInstrumentList: '/api/Instrument/ImportInstrumentList', //导入产品
  BpExportOrderExcel: '/api/Order/BpExportOrderExcel', //导出bp订单
  GetOrderProductByNoForEndUserTrack:
    '/api/Product/GetOrderProductByNoForEndUserTrack',
  HandlerGetOnGoingOrderCount: '/api/Order/HandlerGetOnGoingOrderCount', // Handler查询一级经销商进行中订单件数
  HandlerGetInstrumentOnGoingOrderCount:
    '/api/InstrumentOrder/HandlerGetOnGoingOrderCount', //Handler查询进行中订单件数
  GetRemindersList: '/api/Information/GetRemindersList', //智能提醒
  HandlerGetOrderRegionCount: '/api/Order/HandlerGetOrderRegionCount',
  GetHomeInstrumentTypeDdl: '/api/InstrumentType/GetHomeInstrumentTypeDdl', //仪器产品类别
  HandlerGetInsOrderRegionCount:
    '/api/InstrumentOrder/HandlerGetOrderRegionCount', //仪器地图
  ReadInformation: '/api/Information/ReadInformation',
  UploadConstractFile: '/api/InstrumentOrder/UploadConstractFile', //上传合同
  GetSealTypeDdl: '/api/Dictionary/GetSealTypeDdl', //盖章方式
  ImportForeignTradeCompany: '/api/ForeignTradeCompany/Import',
  ExportPtoProductExcel: '/api/PtoProduct/ExportExcel',
  GetDashboardProductCategoryDdl:
    '/api/ProductCategory/GetDashboardProductCategoryDdl',
};
