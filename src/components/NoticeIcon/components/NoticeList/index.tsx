import React, { useContext, useState } from 'react';
import {
  INoticeData,
  INoticeListProps as IDefaultNoticeListProps,
} from '../../typings';
import {
  ScrollContainer,
  BottomBar,
  NoticeListWrapper,
  FlexCenter,
  NoMore,
} from './style';
import useNoticeListService, {
  NoticeListService,
} from './useNoticeListService';
import ProList from '@ant-design/pro-list';
import ReadAllBtn from './components/ReadAllBtn';
import MoreBtn from './components/MoreBtn';
import DefaultItem from './components/DefaultItem';
import { Spin } from 'antd';
import { NoticeIconService } from '../../useNoticeIconService';
import ListItem from './components/ListItem';

export type INoticeListProps = IDefaultNoticeListProps & {
  reloadRef: React.MutableRefObject<Record<string, () => void>>;
};

const NoticeList: React.FC<INoticeListProps> = (props: INoticeListProps) => {
  const { tabKey } = props;
  const noticeListService = useNoticeListService(props);
  const { formatMessage } = useContext(NoticeIconService);
  const { onItemClick } = useContext(NoticeIconService);
  const {
    data,
    loading,
    loadingMore,
    loadMore,
    noMore,
    containerRef,
    readAllLoading,
    read,
    setRead,
  } = noticeListService;
  const footerBtns =
    props?.footerRender !== undefined
      ? props.footerRender?.(
          data.list,
          tabKey,
          (props) => <ReadAllBtn {...props} />,
          (props) => <MoreBtn {...props} />,
        )
      : [<ReadAllBtn />, <MoreBtn />];

  /** 读取自定义metas */
  let metas =
    props?.itemRender !== undefined
      ? props?.itemRender?.(data.list, tabKey, props, DefaultItem)
      : DefaultItem({});
  /** 重写metas属性，挂载已读样式 */
  Object.values(metas).forEach((meta) => {
    let render = meta?.render;
    meta.render = (dom, row, index, action, schema) => {
      const prop = {
        dom,
        row,
        index,
        action,
        schema,
        render,
        props,
        onItemClick,
        read,
        setRead,
      };
      return <ListItem {...prop} />;
    };
  });
  return (
    <NoticeListService.Provider value={noticeListService}>
      <NoticeListWrapper key={`${tabKey}_ListWrapper`}>
        <Spin spinning={loading || loadingMore || readAllLoading}>
          <ScrollContainer ref={containerRef}>
            <ProList<INoticeData>
              size="small"
              rowKey={'id'}
              toolBarRender={false}
              itemLayout="vertical"
              dataSource={data.list}
              loadMore={loadMore}
              metas={metas}
              tableRender={(tableprops, defaultdom, domList) => {
                return !tableprops.dataSource?.length && props?.emptyRender ? (
                  <FlexCenter>{props?.emptyRender}</FlexCenter>
                ) : (
                  defaultdom
                );
              }}
              footer={
                noMore ? (
                  <NoMore>-----{formatMessage('我是有底线的')}-----</NoMore>
                ) : null
              }
            />
          </ScrollContainer>
        </Spin>
        {footerBtns ? <BottomBar>{footerBtns}</BottomBar> : null}
      </NoticeListWrapper>
    </NoticeListService.Provider>
  );
};
export default NoticeList;
