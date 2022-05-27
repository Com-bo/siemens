import getServiceContext from '@/tools/getServiceContext';
import { useState } from 'react';

// 这个服务将被注册至全局
export const AzureMPInModalService = getServiceContext(useAzureMPInModalService);

export type IAzureMPInModalService = ReturnType<
  typeof useAzureMPInModalService
>;

export type IFormatMessage = (
  key: string,
  attr?: Record<string, any>,
) => string;

export interface IProps {
  /**多语言翻译函数 */
  formatMessage?: IFormatMessage;
  /**使用多语言翻译的自定义前缀，未重写将默认使用ImageFormItem_前缀，无需前缀传空字符串*/
  messagePrefix?: string;
}
export default function useAzureMPInModalService(props: IProps) {
  const [modal, setmodal] = useState({
    visible: false,
    src: '',
  });

  const DEFAULT_PREFIX = 'AzureMP_';

  /** 重写多语言翻译函数 */
  const formatMessage: IFormatMessage = (key, attr) => {
    const prefix =
      props.messagePrefix !== undefined ? props.messagePrefix : DEFAULT_PREFIX;
    const formatKey = `${prefix}${key}`;
    return props.formatMessage ? props.formatMessage(formatKey, attr) : key;
  };

  return { modal, setmodal, formatMessage };
}
