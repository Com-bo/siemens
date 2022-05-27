import JWT from '@/tools/jwt';
import { useLocalStorageState, useMount } from 'ahooks';
import { IFuncUpdater } from 'ahooks/lib/createUseStorageState';
import axios from 'axios';
import React, { useEffect, useRef } from 'react';

interface BaseJWTConfig<H, P> {
  defaultToken?: string;
  jwtHeader?: string;
  onMount?: (context: BaseJWTContext<H, P>, isSetToken?: Boolean) => void;
  onSetToken?: (context: BaseJWTContext<H, P>) => void;
}

export interface BaseJWTContext<H, P> {
  token: string;
  setToken: (value?: string | IFuncUpdater<string>) => void;
  jwtRef: React.MutableRefObject<JWT<H, P>>;
  completed: boolean;
  interceptorMount: boolean;
}

/**
 * 基本权限验证服务
 */
export function useJWTService<Header = {}, Playload = {}>(
  config: BaseJWTConfig<Header, Playload>,
): BaseJWTContext<Header, Playload> {
  const {
    defaultToken = '',
    jwtHeader = 'Authorization',
    onMount,
    onSetToken,
  } = config;
  const [token, setToken] = useLocalStorageState('token', defaultToken);
  const interceptorIDRef = useRef<number>();
  const jwtRef = useRef<JWT<Header, Playload>>();
  jwtRef.current = token && new JWT<Header, Playload>(token);

  const result = {
    token,
    setToken,
    jwtRef,
    interceptorMount: interceptorIDRef.current !== undefined,
    completed: token && interceptorIDRef.current !== undefined,
  };
  /**  请求拦截，注入jwt*/
  useEffect(() => {
    // 卸载上次拦截
    interceptorIDRef.current !== undefined &&
      axios.interceptors.request.eject(interceptorIDRef.current);

    // 注入新jwt
    interceptorIDRef.current = axios.interceptors.request.use((config) => {
      // 全局注入token
      config.headers = {
        [jwtHeader]: jwtRef.current.toString(),
        ...config?.headers,
      };
      return config;
    });
  }, [token]);

  useMount(async () => {
    onMount?.(result);
  });

  useEffect(() => {
    onSetToken?.(result);
  }, [token]);

  return result;
}

export default useJWTService;
