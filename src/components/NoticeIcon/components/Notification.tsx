import * as React from 'react';
import { INoticeData, INoticeListProps } from '../typings';
import Api from '../api';
import { usePost, Response, EnumConditionalType, useGet } from '@/app/request';
import { useMount, useRequest } from 'ahooks';
import { notification } from 'antd';
import { NoticeIconService } from '../useNoticeIconService';
import { useContext } from 'react';

export type INotificationProps = {
  /** 消息tab内容定义 */
  list: INoticeListProps;
};

/**
 * 轮询请求新消息，弹出卡片<br/>
 *
 * @param {INotificationProps} props
 * @author: Phoebe.Lv
 */
export const Notification = (props: INotificationProps) => {
  const { list } = props;
  const { baseApi, interval, remind, onItemClick, getCount } =
    useContext(NoticeIconService);

  useRequest<Response<INoticeData[]>, any, any, INoticeData[]>(
    {
      url: `${baseApi}${Api.NoticeNewMessage}`,
      method: 'post',
      data: {
        orderField: 'Created',
        orderType: 'desc',
        conditions: [
          {
            fieldName: 'category',
            fieldValue: list.tabKey,
            conditionalType: EnumConditionalType.Equal,
          },
          {
            fieldName: 'Interval',
            fieldValue: String(Math.floor(interval / 1000 / 60)),
            conditionalType: 0,
          },
        ],
      },
    },
    {
      pollingInterval: interval,
      formatResult: (res) => {
        return res.data ?? [];
      },
      onSuccess: (data) => {
        if (remind && data.length > 0) {
          /** 弹出新消息提醒 */
          data?.map((item) => {
            list.notification
              ? list.notification(item, () =>
                  onItemClick(item, list.onItemClick),
                )
              : notification.info({
                  key: item.id,
                  message: item.title,
                  description: item.content,
                  onClick: () => onItemClick(item, list.onItemClick),
                  duration: null,
                });
          });
        }
        /** 更新未读数量 */
        getCount();
      },
    },
  );
  return <div style={{ display: 'none' }}></div>;
};
export default Notification;
