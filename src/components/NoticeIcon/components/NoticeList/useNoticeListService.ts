import React, { useContext, useState } from 'react';
import { INoticeData } from '../../typings';
import { EnumConditionalType, usePost, Response } from '@/app/request';
import { NoticeIconService } from '../../useNoticeIconService';
import useLoadMoreRequest from '@/app/useLoadMoreRequest';
import { Api } from '../../api';
import { useRequest } from 'ahooks';
import { INoticeListProps } from './';

/** 注入上下文服务 */
export const NoticeListService =
  React.createContext<INoticeListService>(undefined);
export type INoticeListService = ReturnType<typeof useNoticeListService>;

export default function useNoticeListService(props: INoticeListProps) {
  const { baseApi, getCount } = useContext(NoticeIconService);
  const [read, setRead] = useState<String[]>([]); // 已读数据
  const {
    paramRef,
    data,
    loadingMore,
    loading,
    noMore,
    reload,
    loadMore,
    error,
    containerRef,
  } = useLoadMoreRequest<INoticeData>(
    () => {
      return {
        url: `${baseApi}${Api.NoticePageList}`,
      };
    },
    {
      defalutParams: () => ({
        pageIndex: 1,
        pageSize: props.pageSize ?? 5,
        orderField: 'Created',
        orderType: 'desc',
        conditions: [
          {
            fieldName: 'category',
            fieldValue: props.tabKey,
            conditionalType: EnumConditionalType.Equal,
          },
          // 消息列表永远请求未读数据
          {
            fieldName: '[Read]',
            fieldValue: '0',
            conditionalType: EnumConditionalType.IsNullOrEmpty,
          },
        ],
      }),
      onDepsChange: () => {},
      formatResult: (res) => {
        return {
          totalCount: res.totalCount,
          list: res.data,
        };
      },
    },
  );

  // 全部已读
  const { loading: readAllLoading, run: readAllFunc } = useRequest(
    {
      url: `${baseApi}${Api.NoticeChangeStatus}`,
      method: 'post',
      data: {
        ids: ['all'],
        status: 'true',
      },
    },
    {
      manual: true,
      onSuccess: () => {
        // 刷新列表
        reload();
        // 更新未读数量
        getCount();
      },
    },
  );
  props.reloadRef.current[props.tabKey] = reload;

  return {
    paramRef,
    data,
    loadingMore,
    loading,
    noMore,
    reload,
    loadMore,
    error,
    containerRef,
    readAllLoading,
    readAllFunc,
    read,
    setRead,
  };
}
