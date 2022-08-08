export const Api = {
  // 通用
  CreateToken: '/api/System/CreateToken', //临时使用jwt认证
  GetMyIdLoginInfo: '/api/MyID/GetMyIdLoginInfo', //获取Myid登录信息
  GetMyIdUserInfo: '/api/MyID/GetMyIdUserInfo', //获取用户信息
  QueryLoginUser: '/api/System/QueryLoginUser', // 获取用户信息
  CostCenterDrop: '/api/CostCenterIcb/QueryPageDropListData', //获取cost center下拉框
  CompanyCodeDrop: '/api/DivMappingOc/QueryPageDropListData', //获取companyCode
  GetFilterGroupFieldList: '/api/FilterGroup/QueryConfigureFieldList', //获取Filter Group Field
  QueryFilterGroupList: '/api/FilterGroup/QueryFilterGroupList', //数据查询 - 获取用户FilterGroup列表
  QueryFilterGroupListWithFields:
    '/api/FilterGroup/QueryFilterGroupListWithFields', //获取filter group全数据
  SaveFilterGroupData: '/api/FilterGroup/SaveFilterGroupData', //数据保存 - 保存用户FilterGroup数据
  DeleteFilterGroupData: '/api/FilterGroup/DeleteFilterGroupData', //删除Filter Group
  GetServiceLineList: '/api/BusinessLine/QueryServicelineOptionsList', //Service Line Options列表数据
  GetCustemerDivisionList:
    '/api/OtherMasterData/QueryCustemerDivisionOptionsList',
  QueryBusinesslineOptionsList:
    '/api/BusinessLine/QueryBusinesslineOptionsList', //数据查询 - 【Business Line】页面Options列表数据【Label : Name / Value : Name】
  QueryDictionaryInfo: '/api/System/QueryDictionaryInfo', //数据字典
  ProductPoDrop: '/api/ProductPo/QueryPageDropListData', //Product下拉
  // other data
  OtherMasterDataQueryAREOCOptionsList:
    '/api/OtherMasterData/QueryAREOCOptionsList',
  OtherMasterDataQueryCustemerDivisionSLCOptionsList:
    '/api/OtherMasterData/QueryCustemerDivisionSLCOptionsList',

  // BVI
  ImportDataSave: '/api/ImportR2R/ImportDataSave', //导入R2r
  ImportManualDataSave: '/api/ImportManual/ImportDataSave', //导入ImportManual
  ImportH2RTE: '/api/ImportH2RTE/ImportDataSave', //导入ImportH2RTE
  GetUserOperateTemplate: '/api/System/GetUserOperateTemplate', //根据用户获取模板

  ImportH2R: '/api/ImportH2R/ImportDataSave', //导入ImportH2R
  ImportH2RGMM: '/api/ImportH2RGMM/ImportDataSave', //导入ImportH2RGMM
  ImportO2C: '/api/ImportO2C/ImportDataSave', //导入ImportO2C
  ImportO2CTI: '/api/ImportO2CTI/ImportDataSave', //导入ImportO2CTI
  SyncDataSave: '/api/ImportP2PBCS/SyncDataSave', //

  GetAbnormalOriginDataByBVI: '/api/BVIDataManage/GetOriginDataByBVI',
  ExportOriginalData: '/api/BVIDataManage/ExportOriginalData',
  BviGroupQuery: '/api/BVIDataManage/ListGroupQuery', //数据查询group
  BivCopyDta: '/api/BVIDataManage/CopyData', //copy功能
  ExportBVIData: '/api/BVIDataManage/ExportBVIData', //导出BVI
  UnConfirmData: '/api/BVIDataManage/UnConfirmData', //UnConfirm数据
  ConfirmData: '/api/BVIDataManage/ConfirmData', //Confirm数据
  DeleteBVIData: '/api/BVIDataManage/DeleteData', //删除bvi
  InsertBVIData: '/api/BVIDataManage/InsertData', //添加数据
  EditBVIData: '/api/BVIDataManage/EditData', //编辑数据
  EditDataListSave: '/api/BVIDataManage/EditDataListSave', //批量编辑数据
  ReCheckDataBVIData: '/api/BVIDataManage/ReCheckData',

  QueryImportLog: '/api/BVIDataManage/QueryImportLog', //查询日志
  // Flat Charge
  HomePageQuery: '/api/FlatCharge/ListDataQuery', //数据查询
  ListDataSubmit: '/api/FlatCharge/ListDataSubmit', //批量提交
  DeleteData: '/api/FlatCharge/DeleteData', //删除数据
  CopyData: '/api/FlatCharge/CopyData', //拷贝
  LogDataQuery: '/api/FlatCharge/LogDataQuery', //日志查询
  ImportFlatData: '/api/FlatCharge/ImportData', //导入
  PopWinPagingQuery: '/api/Product/PopWinPagingQuery', //获取产品
  ExportDataByGroup: '/api/FlatCharge/ExportData', //导出group
  QueryBVIData: '/api/FlatCharge/QueryBVIData', //导出bvi拆分
  EditDataSave: '/api/FlatCharge/EditDataSave', //保存flat数据
  EditDataSubmit: '/api/FlatCharge/EditDataSubmit', //提交flat数据
  // BVI-validation report
  IntegrityDataQuery: '/api/BVIValidateReport/IntegrityDataQuery', //数据查询 - Integrity Report
  IntegrityDataExport: '/api/BVIValidateReport/IntegrityDataExport', //数据导出 - Integrity Report、
  DeferenceDataQuery: '/api/BVIValidateReport/DeferenceDataQuery', //数据查询 - Deference Report
  DeferenceDataExport: '/api/BVIValidateReport/DeferenceDataExport', //数据导出
  DetalInPercentageConfigQuery:
    '/api/BVIValidateReport/DetalInPercentageConfigQuery', //获取delta颜色配置
  // billing data
  ImportVF05: '/api/Billing/ImportVF05',
  ImportTEXTDISP: '/api/Billing/ImportTEXTDISP',
  ImportUIPathResult: '/api/Billing/ImportUIPathResult',

  ExportBillingData: '/api/Billing/ExportBillingData',
  FreezeData: '/api/Billing/FreezeData',
  QueryData: '/api/Billing/QueryData',
  QuickEditDataSave: '/api/Billing/QuickEditDataSave',
  EditDataSaveBill: '/api/Billing/EditDataSave',
  EditDataSpecialSave: '/api/Billing/EditDataSpecialSave',

  SetStatusSave: '/api/Billing/SetStatusSave',
  BatchFileManual: '/api/Billing/BatchFileManual',
  BatchFileAuto: '/api/Billing/BatchFileAuto',
  AllocationFile: '/api/Billing/AllocationFile',
  GetOriginBVI: '/api/Billing/GetOriginBVI',
  // masterData-costcenter
  GetCostCenterData: '/api/CostCenterIcb/QueryListData',
  ExportCostCenterData: '/api/CostCenterIcb/ExportData', //导出costcenter
  ImportCostCenterData: '/api/CostCenterIcb/ImportData', //导入数据
  DeleteCostCenterData: '/api/CostCenterIcb/DeleteData',
  LogCostCenterDataQuery: '/api/CostCenterIcb/QueryLogData',
  EditCostCenterDataSave: '/api/CostCenterIcb/EditDataSave', //保存数据
  // masterData-product
  QueryProductListData: '/api/Product/QueryListData',
  ImportProductData: '/api/Product/ImportData', //导入产品
  ExportProductData: '/api/Product/ExportData', //导出产品
  QueryProductLogData: '/api/Product/QueryLogData', //查询产品日志
  DeleteProductData: '/api/Product/DeleteData', //删除product数据
  DeletePOData: '/api/ProductPo/DeleteData', //删除po数据
  EditProductDataSave: '/api/Product/EditDataSave', //保存product接口
  BatchEditProductDataSave: '/api/Product/BatchEditDataSave', 

  // masterdata
  CurrencyImportData: '/api/Currency/ImportData',
  CurrencyQueryListData: '/api/Currency/QueryListData',
  CurrencyEditDataSave: '/api/Currency/EditDataSave',
  CurrencyDeleteData: '/api/Currency/DeleteData',
  CurrencyExportData: '/api/Currency/ExportData',

  DivisionMappingICBImportData: '/api/DivisionMappingICB/ImportData',
  DivisionMappingICBQueryListData: '/api/DivisionMappingICB/QueryListData',
  DivisionMappingICBEditDataSave: '/api/DivisionMappingICB/EditDataSave',
  DivisionMappingICBDeleteData: '/api/DivisionMappingICB/DeleteData',
  DivisionMappingICBExportData: '/api/DivisionMappingICB/ExportData',

  DivMappingOcQueryPageDropListData: '/api/DivMappingOc/QueryPageDropListData',
  DivMappingOcImportData: '/api/DivMappingOc/ImportData',
  DivMappingOcQueryListData: '/api/DivMappingOc/QueryListData',
  DivMappingOcEditDataSave: '/api/DivMappingOc/EditDataSave',
  DivMappingOcDeleteData: '/api/DivMappingOc/DeleteData',
  DivMappingOcExportData: '/api/DivMappingOc/ExportData',

  SpecialDivisionImportData: '/api/SpecialDivision/ImportData',
  SpecialDivisionQueryListData: '/api/SpecialDivision/QueryListData',
  SpecialDivisionEditDataSave: '/api/SpecialDivision/EditDataSave',
  SpecialDivisionDeleteData: '/api/SpecialDivision/DeleteData',
  SpecialDivisionExportData: '/api/SpecialDivision/ExportData',

  BusinessLineQueryListData: '/api/BusinessLine/QueryListData',
  BusinessLineExportData: '/api/BusinessLine/ExportData',
  BusinessLineEditDataSave: '/api/BusinessLine/EditDataSave',
  BusinessLineDeleteData: '/api/BusinessLine/DeleteData',
  BusinessLineQueryLogData: '/api/BusinessLine/QueryLogData',

  ICBCustomerInfoQueryListData: '/api/ICBCustomerInfo/QueryListData',
  ICBCustomerInfoExportData: '/api/ICBCustomerInfo/ExportData',
  ICBCustomerInfoEditDataSave: '/api/ICBCustomerInfo/EditDataSave',
  ICBCustomerInfoDeleteData: '/api/ICBCustomerInfo/DeleteData',
  ICBCustomerInfoQueryLogData: '/api/ICBCustomerInfo/QueryLogData',

  ServiceLineBasicQueryListData: '/api/ServiceLineBasic/QueryListData',
  ServiceLineBasicExportData: '/api/ServiceLineBasic/ExportData',
  ServiceLineBasicEditDataSave: '/api/ServiceLineBasic/EditDataSave',
  ServiceLineBasicDeleteData: '/api/ServiceLineBasic/DeleteData',
  ServiceLineBasicQueryLogData: '/api/ServiceLineBasic/QueryLogData',

  // Billing-validation report
  BillingIntegrityDataQuery: '/api/BillingValidateReport/IntegrityDataQuery', //数据查询 - Integrity Report
  BillingIntegrityDataExport: '/api/BillingValidateReport/IntegrityDataExport', //数据导出 - Integrity Report、
  BillingDeferenceDataQuery: '/api/BillingValidateReport/DeferenceDataQuery',
  BillingDetalInPercentageConfigQuery:
    '/api/BillingValidateReport/DetalInPercentageConfigQuery',
  BillingDeferenceDataExport: '/api/BillingValidateReport/DeferenceDataExport',
  // 系统设置
  InsertRole: '/api/System/InsertRole', //新建角色
  ModifyRole: '/api/System/ModifyRole', //编辑角色
  QueryRoleMapUsers: '/api/System/QueryRoleMapUsers', // 角色管理-人员维护已选列表
  RoleBingUser: '/api/System/RoleBingUser', // 角色管理-角色绑定人员
  QueryRoleMapAuthTrees: '/api/System/QueryRoleMapAuthTrees', // 角色管理-功能授权树
  RoleBingAuth: '/api/System/RoleBingAuth', // 角色管理-功能授权
  QueryRolePageInfo: '/api/System/QueryRolePageInfo', // 角色管理-列表
  QueryUserPageInfo: '/api/System/QueryUserPageInfo', //用户列表
  InsertUserInfo: '/api/System/InsertUserInfo', //新增用户
  ModifyUserInfo: '/api/System/ModifyUserInfo', //编辑用户
  RoleBingUser: '/api/System/RoleBingUser', // 角色管理-角色绑定人员
  DelRole: '/api/System/DelRole', //删除角色
  DeleUser: '/api/System/DeleUser',
  // H2R config
  QueryLogicH2R:"/api/System/QueryLogicH2R",
  EditLogicH2R:"/api/System/EditLogicH2R",
  DeleteLogicH2R:"/api/System/DeleteLogicH2R",
  AddLogicH2R:"/api/System/AddLogicH2R",
  // masterdata-O2CUserID
  QueryO2CUserIDListData: '/api/O2CUserID/QueryListData',
  ExportO2CUserIDData: '/api/O2CUserID/ExportData',
  EditO2CUserIDDataSave: '/api/O2CUserID/EditDataSave',
  DeleteO2CUserIDData: '/api/O2CUserID/DeleteData',
  QueryO2CUserIDLogData: '/api/O2CUserID/QueryLogData',

  // CustomerReport
  CustomerReportQueryChartData: '/api/CustomerReport/QueryChartData',
  CustomerReportQueryListData: '/api/CustomerReport/QueryListData',
  CustomerReportExportListData: '/api/CustomerReport/ExportListData',
  CustomerReportImportListData: '/api/CustomerReport/ImportListData',
  CustomerReportDeleteListData: '/api/CustomerReport/DeleteListData',
  CustomerReportQueryBVIData: '/api/CustomerReport/QueryBVIData',
  CustomerReportBuildReport: '/api/CustomerReport/BuildReport',
  CustomerReportQueryReportMonth: '/api/CustomerReport/QueryReportMonth',

  // Home
  HomeQueryData: '/api/Home/QueryData',
};
