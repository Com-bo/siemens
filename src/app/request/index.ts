import Loading from '@/components/Loading';
import format from '@/tools/format';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Mgr from '@/services/SecurityService';

export enum EnumConditionalType {
  Equal = 0,
  Like = 1,
  GreaterThan = 2,
  GreaterThanOrEqual = 3,
  LessThan = 4,
  LessThanOrEqual = 5,
  In = 6,
  NotIn = 7,
  LikeLeft = 8,
  LikeRight = 9,
  NoEqual = 10,
  IsNullOrEmpty = 11,
  IsNot = 12,
  NoLike = 13,
  EqualNull = 14,
}
let Mgrs;
if (process.env.LOGIN_IDENTITY !== 'PE') {
  Mgrs = new Mgr();
  Mgrs.getUser().then((res) => {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + res.access_token;
  });
}

/**
 * 后端返参类型
 */
export interface Response<T> {
  pageSize?: number;
  pageIndex?: number;
  totalCount?: number;
  isSuccess: boolean;
  // success: boolean;
  msg?: string;
  data?: T;
  code?: number;
}

/**
 * 请求响应类型，基于后端返参扩展
 */
export type UseAxiosResponse<T> = Response<T> & {
  /**
   * http状态码
   */
  status?: number;
  /**
   * 原始response
   */
  response?: AxiosResponse<Response<T>>;
};

export interface Condition {
  fieldName: string;
  fieldValue: string;
  conditionalType: EnumConditionalType;
}

export interface QueryParams {
  orderField?: string;
  orderType?: 'asc' | 'desc';
  conditions?: Condition[];
  pageIndex?: number;
  pageSize?: number;
}

export interface RequestOption {
  url: string;
  method?: string;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  responseType?: string;
}

export interface UseAxiosRequestConfig extends AxiosRequestConfig {
  autoLoading?: boolean;
}

const requestWrapper = async <T = any>(
  config: UseAxiosRequestConfig,
  request: () => Promise<AxiosResponse<Response<T>>>,
): Promise<UseAxiosResponse<T>> => {
  let msg = '';
  let response: AxiosResponse<Response<T>>;
  const { autoLoading = false } = config ?? {};
  if (autoLoading) {
    Loading.show();
  }
  try {
    response = await request();
    return { ...response.data, response };
  } catch (e) {
    console.log(e?.response);
    //console.log(e?.toString?.(), e);
    if (e?.response?.status == '403') {
      window.location.href = sessionStorage.getItem('myUrl');
      return;
    }
    msg = e?.response?.data?.msg ?? 'System error';
    response = e?.response;
  } finally {
    if (autoLoading) {
      Loading.hide();
    }
  }
  return {
    isSuccess: false,
    msg,
    status: response?.status,
    response,
  };
};

export const useGet = <T = any>(url, config?: UseAxiosRequestConfig) =>
  requestWrapper(config, async () => {
    if (process.env.LOGIN_IDENTITY !== 'PE') {
      await Mgrs.getUser().then((res) => {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + res.access_token;
      });
    }
    return axios.get<Response<T>>(url, config);
  });

export const usePost = <T = any>(
  url: string,
  data?,
  config?: UseAxiosRequestConfig,
  formatParams?: {
    ignoreKeyList?: Array<string>;
  },
) =>
  requestWrapper(config, async () => {
    if (process.env.LOGIN_IDENTITY !== 'PE') {
      await Mgrs.getUser().then((res) => {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + res.access_token;
      });
    }
    return axios.post<Response<T>>(
      url,
      formatParams
        ? format.toBigCamelCase(data, formatParams?.ignoreKeyList)
        : data,
      config,
    );
  });

export const usePut = <T = any>(
  url: string,
  data?,
  config?: UseAxiosRequestConfig,
  formatParams?: {
    notUseParamsToTitleCase?: boolean;
    ignoreKeyList?: Array<string>;
  },
) =>
  requestWrapper(config, async () => {
    if (process.env.LOGIN_IDENTITY !== 'PE') {
      await Mgrs.getUser().then((res) => {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + res.access_token;
      });
    }
    return axios.put<Response<T>>(
      url,
      formatParams
        ? format.toBigCamelCase(data, formatParams?.ignoreKeyList)
        : data,
      config,
    );
  });

export const useDelete = <T = any>(
  url: string,
  config?: UseAxiosRequestConfig,
) => requestWrapper(config, () => axios.delete<Response<T>>(url, config));

export const useExport = <T = any>(
  url: string,
  data?,
  config?: UseAxiosRequestConfig,
  formatParams?: {
    ignoreKeyList?: Array<string>;
  },
) =>
  requestWrapper(config, async () => {
    if (process.env.LOGIN_IDENTITY !== 'PE') {
      await Mgrs.getUser().then((res) => {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + res.access_token;
      });
    }
    return axios.post<any>(
      url,
      formatParams
        ? format.toBigCamelCase(data, formatParams?.ignoreKeyList)
        : data,
      config,
    );
  });

export function formatConditionService() {
  const formatCondition = (
    fieldName,
    fieldValue,
    conditionalType?: EnumConditionalType,
  ) => {
    // FieldValue为0或非空字符串或Boolean类型时不过滤数据
    return fieldValue === 0 || typeof fieldValue === 'boolean' || !!fieldValue
      ? {
          fieldName,
          fieldValue: String(fieldValue),
          conditionalType: conditionalType ?? EnumConditionalType.Equal,
        }
      : null;
  };

  return { formatCondition };
}
