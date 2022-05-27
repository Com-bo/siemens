import {
  useMsalAuthentication,
  AccountIdentifiers,
  useMsal,
  useIsAuthenticated,
} from '@azure/msal-react';
import {
  InteractionRequiredAuthError,
  InteractionType,
  IPublicClientApplication,
  AccountInfo,
  AuthError,
  AuthenticationResult,
  InteractionStatus,
  EndSessionRequest,
  PopupRequest,
  RedirectRequest,
} from '@azure/msal-browser';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { createContext } from 'react';
import { msalInstance } from './config';
import getServiceContext from '@/tools/getServiceContext';
export interface IAzureADServiceProps {
  /** 默认["openid", "profile"]，传入字符串则push，传入数组则覆盖 */
  scope?: string[] | string;
  /** 登录方式、默认popup InteractionType枚举*/
  loginType?: InteractionType;
}

export interface IAzureADService {
  /** 是否授权 */
  isAuthenticated: boolean;
  /** 触发登录 */
  login: (
    anyRequest?: PopupRequest | RedirectRequest,
  ) => Promise<AuthenticationResult | void>;

  /** 登出，可以不传入参 */
  logout: (logoutRequest?: EndSessionRequest) => Promise<void>;
  msalInstance: IPublicClientApplication;
  accessToken: string;
  account: AccountInfo;

  /** 刷新token，返回token */
  refreshAccessToken: () => Promise<string | undefined>;

  /** msal当前操作状态 */
  status: InteractionStatus;
}

export const useAzureADService = (
  props: IAzureADServiceProps,
): IAzureADService => {
  const { scope, loginType = InteractionType.Popup } = props;

  const scopesMerge = Array.isArray(scope)
    ? scope
    : [...new Set(['openid', 'profile', scope ?? ''].filter((i) => i))];
  const [accessToken, setAccessToken] = useState<string>('');
  const { accounts, instance: msalInstance, inProgress: status } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = msalInstance.getActiveAccount() || accounts[0];
  const request = {
    scopes: scopesMerge,
    account,
  };
  const login = (anyRequest?: PopupRequest | RedirectRequest) => {
    return loginType === InteractionType.Popup
      ? msalInstance
          .loginPopup(anyRequest ?? { scopes: scopesMerge })
          .then((r) => setAccessToken(r.accessToken))
      : msalInstance
          .loginRedirect(anyRequest ?? { scopes: scopesMerge })
          .then(null);
  };

  if (accounts.length > 0 && isAuthenticated) {
    msalInstance
      .acquireTokenSilent(request)
      .then((response) => {
        setAccessToken(response.accessToken);
      })
      .catch((error) => {
        // acquireTokenSilent can fail for a number of reasons, fallback to interaction
        if (error instanceof InteractionRequiredAuthError) {
          if (loginType === InteractionType.Popup) {
            msalInstance.acquireTokenPopup(request).then((response) => {
              setAccessToken(response.accessToken);
            });
          } else {
            msalInstance.acquireTokenRedirect(request);
          }
        }
      });
  }
  const refreshAccessToken = () => {
    return msalInstance
      .acquireTokenSilent(request)
      .then((response) => {
        setAccessToken(response.accessToken);
        return response.accessToken;
      })
      .catch((error) => {
        if (error instanceof InteractionRequiredAuthError) {
          if (loginType === InteractionType.Popup) {
            return msalInstance.acquireTokenPopup(request).then((response) => {
              setAccessToken(response.accessToken);
              return response.accessToken;
            });
          } else {
            return msalInstance
              .acquireTokenRedirect(request)
              .then(() => undefined);
          }
        }
      });
  };
  return {
    isAuthenticated,
    login,
    logout: msalInstance.logout,
    msalInstance,
    accessToken,
    account,
    refreshAccessToken,
    status,
  };
};

/**
 * react 外获取token，返回undefined则表示用户未登录
 * @param scopes 默认["User.Read"]
 * @returns
 */
export const acquireAccessToken = async (scopes?: string[]) => {
  const activeAccount = msalInstance.getActiveAccount(); // This will only return a non-null value if you have logic somewhere else that calls the setActiveAccount API
  const accounts = msalInstance.getAllAccounts();

  if (!activeAccount && accounts.length === 0) {
    /*
     * User is not signed in. Throw error or wait for user to login.
     * Do not attempt to log a user in outside of the context of MsalProvider
     */
    return undefined;
  }
  const request = {
    scopes: scopes ?? ['User.Read'],
    account: activeAccount || accounts[0],
  };

  const authResult = await msalInstance.acquireTokenSilent(request);

  return authResult.accessToken;
};

export const AzureADService = getServiceContext(useAzureADService);
