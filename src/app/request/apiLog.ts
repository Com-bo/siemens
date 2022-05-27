import { useGet, usePost } from '.';
import Config from '../config';
export const getBtns = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetBtns}`, {
    autoLoading: true,
  });
};
export const getUserTypeDdl = () => {
  return useGet(`${Config.Api.Base}${Config.Api.GetUserTypeDdl}`);
};
//   日志列表
export const getOperaiontLogByCondition = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.GetOperaiontLogByCondition}`,
    data,
    {
      autoLoading: true,
    },
  );
};
