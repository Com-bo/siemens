import { useRequest } from 'ahooks';
import { IMenuItemProps } from '.';

/** 每个菜单的服务 */
export default function useMenuItemService(props: IMenuItemProps) {
  // const { notice, setNotice } = useContext(LayoutServices)
  /**消息获取 */
  const { data: number, loading } = useRequest(props.menu.notice.request, {
    pollingInterval: props.menu.notice.interval ?? 1000,
    pollingWhenHidden: false,
    manual: false,
    ready: !!props.menu.notice.request,
  });
  return { number, loading };
}
