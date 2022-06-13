export const Api = {
  // 通用
  QueryLoginUser: '/api/System/QueryLoginUser', // 获取用户信息
  CostCenterDrop: '/api/CostCenterIcb/QueryPageDropListData',//获取cost center下拉框
  CompanyCodeDrop: '/api/DivMappingOc/QueryPageDropListData',//获取companyCode
  GetFilterGroupFieldList:'/api/ConfigureQueryField/QueryPageDropListData',//获取Filter Group Field
  // BVI
  ImportDataSave: '/api/ImportR2R/ImportDataSave',//导入R2r
  ImportManualDataSave: '/api/ImportManual/ImportDataSave',//导入ImportManual
  ImportH2RTE: '/api/ImportH2RTE/ImportDataSave',//导入ImportH2RTE
  // Flat Charge 
  HomePageQuery: '/api/FlatCharge/ListHeaderQuery',//数据查询
  ListGroupQuery: '/api/FlatCharge/ListGroupQuery',//group数据查询
  ListDataSubmit: '/api/FlatCharge/ListDataSubmit',//批量提交
  DeleteData: '/api/FlatCharge/DeleteData',//删除数据
  CopyData: '/api/FlatCharge/CopyData',//拷贝
  LogDataQuery: '/api/FlatCharge/LogDataQuery',//日志查询
  ImportFlatData: '/api/FlatCharge/ImportData',//导入
  PopWinPagingQuery: '/api/Product/PopWinPagingQuery',//获取产品
  ExportDataByGroup: '/api/FlatCharge/ExportDataByGroup',//导出group
  ExportDataByHearder: '/api/FlatCharge/ExportDataByHearder',//导出
  QueryBVIData: '/api/FlatCharge/QueryBVIData',//导出bvi拆分
  EditDataSave: '/api/FlatCharge/EditDataSave',//保存flat数据
  EditDataSubmit: '/api/FlatCharge/EditDataSubmit',//提交flat数据



};
