import { ObjectIteratee } from 'lodash';
import { useGet, usePost } from '.';
import Config from '../config';
export const getFlatChargeData = (data: Object) => {
    return usePost(`${Config.Api.Base}${Config.Api.HomePageQuery}`, data, {
        autoLoading: true,
    });
};

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