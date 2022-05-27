import { NoticeIconService } from '@/components/NoticeIcon/useNoticeIconService';
import { NoticeListService } from '@/components/NoticeIcon/components/NoticeList/useNoticeListService';
import * as React from 'react';
import { useContext } from 'react';

export type IReadAllBtnProps = {
  /** 点击读取全部按钮事件 */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

/**
 * 读取全部消息按钮
 * @param {IReadAllBtnProps} props
 * @author: Phoebe.Lv
 */
export const ReadAllBtn: React.FC<IReadAllBtnProps> = (props) => {
  const { formatMessage } = useContext(NoticeIconService);
  const { readAllFunc } = useContext(NoticeListService);

  return (
    <div
      onClick={(e) => {
        readAllFunc();
        props.onClick?.(e);
      }}
    >
      {formatMessage(`全部已读`)}
    </div>
  );
};

export default ReadAllBtn;
