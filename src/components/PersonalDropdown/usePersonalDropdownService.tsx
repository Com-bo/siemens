import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Form, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { history } from 'umi';
import { Action, IMedalsoftPersonDropdownProps } from '.';
import { encryptByRSA } from '@/tools/jsencrypt';
import Mgr from '@/services/SecurityService';
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import { getMyIdLoginInfo } from '@/app/request/apiUser';
import axios from 'axios';

const config: any = {
  auth: {
    authority:
      'https://login.microsoftonline.com/5dbf1add-202a-4b8d-815b-bf0fb024e033',
    clientId: process.env.CLIENT_ID,
    redirectUri: 'http://localhost:8834',
    postLogoutRedirectUri: process.env.WEB_URL + '/#/logout',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
};

// Authentication Parameters
const authenticationParameters = {
  scopes: [
    '<property (i.e. user.read)>',
    'https://<your-tenant-name>.onmicrosoft.com/<your-application-name>/<scope (i.e. demo.read)>',
  ],
};

// Options
const options = {
  loginType: LoginType.Popup,
  tokenRefreshUri: window.location.origin + '/auth.html',
};

const authProvider = new MsalAuthProvider(
  config,
  authenticationParameters,
  options,
);

export type IFormatMessage = (
  key: string,
  attr?: Record<string, any>,
) => string;
const usePersonalDropdownService = (props: IMedalsoftPersonDropdownProps) => {
  const { onClick, maxUserNameLength = 20 } = props;
  /** 重写多语言翻译函数 */
  const formatMessage: IFormatMessage = (key, attr) => {
    return props.formatMessage ? props.formatMessage(key, attr) : key;
  };
  // 用户名格式化函数
  const formatUserName = (username: string) => {
    if (username) {
      return username.length > maxUserNameLength
        ? `${username.substring(0, maxUserNameLength)}...`
        : username;
    }
    return '';
  };

  // 修改密码弹框
  const [passwordForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const checkNewPassword = (rule, value, callback) => {
    let password =
      rule.field == 'newPassword'
        ? passwordForm.getFieldValue('confirmPassword')
        : passwordForm.getFieldValue('newPassword');
    if (!value) {
      callback();
    } else {
      if (password && password !== value) {
        callback(new Error('两次密码输入不一致'));
      } else {
        callback();
      }
    }
  };

  const handleOk = () => {
    message.warning('开发中');
    // passwordForm.validateFields().then(() => {
    //   getPublicKey().then((res) => {
    //     if (res.code != 200 || !res.isSuccess) {
    //       message.error(res.msg);
    //     } else {
    //       let oldPassword = encryptByRSA(
    //         res.data,
    //         passwordForm.getFieldValue('oldPassword'),
    //       );
    //       let newPassword = encryptByRSA(
    //         res.data,
    //         passwordForm.getFieldValue('newPassword'),
    //       );
    //       resetSelfPassword({
    //         oldPassword: oldPassword,
    //         newPassword: newPassword,
    //       }).then((res) => {
    //         // 登录成功，需要重置登录时间
    //         let homePage: string;
    //         if (res.isSuccess) {
    //           let infos = sessionStorage.getItem('userInfo');
    //           let userInfo: any;
    //           if (infos !== 'undefined') {
    //             userInfo = JSON.parse(infos);
    //             homePage = userInfo.pageRouter;
    //           }
    //           loginUpdate(
    //             { lastLoginTime: moment(new Date()).format('YYYY-MM-DD') },
    //             homePage,
    //           ).then((loginRes) => {
    //             if (loginRes.code == 200 && loginRes.isSuccess) {
    //               message.success('修改密码成功，请重新登录！');
    //               setIsModalVisible(false);
    //               passwordForm.resetFields();
    //               const Mgrs = new Mgr();
    //               Mgrs.signOut();
    //             } else {
    //               message.error(res.msg);
    //             }
    //           });
    //         } else {
    //           message.error(res.msg);
    //         }
    //       });
    //     }
    //   });
    // });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    passwordForm.resetFields();
  };

  useEffect(() => {
    setIsModalVisible(props.isFirstLogin);
  }, [props.isFirstLogin]);

  const onItemClick = async (type: Action) => {
    if (onClick && !(await onClick(type))) {
      return;
    }

    switch (type) {
      case 'UserSetting':
        history.push('/setting');
        break;
      case 'UserCenter':
        history.push('/center');
        break;
      case 'ChangePassword':
        setIsModalVisible(true);
        break;
      case 'SignOut':
        Modal.confirm({
          title: 'Login Out',
          icon: <ExclamationCircleOutlined />,
          content: 'Login Out?',
          okText: 'OK',
          cancelText: 'Cancel',
          onOk: async () => {
            console.log('退出登录');
            if (process.env.MEDALENV == 'uat') {
              sessionStorage.setItem('umiToken', '');
              sessionStorage.setItem('authorization', '');
              const result = await getMyIdLoginInfo(process.env.REDIRECT_URL);
              if (result.isSuccess) {
                // 清理session
                axios.defaults.headers.common['umiToken'] =
                  result.data?.umiToken;
                sessionStorage.setItem('umiToken', result.data?.umiToken);
                window.location.href = result.data?.data;
              }
            } else {
              // 此条件找朱磊老板
              const Mgrs = new Mgr();
              Mgrs.getUser().then((res) => {
                authProvider.logout();
              });
            }
          },
          centered: true,
        });
        break;
      default:
        break;
    }
  };
  return {
    formatUserName,
    formatMessage,
    onItemClick,
    isModalVisible,
    handleOk,
    handleCancel,
    passwordForm,
    checkNewPassword,
  };
};

export default usePersonalDropdownService;
