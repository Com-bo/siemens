import { useGet, usePost } from '.';
import Config from '../config';


// CustomerReport
export const CustomerReportQueryChartData = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.CustomerReportQueryChartData}`,
    data,
    {
      autoLoading: true,
    },
  );
};
export const CustomerReportQueryListData = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.CustomerReportQueryListData}`,
    data,
    {
      autoLoading: true,
    },
  );
};
export const CustomerReportExportListData = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.CustomerReportExportListData}`,
    data,
    {
      autoLoading: true,
      responseType: 'blob',
    },
  );
};
export const CustomerReportImportListData = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.CustomerReportImportListData}`,
    data,
    {
      autoLoading: true,
    },
  );
};

export const CustomerReportDeleteListData = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.CustomerReportDeleteListData}`,
    data,
    {
      autoLoading: true,
    },
  );
};
export const CustomerReportQueryBVIData = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.CustomerReportQueryBVIData}`,
      data,
    {
      autoLoading: true,
    },
  );
};
export const CustomerReportBuildReport = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.CustomerReportBuildReport}`,
    data,
    {
      autoLoading: true,
      responseType: 'blob',
    },
  );
};
export const CustomerReportQueryReportMonth = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.CustomerReportQueryReportMonth}`,
    data,
    {
      autoLoading: true
    },
  );
};
