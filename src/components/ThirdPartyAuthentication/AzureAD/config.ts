import {
  BrowserCacheLocation,
  Configuration,
  PublicClientApplication,
} from '@azure/msal-browser';

export let msalInstance: PublicClientApplication;

export interface IMSALInitProps {
  clientId: string;
  /** 不设置时授权地址为https://login.microsoftonline.com/common */
  tenantId?: string;

  /** 默认为初始化时的location.href，传入有效地址则覆盖,否则拼接成`${location.origin}${location.pathname}/${redirectUri}` */
  redirectUri?: string;

  /** 对生成的config进行自定义处理 */
  customConfig?: (config: Configuration) => Configuration;
}

export const msalInit = (props: IMSALInitProps) => {
  if (msalInstance) {
    return msalInstance;
  }

  const { clientId, tenantId = 'common', redirectUri, customConfig } = props;

  let configuration = {
    auth: {
      authority: `https://login.microsoftonline.com/${tenantId}`,
      clientId: clientId,
      redirectUri:
        redirectUri?.startsWith('http://') ||
        redirectUri?.startsWith('https://')
          ? redirectUri
          : redirectUri
          ? `${location.origin}${location.pathname}/${redirectUri}`
          : location.href,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage,
      storeAuthStateInCookie: false,
    },
  };
  msalInstance = new PublicClientApplication(
    customConfig?.(configuration) ?? configuration,
  );
  return msalInstance;
};
