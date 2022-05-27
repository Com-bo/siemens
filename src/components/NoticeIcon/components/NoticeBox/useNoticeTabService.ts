import { useContext } from 'react';
import { INoticeListProps } from '../../typings';
import { NoticeIconService } from '../../useNoticeIconService';

export default function useNoticeTabService(props: INoticeListProps) {
  const { title, tabKey } = props;
  const { count } = useContext(NoticeIconService);
  const tabTitle: string =
    count?.[tabKey] > 0 ? `${title} (${count?.[tabKey]})` : title;

  return { tabTitle };
}
