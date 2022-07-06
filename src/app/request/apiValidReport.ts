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

// Billing Data - Validation Report
export const BillingIntegrityDataQuery = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.BillingIntegrityDataQuery}`,
    data,
    {
      autoLoading: true,
    },
  );
};
export const BillingIntegrityDataExport = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.BillingIntegrityDataExport}`,
    data,
    {
      autoLoading: true,
      responseType: 'blob',
    },
  );
};
export const BillingDeferenceDataQuery = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BillingDeferenceDataQuery}`, data, {
    autoLoading: true,
  });
};

export const BillingDeferenceDataExport = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.BillingDeferenceDataExport}`, data, {
    autoLoading: true,
    responseType: 'blob',
  });
};
export const BillingDetalInPercentageConfigQuery = () => {
  return usePost(
    `${Config.Api.Base}${Config.Api.BillingDetalInPercentageConfigQuery}`,
    {},
    {
      autoLoading: true,
    },
  );
};
