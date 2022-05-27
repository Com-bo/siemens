import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useRequest } from 'ahooks';
import { QueryParams, RequestOption, Response } from './request';

export interface LoadingMoreFormatReturn<T> {
  list: T[];
  totalCount: number;
}

interface LoadMoreServiceProps<T> {
  formatResult?: (data: Response<T[]>) => LoadingMoreFormatReturn<T>;
  defalutParams?: () => QueryParams;
  isNoMore?: (d: LoadingMoreFormatReturn<T>) => boolean;
  deps?: any[];
  onDepsChange?: () => void;
}
export declare type LoadMoreParams<R> = [R | undefined, ...any[]];
export function useLoadMoreRequest<T>(
  request: () => RequestOption,
  options: LoadMoreServiceProps<T>,
) {
  const {
    defalutParams,
    formatResult,
    isNoMore,
    deps = [],
    onDepsChange,
  } = options;
  const paramRef = useRef<QueryParams>(defalutParams?.());
  const [refreshDeps, setRefreshDeps] = useState(deps);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    onDepsChange?.();
  }, [refreshDeps]);

  const { data, loadingMore, loading, noMore, reload, loadMore, error } =
    useRequest<LoadingMoreFormatReturn<T>, Response<T[]>>(
      () => {
        let req: RequestOption = {
          method: 'post',
          headers: {
            'content-type': 'application/json',
          },
          data: paramRef.current,
          ...request(),
        };
        return req;
      },
      {
        refreshDeps: refreshDeps,
        loadMore: true,
        isNoMore: isNoMore
          ? isNoMore
          : (d) => (d ? d.list.length >= d.totalCount : false),
        formatResult: formatResult,
        ref: containerRef,
        onSuccess: (data, params) => {
          paramRef.current.pageIndex += 1;
        },
      },
    );
  return {
    setRefreshDeps,
    paramRef,
    data,
    loadingMore,
    loading,
    noMore,
    reload: () => {
      paramRef.current.pageIndex = 1;
      return reload();
    },
    loadMore,
    error,
    containerRef,
    refreshDeps,
  };
}
export default useLoadMoreRequest;
