import { useGet, usePost } from '.';
import Config from '../config';
export const getIntergrityReportData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.IntegrityDataQuery}`, data, {
    autoLoading: true,
  });
};
export const exportIntergrityReport = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.IntegrityDataExport}`, data, {
    autoLoading: true,
    responseType: 'blob',
  });
};
export const getDiffData = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DeferenceDataQuery}`, data, {
    autoLoading: true,
  });
};

export const deferenceDataExport = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.DeferenceDataExport}`, data, {
    autoLoading: true,
    responseType: 'blob',
  });
};
export const detalInPercentageConfigQuery = () => {
  return usePost(
    `${Config.Api.Base}${Config.Api.DetalInPercentageConfigQuery}`,
    {},
    {
      autoLoading: true,
    },
  );
};
