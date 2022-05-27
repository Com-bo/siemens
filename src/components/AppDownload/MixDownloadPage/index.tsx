import React from 'react';
import { DownloadButton, DownloadButtonContainer } from './style';
import useMixDownloadPageService from './useMixDownloadPageService';
import WeChatDownloadGuide from '../assets/wechat-download-guide.jpg';
import DownloadBackground from '../assets/download.jpg';

export interface MixDownloadProps {
  iOS?: string;
  android?: string | { [name: string]: string };
}

/**
 * 手机扫码打开的下载页面，不支持多语言翻译
 * 下载途径目前支持：
 * 1、苹果：商店、企业应用、
 *    安卓：支持多个自定义下载地址，一到两个为最佳体验
 * 2、二码合一模式自动根据设备选择判断对应的下载地址，单码模式根据扫描的地址跳转
 * 2.1、如果是苹果设备，IOS下载地址：
 *      是AppStore地址，自动跳转AppStore
 *      非AppStore地址且是微信打开，显示引导图提示”通过浏览器打开“
 *      其他情况，进入下载页点击按钮下载安装APP
 * 2.2、如果是安卓设备：
 *      通过微信打开，显示引导图提示”通过浏览器打开“
 *      其他情况，进入下载页点击按钮下载安装APP
 */
const MixDownloadPage = (props: MixDownloadProps) => {
  const { isWeChat, isAndroid, isiOS, iOSUrl, androidMap } =
    useMixDownloadPageService(props);

  return (
    <>
      {isWeChat && (
        <img
          src={WeChatDownloadGuide}
          alt="微信打开"
          style={{ height: '100vh', width: '100vw' }}
        />
      )}
      {!isWeChat && (
        <>
          {isiOS && iOSUrl && (
            <DownloadButtonContainer>
              {/* TODO: 苹果企业下载，a标签 href属性值为iOSUrl，样式统一为按钮样式*/}
              <DownloadButton>Download</DownloadButton>
            </DownloadButtonContainer>
          )}
          {isAndroid && (
            <>
              {Object.keys(androidMap).map((name) => {
                return (
                  <DownloadButtonContainer
                    onClick={() => window.open(androidMap[name])}
                  >
                    <DownloadButton>{name}</DownloadButton>
                  </DownloadButtonContainer>
                );
              })}
            </>
          )}
          <img
            src={DownloadBackground}
            alt="下载"
            style={{ height: '100vh', width: '100vw' }}
          />
        </>
      )}
    </>
  );
};

export default MixDownloadPage;
