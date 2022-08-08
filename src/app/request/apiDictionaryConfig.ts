import { useGet, usePost } from '.';
import Config from '../config';
export const PageQueryDictionary = (data: Object) => {
  return usePost(`${Config.Api.Base}${Config.Api.PageQueryDictionary}`,data,
  {
    autoLoading: true,
  });
};
export const EditDictionary = (data: Object) => {
  return usePost(
    `${Config.Api.Base}${Config.Api.EditDictionary}`,
    data,
    {
      autoLoading: true,
    },
  );
};
