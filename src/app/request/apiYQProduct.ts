import { useGet, usePost } from '.';
import Config from '../config';
export const getBtns = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetBtns}`, {
    autoLoading: true,
  });
};
// 产品管理-列表
export const handlerGetInstrumentList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.HandlerGetInstrumentList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 货品分类
export const getInstrumentTypeDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetInstrumentTypeDdl}`, {
    autoLoading: true,
  });
};
//   删除接口
export const deleteInstrument = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DeleteInstrument}`, data, {
    autoLoading: true,
  });
};
// 产品详情
export const handlerGetInstrumentInfo = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.HandlerGetInstrumentInfo}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 新建仪器
export const addInstrument = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.AddInstrument}`, data, {
    autoLoading: true,
  });
};
// 修改仪器
export const modifyInstrument = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ModifyInstrument}`, data, {
    autoLoading: true,
  });
};
// 产品查询
export const yQBpGetInstrumentList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.YQBpGetInstrumentList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// BOM列表
export const getInstrumentBomByCondition = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.GetInstrumentBomByCondition}`,
    data,
    {
      autoLoading: true,
    },
  );
};
// 导入BOM
export const importBomList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ImportBomList}`, data, {
    autoLoading: true,
  });
};
// 删除BOM
export const deleteInstrumentBom = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DeleteInstrumentBom}`, data, {
    autoLoading: true,
  });
};
// 导出bom
export const yQExportExcel = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.YQExportExcel}`, data, {
    autoLoading: true,
  });
};
// 产品管理导出
export const yQPROExportExcel = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.YQPROExportExcel}`, data, {
    autoLoading: true,
  });
};
// 导入产品接口
export const importInstrumentList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ImportInstrumentList}`, data, {
    autoLoading: true,
  });
};
