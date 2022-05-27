import React, { useState, useEffect } from 'react';

// TODO: Typescript 定义

export function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return (arg: any) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args: any) => a(b(...args)));
}

interface IParams {
  filters: Function[];
  initialPayload?: any;
}
const useFilterChainAsync = (params: IParams) => {
  // TODO: 增加Loading指示
  const [result, setResult] = useState<any>(void 0);
  const { filters, initialPayload } = params;
  const funcs = filters.map((filter) => (next: any) => async (payload: any) => {
    return await filter(payload, next);
  });
  // TODO: 尾部真实dispatch实现
  const doAuthenticate = compose(...funcs)((xxxx) => {});

  // TODO: 依赖优化
  useEffect(() => {
    doAuthenticate(initialPayload)?.then((res) => {
      setResult(res);
    });
  }, []);
  return {
    result,
  };
};

export default useFilterChainAsync;
