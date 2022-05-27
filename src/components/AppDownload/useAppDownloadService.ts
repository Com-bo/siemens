import { IAppDownloadProps, IFormatMessage, ISource } from '.';

export function useAppDownloadService(props: IAppDownloadProps) {
  const { mode, sources, mixPageHash } = props;
  const formatMessage: IFormatMessage = (key, attr) => {
    return props.formatMessage ? props.formatMessage(key, attr) : key;
  };
  const isMix = () => mode === 'mix';
  const isValidMode = () => mode === 'mix' || mode === 'normal';

  /** 根据组件选择的模式重写对应的url跳转链接 */
  const getQRCodeUrl = (): ISource[] => {
    if (!isMix()) {
      return sources;
    }
    // 将props.source数组内属于Android及Ios的数据拼接在二码合一跳转地址中
    const iOS = sources?.find((item) => item.agent === 'iOS')?.url;
    const android = sources?.find((item) => item.agent === 'Android')?.url;
    return [
      {
        ...sources[0],
        url: `${location.origin}${
          location.pathname
        }?Android=${encodeURIComponent(android)}&iOS=${encodeURIComponent(
          iOS,
        )}${mixPageHash}`,
      },
    ];
  };

  const isValidSources = () => {
    if (!isValidMode()) {
      return '不支持的mode';
    }
    if (isMix() && sources?.length !== 2) {
      return '选择二码合一模式下source必须传android和ios下载链接且二码合一模式下二维码下方说明和内嵌icon地址会默认使用source中的第一个';
    }
    if (
      isMix() &&
      sources?.length === 2 &&
      sources[0]?.agent === sources[1]?.agent
    ) {
      return '如果在二码合一模式下下载链接传了两个,则必须分别为ios和android';
    }
    return '';
  };

  return {
    sources: getQRCodeUrl(),
    isValidSources,
    formatMessage,
  };
}

export default useAppDownloadService;
