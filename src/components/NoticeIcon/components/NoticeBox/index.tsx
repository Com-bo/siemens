import * as React from 'react';
import { INoticeIconProps, INoticeListProps } from '../../typings';
import { Tabs } from 'antd';
import NoticeList from '../NoticeList';
import styled from 'styled-components';
import useNoticeTabService from './useNoticeTabService';
import { useContext, useRef } from 'react';
import { NoticeIconService } from '../../useNoticeIconService';
const { TabPane } = Tabs;

const NoticeTabs = styled(Tabs)`
  background: ${(props) => props.theme['com-notice-tab-background']};
  /* .ant-tabs-nav {
    margin: 0;
  }
  .ant-tabs-nav-list {
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 0px ${(props) => props.theme['system-margin']};
    .ant-tabs-tab {
      flex: 1 0 0%;
      justify-content: center;
      align-items: center;
    }
  }

  .ant-tabs-nav-scroll {
    text-align: center;
  }
  .ant-tabs-bar {
    margin-bottom: 0;
  } */
`;
type INoticeBoxProps = {
  render: INoticeListProps[];
} & Omit<INoticeIconProps, 'render'>;

/**
 * 消息提醒容器
 * @param {INoticeBoxProps} props
 * @author: Phoebe.Lv
 */
export const NoticeBox: React.FC<INoticeBoxProps> = (
  props: INoticeBoxProps,
) => {
  const { DefaultEmptyDom } = useContext(NoticeIconService);
  const reloadRef = useRef<Record<string, () => void>>({});

  return (
    <NoticeTabs
      onChange={(activeKey) => {
        // 切换tab时刷新list
        reloadRef.current?.[activeKey]?.();
      }}
      centered
    >
      {props.render?.map((noticeListProps: INoticeListProps) => {
        if (!noticeListProps) return;

        const { tabTitle } = useNoticeTabService(noticeListProps);

        return (
          <TabPane tab={tabTitle} key={noticeListProps.tabKey}>
            <NoticeList
              emptyRender={DefaultEmptyDom}
              {...noticeListProps}
              reloadRef={reloadRef}
            />
          </TabPane>
        );
      })}
    </NoticeTabs>
  );
};
export default NoticeBox;
