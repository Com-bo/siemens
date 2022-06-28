export const Api = {
  // 通用
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

  ProductPoDrop: '/api/ProductPo/QueryPageDropListData', //Product下拉
  // BVI
  ImportDataSave: '/api/ImportR2R/ImportDataSave', //导入R2r
  ImportManualDataSave: '/api/ImportManual/ImportDataSave', //导入ImportManual
  ImportH2RTE: '/api/ImportH2RTE/ImportDataSave', //导入ImportH2RTE

  ImportH2R: '/api/ImportH2R/ImportDataSave', //导入ImportH2R
  ImportH2RGMM: '/api/ImportH2RGMM/ImportDataSave', //导入ImportH2RGMM
  ImportO2C: '/api/ImportO2C/ImportDataSave', //导入ImportO2C
  ImportO2CTI: '/api/ImportO2CTI/ImportDataSave', //导入ImportO2CTI
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
  EditDataSave: '/api/Billing/EditDataSave',
  EditDataSpecialSave: '/api/Billing/EditDataSpecialSave',

  SetStatusSave: '/api/Billing/SetStatusSave',
  BatchFileManual: '/api/Billing/BatchFileManual',
  BatchFileAuto: '/api/Billing/BatchFileAuto',
  AllocationFile: '/api/Billing/AllocationFile', // masterData-costcenter
  GetCostCenterData: '/api/CostCenterIcb/QueryListData',
  ExportCostCenterData: '/api/CostCenterIcb/ExportData', //导出costcenter
  ImportCostCenterData: '/api/CostCenterIcb/ImportData', //导入数据
  DeleteCostCenterData: '/api/CostCenterIcb/DeleteData',
  LogCostCenterDataQuery: '/api/CostCenterIcb/QueryLogData',
  EditCostCenterDataSave: '/api/CostCenterIcb/EditDataSave', //保存数据
};
