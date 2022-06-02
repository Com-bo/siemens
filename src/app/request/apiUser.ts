import { useGet, usePost } from '.';
import Config from '../config';
export const getLoginUser = () => {
    return useGet(`${Config.Api.Base}${Config.Api.QueryLoginUser}`, {
        autoLoading: true,
    });
};