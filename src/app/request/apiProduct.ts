import { useGet, usePost } from '.';
import Config from '../config';
export const queryProductListData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.QueryProductListData}`, data, {
    autoLoading: true,
  });
};
// 导入产品
export const importProductData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ImportProductData}`, data, {
    autoLoading: true,
  });
};

export const exportProductData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ExportProductData}`, data, {
    autoLoading: true,
    responseType: 'blob',
  });
};
// 查询产品日志
export const queryProductLogData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.QueryProductLogData}`, data, {
    autoLoading: true,
  });
};
// 删除产品
export const deleteProductData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DeleteProductData}`, data, {
    autoLoading: true,
  });
};

export const deletePOData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DeletePOData}`, data, {
    autoLoading: true,
  });
};
// 保存产品
export const editProductDataSave = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.EditProductDataSave}`, data, {
    autoLoading: true,
  });
};
export const BatchEditProductDataSave = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BatchEditProductDataSave}`, data, {
    autoLoading: true,
  });
};
