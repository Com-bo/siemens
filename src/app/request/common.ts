import { useGet, usePost } from '.';
import Config from '../config';
export const getCostCenterDrop = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.CostCenterDrop}`, data);
};
export const getCompanyCodeDrop = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.CompanyCodeDrop}`, data);
};

export const getFilterGroupFieldList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.GetFilterGroupFieldList}`,
    data,
    {
      autoLoading: true,
    },
  );
};
export const queryFilterGroupList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.QueryFilterGroupList}`, data, {
    autoLoading: true,
  });
};
export const saveFilterGroupData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.SaveFilterGroupData}`, data, {
    autoLoading: true,
  });
};
export const deleteFilterGroupData = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.DeleteFilterGroupData}`,
    data,
    {
      autoLoading: true,
    },
  );
};
export const queryFilterGroupListWithFields = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.QueryFilterGroupListWithFields}`,
    data,
    {
      autoLoading: true,
    },
  );
};
export const getServiceLineList = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.GetServiceLineList}`, data);
};
export const getCustemerDivisionList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.GetCustemerDivisionList}`,
    data,
  );
};
export const ProductPoDrop = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.ProductPoDrop}`, data);
};

export const queryBusinesslineOptionsList = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.QueryBusinesslineOptionsList}`,
    data,
  );
};

export const queryDictionaryInfo = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.QueryDictionaryInfo}`, data);
};
