import { NoticeIconService } from '@/components/NoticeIcon/useNoticeIconService';
import * as React from 'react';
import { useContext } from 'react';

export type IMoreBtnProps = {
  /** 点击读取全部按钮事件 */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

/**
 * 读取更多按钮
 * @param {IProps} props
 * @author: Phoebe.Lv
 */
export const MoreBtn: React.FC<IMoreBtnProps> = (props) => {
  const { formatMessage } = useContext(NoticeIconService);

  return (
    <div
      onClick={(e) => {
        props?.onClick ? props?.onClick(e) : alert('click readall btn');
      }}
    >
      {formatMessage(`查看更多`)}
    </div>
  );
};

export default MoreBtn;
