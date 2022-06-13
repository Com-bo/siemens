import { useGet, usePost } from '.';
import Config from '../config';
export const getCostCenterDrop = (data: Object) => {
    return usePost(`${Config.Api.Base}${Config.Api.CostCenterDrop}`, data);
};
export const getCompanyCodeDrop = (data: Object) => {
    return usePost(`${Config.Api.Base}${Config.Api.CompanyCodeDrop}`, data);
};

export const getFilterGroupFieldList = (data: Object) => {
    return usePost(`${Config.Api.Base}${Config.Api.GetFilterGroupFieldList}`,data, {
        autoLoading: true,
    });
};
