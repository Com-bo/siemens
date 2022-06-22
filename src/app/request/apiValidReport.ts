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
  return Promise.resolve({
    data: [
      {
        orgId: '4090820a-9ea7-407d-941d-31ffb4228316',
        businessLine: 'XXXX',
        serviceLine: null,
        are: 'XXX',
        customerDivision: 'XXX',
        productName: '!@#',
        202109: 12,
        delta: '111',
      },
    ],
    pageSize: 0,
    pageIndex: 0,
    totalCount: 13,
    totalPage: 0,
    code: 200,
    isSuccess: true,
    msg: '',
  });
};
