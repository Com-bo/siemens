import { Badge } from 'antd';
import { BadgeProps } from 'antd/lib/badge';
import React from 'react';
import styled from 'styled-components';
import { IRoute } from '..';
import useMenuItemService from './useMenuItemService';
const MenuItem = styled.div`
  display: flex;
  align-items: center;
`;

const Notice = styled(Badge)`
  .ant-badge-dot,
  .ant-badge-count {
    margin-left: 5px !important;
  }
`;
export interface IMenuItemProps {
  /**子菜单item */
  menu: IRoute;
  /**原本子菜单样式 */
  defaultdom: React.ReactNode;
  /** 菜单的展开状态 */
  collapsed: boolean;
}

export type IMenuItemNotice = {
  path?: string;

  /** 提醒形式 数量/红点/其他渲染形式 */
  type?: 'number' | 'dot' | 'other';
  /**消息标识 */
  key?: string;
  /** 轮询函数 */
  request?: () => Promise<number>;
  /** 轮询时间 ms */
  interval?: number;
  /** type选择other时的自定义渲染函数 */
  render?: (noticeNum: number) => React.ReactNode;
} & BadgeProps;

/** 子菜单Dom
 * 基于antd ProLayout menu额外拓展以下属性：<br/>
 * 1、拓展子菜单提醒标签：数量/红点/其他拓展位（可选服务）<br/>
 * 2、定时轮询请求函数（可选服务）<br/>
 */
export const MedalsoftMenuItem = (props: IMenuItemProps) => {
  const { menu, defaultdom, collapsed } = props;
  const { number } = useMenuItemService(props);

  // menu提醒小标签渲染
  let Notification;
  if (menu?.notice?.type == 'other') {
    Notification = menu?.notice?.render(number) ?? number;
  } else {
    Notification = number;
  }
  return (
    <MenuItem>
      {defaultdom}
      <Notice
        title={null}
        size="small"
        overflowCount={99}
        offset={[collapsed ? -2 : 0, collapsed ? -10 : 0]}
        dot={menu?.notice?.type === 'dot' || collapsed}
        count={Notification}
      ></Notice>
    </MenuItem>
  );
};

export default MedalsoftMenuItem;
