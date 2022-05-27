import { Image } from 'antd';
import React, { useState } from 'react';
import NoticeBox from './components/NoticeBox';
import Notification from './components/Notification';
import { BellIcon, DropdownWrapper, NoticeBadge } from './style';
import type { INoticeIconProps } from './typings';
import useNoticeIconServices, {
  NoticeIconService,
} from './useNoticeIconService';

const DefaultEmptyData = require('./assets/emptydata.svg');

/** 赋予默认props值 */
const DefaultProps: Omit<INoticeIconProps, 'baseApi'> = {
  interval: 60000, // 60s
  remind: true,
  formatMessage: (i) => i,
  reloadOverlay: false,
};
NoticeIcon.defaultProps = DefaultProps;

/**
 * 数量提醒，弹出菜单包含2个tag（待办、消息）。<br/>
 * 数据已读未读混杂，明暗显示，按时间排序，懒加载。<br/>
 * 点击消息内容可以跳转，到底显示nodata<br/>
 * <a href="https://preview.pro.ant.design/dashboard/analysis?primaryColor=%231890ff&fixSiderbar=true&colorWeak=false&pwa=false">👉样式对标</a>  <br/>
 * <hr/>
 * 提供：<br/>
 * 1、轮询时间定义，<br/>
 * 2、自定义item渲染函数<br/>
 * 3、自定义底部渲染函数<br/>
 * 4、自定义tag渲染函数<br/>
 * 5、自定义空数据提示内容<br/>
 * 6、新消息提醒<br/>
 * <hr/>
 * 备注：消息类型：<br/>
 * 1、任务 = 流程消息（逾期、催办。取消、新任务） <br/>
 * 2、消息 = 评论 +  系统消息 + 下载队列提醒<br/>
 *
 * @extends ProLayout https://procomponents.ant.design/components/layout/
 * @author: Phoebe.Lv
 */
export function NoticeIcon(props: INoticeIconProps) {
  const { formatMessage } = props;
  const DefaultEmptyDom = (
    <>
      <Image preview={false} src={DefaultEmptyData} />
      {formatMessage('暂无数据')}
    </>
  );
  const taskTabProps = {
    tabKey: 'task',
    title: formatMessage('任务'),
    emptyRender: DefaultEmptyDom,
  };

  const otherTabProps = {
    tabKey: 'other',
    title: formatMessage('其他'),
    emptyRender: DefaultEmptyDom,
  };

  const noticeIconServices = useNoticeIconServices({
    ...props,
    taskTabProps,
    otherTabProps,
  });
  const { count, lists, overlayKey, onVisibleChange } = noticeIconServices;
  return (
    <NoticeIconService.Provider
      value={{ ...noticeIconServices, DefaultEmptyDom }}
    >
      <DropdownWrapper
        placement="bottomRight"
        onVisibleChange={onVisibleChange}
        overlay={<NoticeBox {...props} render={lists} key={overlayKey} />}
        trigger={['click']}
        overlayStyle={{
          position: 'relative',
          width: '350px',
          boxShadow: '0px 0px 4px 0px #cdcdcd',
          zIndex: 999,
        }}
      >
        <span>
          <NoticeBadge count={count?.['total']}>
            {props.bellIcon || <BellIcon />}
          </NoticeBadge>
        </span>
      </DropdownWrapper>
      {lists?.map((list, index) => {
        return <Notification list={list} key={index} />;
      })}
    </NoticeIconService.Provider>
  );
}

export default NoticeIcon;
