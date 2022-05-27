import { NoticeIconService } from '@/components/NoticeIcon/useNoticeIconService';
import * as React from 'react';
import { useContext } from 'react';
import { Avatar } from 'antd';
import {
  CarryOutFilled,
  ClockCircleOutlined,
  PhoneFilled,
  MinusCircleOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { INoticeData, INoticeListProps } from '../../../typings';
import { ProListMetas } from '@ant-design/pro-list';
import Api from '@/components/NoticeIcon/api';
import { usePost } from '@/app/request';
import styled from 'styled-components';
import Icon from '@ant-design/icons';
import { MSOIcon } from '../style';

const SvgIcon = styled.svg`
  width: 18px;
  height: 18px;
  path {
    fill: ${(props) => props.theme['com-notice-icon-color']};
  }
`;

const mentionIcon = () => (
  <SvgIcon
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="848"
  >
    <path
      d="M669.824 791.04a352.96 352.96 0 0 1-195.392 47.104 272.768 272.768 0 0 1-292.48-290.752 344.384 344.384 0 0 1 344.96-356.544c152.128 0 282.432 88 282.432 256.384 0 139.648-82.688 234.24-185.6 234.24-43.2 0-70.4-17.536-72-58.688a128.768 128.768 0 0 1-112.384 58.432c-62.08 0-104.32-41.28-104.32-123.072 0-112.832 73.536-217.6 167.68-217.6a84.096 84.096 0 0 1 91.392 59.52l13.44-51.776h57.6l-50.688 205.056c-14.464 58.624-8.32 77.76 21.888 77.76 62.976 0 117.248-77.44 117.248-180.8 0-132.352-92.416-208.96-231.04-208.96-169.088 0-279.872 136.448-280.384 306.304a220.352 220.352 0 0 0 235.904 237.888c62.272 2.56 124.096-11.456 179.2-40.576l12.544 46.08zM397.952 552.896c0 50.432 19.648 77.184 58.432 77.184 48.512 0 88.32-38.4 107.712-117.184C584.768 431.744 566.4 390.4 508.16 390.4c-66.56 0-110.272 85.696-110.272 162.496z"
      p-id="849"
    ></path>
  </SvgIcon>
);

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme['com-notice-color']};
`;

const IconText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    margin-right: 8px;
    align-items: center;
    justify-content: center;
    display: flex;
  }
`;

// 消息的类型; 0:新任务,1:逾期提醒,2:催办,3:取消,10:导出完成,11:提及
enum EnumNoticeType {
  newTask = 0,
  overlayNotice = 1,
  reminder = 2,
  cancel = 3,
  exportComplete = 10,
  mention = 11,
}

const NoticeTypeMap = {
  newTask: {
    icon: <CarryOutFilled />,
    text: '新任务',
  },
  overlayNotice: {
    icon: <ClockCircleOutlined />,
    text: '逾期提醒',
  },
  reminder: {
    icon: <PhoneFilled />,
    text: '催办',
  },
  cancel: {
    icon: <MinusCircleOutlined />,
    text: '取消',
  },
  exportComplete: {
    icon: <DownloadOutlined />,
    text: '导出完成',
  },
  mention: {
    icon: <Icon component={mentionIcon} />,
    text: '提及',
  },
};

export type IDefaultItemProps = {
  /** 渲染内容定义 */
  metas?: ProListMetas<INoticeData>;
};

/**
 * 待办item渲染模式
 * @param {IDefaultItemProps} props
 * @author: Phoebe.Lv
 */
export const DefaultItem = (
  props: IDefaultItemProps,
): ProListMetas<INoticeData> => {
  const { formatMessage, baseApi } = useContext(NoticeIconService);
  return {
    title: {},
    description: {
      dataIndex: 'content',
    },
    actions: {
      dataIndex: 'created',
      valueType: 'dateTime',
      render: (dom, row) => {
        const defaultDefined = NoticeTypeMap[EnumNoticeType[row.type]];
        return (
          <FlexBetween>
            <IconText>
              {defaultDefined
                ? [
                    <MSOIcon>{defaultDefined.icon}</MSOIcon>,
                    <span>{formatMessage(defaultDefined.text)}</span>,
                  ]
                : null}
            </IconText>

            {dom}
          </FlexBetween>
        );
      },
    },
    ...props.metas,
  };
};

export default DefaultItem;
