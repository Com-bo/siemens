import { useState } from 'react';
import Api from './api';
import { usePost, Response, EnumConditionalType, useGet } from '@/app/request';
import { useRequest } from 'ahooks';
import { INoticeIconProps, INoticeData, INoticeListProps } from './typings';
import React from 'react';
import { notification } from 'antd';

export type INoticeCount = Record<string, number>;

export const NoticeIconService =
  React.createContext<INoticeIconService>(undefined);

export type INoticeIconService = ReturnType<typeof useNoticeIconService> & {
  DefaultEmptyDom: React.ReactNode;
};
export type INoticeIconServiceProps = {
  taskTabProps: INoticeListProps;
  otherTabProps: INoticeListProps;
} & INoticeIconProps;
export default function useNoticeIconService(props: INoticeIconServiceProps) {
  const { taskTabProps, otherTabProps } = props;
  const [overlayKey, setOverlayKey] = useState(Math.random());

  const lists = props?.render
    ? props?.render({ taskTabProps, otherTabProps })
    : [taskTabProps, otherTabProps];

  /** 请求信箱未读消息数量(轮询)  */
  const { data: count, run: getCount } = useRequest<
    Response<INoticeCount>,
    any,
    any,
    INoticeCount
  >(`${props.baseApi}${Api.NoticeCount}`, {
    pollingInterval: props.interval,
    formatResult: (res) => {
      return res.data ?? {};
    },
  });

  /** 消息点击事件 */
  const onItemClick = async (
    item: INoticeData,
    customFunc?: (item: INoticeData) => void,
  ) => {
    // 调用点击函数
    customFunc ? await customFunc(item) : window.open(item.link, '_blank');
    // 关闭弹窗
    notification.close(item.id);
    //  未读时调用已读接口
    item.read === null &&
      (await usePost(
        `${props.baseApi}${Api.NoticeChangeStatus}`,
        {
          ids: [item.id],
          status: true,
        },
        {
          autoLoading: true,
        },
      ));
    // 更新未读数量
    getCount();
  };
  const onVisibleChange = (visible) => {
    visible && props.reloadOverlay && setOverlayKey(Math.random());
  };

  return {
    count,
    getCount,
    lists,
    onItemClick,
    overlayKey,
    onVisibleChange,
    ...props,
  };
}
