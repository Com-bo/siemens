import { QrcodeOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';
import { AbstractTooltipProps, TooltipPlacement } from 'antd/lib/tooltip/index';
import * as React from 'react';
import { Container, PopoverWrapper } from './style';
import useAppDownloadService from './useAppDownloadService';
import QRCode from 'qrcode.react';

export type IFormatMessage = (
  key: string,
  attr?: Record<string, any>,
) => string;

export type IAppDownloadProps = {
  /** 源数据 */
  sources?: ISource[];
  // /** 二维码生成模式  普通模式|二码合一模式 默认二码合一模式*/
  mode?: 'normal' | 'mix';
  /** 弹出层位置，默认下方弹出 */
  placement?: TooltipPlacement;
  /** Popover 包裹的标题 */
  buttonTitle?: string;
  /** 二码合一跳转基地址,默认跳转地址/Download */
  mixPageHash?: string;
  /**多语言翻译函数 */
  formatMessage?: IFormatMessage;
} & AbstractTooltipProps;

export type ISource = {
  /** 二维码跳转地址 */
  url: string;
  /** 二维码下方说明 */
  description?: string;
  /** 二维码内嵌icon地址,有效的在线地址或import(优先)、require的资源 */
  icon?: string;
  /** 终端类型 */
  agent: 'Android' | 'iOS';
};

/**
 * APP下载二维码下拉菜单
 * <hr/>
 * 1、（待补充）模式选择：二码合一模式；普通模式<br/>
 * 2、二码合一模式在微信打开提示“请在浏览器中打开”<br/>
 * 3、二码合一模式识别浏览器自动下载安卓\ios包<br/>
 * 4、二码合一模式下二维码下方说明和内嵌icon地址会默认使用source中的第一个
 *
 * @param {IAppDownloadProps} props
 * @author: 康锐
 */

export const AppDownload = (props: IAppDownloadProps) => {
  const { formatMessage, isValidSources, sources } =
    useAppDownloadService(props);
  const message = isValidSources();
  if (message) {
    return <div>{formatMessage(message)}</div>;
  }
  const downLoadContent = (
    <Container {...props}>
      {sources?.map((item, index) => {
        return (
          <div key={index}>
            <QRCode
              size={100}
              imageSettings={{
                width: 20,
                height: 20,
                src: item?.icon,
              }}
              value={item?.url}
            />
            {item?.description ? (
              <a href={item.url}>{item?.description}</a>
            ) : null}
          </div>
        );
      })}
    </Container>
  );

  return (
    <PopoverWrapper
      {...props}
      placement={props?.placement}
      content={downLoadContent}
      arrowPointAtCenter
    >
      <QrcodeOutlined />
      <span>{props?.buttonTitle}</span>
    </PopoverWrapper>
  );
};

const defaultProps: IAppDownloadProps = {
  placement: 'bottom',
  mode: 'mix',
  mixPageHash: '/#/download',
};

AppDownload.defaultProps = defaultProps;

export default AppDownload;
