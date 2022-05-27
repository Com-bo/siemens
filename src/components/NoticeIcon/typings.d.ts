import { Condition } from '@/app/request';
import { ProListMetas } from '@ant-design/pro-list';
import React from 'react';
import { IDefaultItemProps } from './components/NoticeList/components/DefaultItem';
import { IMoreBtnProps } from './components/NoticeList/components/MoreBtn';
import { IReadAllBtnProps } from './components/NoticeList/components/ReadAllBtn';
import { NotificationApi } from 'antd/lib/notification';

export type INoticeIconProps = {
  /** 消息提醒icon */
  bellIcon?: React.ReactNode;
  /** tab 切换函数 */
  onTabChange?: (tabTile: string) => void;
  /** tab 默认渲染 ["task","other",] */
  render?: (defaultProps: {
    taskTabProps: INoticeListProps;
    otherTabProps: INoticeListProps;
  }) => INoticeListProps[];
  /** 轮询时间定义 - ms - 默认60s*/
  interval?: number;
  /** 请求基地址 */
  baseApi: string;
  /**多语言翻译函数 */
  formatMessage?: IFormatMessage;
  /** 开启新消息提醒 - 仅提醒出现了新消息 */
  remind?: boolean;
  /** 展开下拉菜单时是否重新请求数据 - 默认不重新请求 */
  reloadOverlay?: boolean;
};

export type INoticeListProps = {
  /** tab面板title */
  title: string;
  /** tab key及请求参数 - 每个数据为请求后端的filedValue */
  tabKey: string;
  /** 消息点击事件，默认按照data中的link进行跳转，支持复写 */
  onItemClick?: (item: INoticeData) => void;
  /** itemRender函数 - 支持复写默认样式 */
  itemRender?: (
    data: INoticeData[],
    type: string,
    props: INoticeListProps,
    /** 默认渲染函数 */
    DefaultItem: (props: IDefaultItemProps) => ProListMetas<INoticeData>,
  ) => ProListMetas<INoticeData>;
  /** 底部渲染区域 */
  footerRender?: (
    datas: INoticeData[],
    type: string,
    ReadAllBtn: React.FC<IReadAllBtnProps>,
    MoreBtn: React.FC<IMoreBtnProps>,
  ) => React.ReactNode;
  /** 空数据提示内容 */
  emptyRender?: React.ReactNode;
  /** 新消息提醒卡片 */
  notification?: (data: INoticeData, onClick: Function) => NotificationApi;
  /** 消息列表懒加载数量 - 默认一次加载5条数据 */
  pageSize?: number;
};

/** 消息内容 */
export type INoticeData = {
  /** 主键 */
  id: string;
  /** 消息标题 */
  title: string;
  /** 如果消息是文字，要弹出的文字 */
  content: string;
  /** 如果消息内容是链接，要打开的链接 */
  link: string;
  /** 消息所属的分类:0:task,1:other */
  category: number;
  /** 消息的类型; 0:新任务,1:逾期提醒,2:催办,3:取消,10:导出完成,11:提及	 */
  type: number;
  /** 消息所属业务的类型 */
  businessType: number;
  /** 来源系统的标识 */
  source: string;
  /** 扩展字段 */
  extra: string;
  /** 消息置为已读时的时间 通过这个是否为空来判断是否已读 */
  read: string;
  /** 这条消息写入数据库的时间 */
  created: string;
  /** 发送人 */
  createdByName: string;
};

export type IFormatMessage = (
  key: string,
  attr?: Record<string, any>,
) => string;
