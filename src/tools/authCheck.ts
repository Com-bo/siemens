import React, { ReactNode } from 'react';
export function checkAuth(functionName, authCode: string[] | string) {
  if (functionName) {
    //页面名称  HomePage、CertificateList、MaterialList、ClearList
    let functionsList; // [{authCode: "CertificateReturned", authName: "通关证明被退回分页查询"}]
    if (sessionStorage.getItem('authCodes')) {
      functionsList = JSON.parse(sessionStorage.getItem('authCodes'))[
        functionName
      ];
      if (authCode && functionsList) {
        if (Array.isArray(authCode)) {
          return functionsList.some((item) => authCode.includes(item.authCode));
        }
        return functionsList.some((item) => item.authCode == authCode);
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
/**
 * 权限组件封装
 */
interface AuthWrapperInterface {
  functionName: string;
  authCode: string;
  children?: ReactNode | undefined;
}
export const AuthWrapper = (props: any) => {
  return checkAuth(props.functionName, props.authCode) ? props.children : '';
};
// 获取界面第一个默认标签d的key。ex：MaterialLedger
export const getFirstTabKey = (functionName) => {
  if (functionName) {
    let functionsList;
    if (sessionStorage.getItem('authCodes')) {
      functionsList = JSON.parse(sessionStorage.getItem('authCodes'))[
        functionName
      ];
    }
    if (
      functionsList &&
      functionsList instanceof Array &&
      functionsList.length > 0
    ) {
      return functionsList[0].authCode;
    }
  }
};
