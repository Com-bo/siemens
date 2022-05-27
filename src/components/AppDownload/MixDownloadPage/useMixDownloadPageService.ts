import { isAndroid, isiOS, isWeChat } from '@/tools/validator/browser';
import { useMount } from 'ahooks';
import qs from 'qs';
import { MixDownloadProps } from '.';
export default function useMixDownloadPageService(props: MixDownloadProps) {
  const { iOS, android } = props;

  // 获取url参数装为对象
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  // 以下常量从链接参数取
  const iOSUrl = iOS || decodeURIComponent(params['iOS'] as string); // 参数iOS
  const isAppStore = !iOSUrl.endsWith('.plist');
  const androidMap =
    typeof android === 'string'
      ? {
          'Download APK': android,
        }
      : android || {
          'Download APK': decodeURIComponent(params['Android'] as string),
        }; // 参数android

  useMount(() => {
    /** app store地址则直接跳转 */
    if (isAppStore && isiOS()) {
      location.href = iOSUrl;
    }
  });

  return {
    isWeChat: isWeChat(),
    isAndroid: isAndroid(),
    isiOS: isiOS(),
    iOSUrl: isAppStore
      ? undefined
      : `itms-services://?action=download-manifest&url=${iOSUrl}`,
    androidMap,
  };
}
