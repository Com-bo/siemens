import { ObjectIteratee } from 'lodash';
import { useGet, usePost } from '.';
import Config from '../config';
export const getFlatChargeData = (data: Object) => {
    return usePost(`${Config.Api.Base}${Config.Api.HomePageQuery}`, data, {
        autoLoading: true,
    });
};
export const getFilterGroupData=(data)=>{
    return usePost(`${Config.Api.Base}${Config.Api.ListGroupQuery}`, data, {
        autoLoading: true,
    });
}

export const submitMulti = (data: Object) => {
    return usePost(`${Config.Api.Base}${Config.Api.ListDataSubmit}`, data, {
        autoLoading: true,
    });
};
export const deleteData = (data: Object) => {
    return usePost(`${Config.Api.Base}${Config.Api.DeleteData}`, data, {
        autoLoading: true,
    });
};
export const copyData = (data: Object) => {
    return usePost(`${Config.Api.Base}${Config.Api.CopyData}`, data, {
        autoLoading: true,
    });
};
export const logDataQuery = (data: Object) => {
    return usePost(`${Config.Api.Base}${Config.Api.LogDataQuery}`, data, {
        autoLoading: true,
    });
};

export const importFlatData = (data: Object) => {
    return usePost(`${Config.Api.Base}${Config.Api.ImportFlatData}`, data, {
        autoLoading: true,
    });
};

export const getProductData = (data: Object) => {
    return usePost(`${Config.Api.Base}${Config.Api.PopWinPagingQuery}`, data, {
        autoLoading: true,
    });
};
export const exportExcel = (data: Object, type?: string) => {
    let url = Config.Api.ExportDataByGroup
    if (type == "header") {
        url = Config.Api.ExportDataByHearder
    }
    return usePost(`${Config.Api.Base}${url}`, data, {
        autoLoading: true,
        responseType: 'blob',
    });
};