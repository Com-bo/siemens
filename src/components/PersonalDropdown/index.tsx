import {
  DownOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
// import Dropdown from '@ant-design/pro-table/lib/components/Dropdown';
import { Menu, Space, Dropdown, Modal, Form, Input, Divider } from 'antd';
// import 'antd/dist/antd.css';
import { DropDownProps } from 'antd/lib/dropdown/index';
import * as React from 'react';
import { DropdownWrapper, MenuItemWrapper } from './style';
import usePersonalDropdownService, {
  IFormatMessage,
} from './usePersonalDropdownService';

export type Action =
  | 'UserSetting'
  | 'UserCenter'
  | 'ChangePassword'
  | 'SignOut';
export type IMedalsoftPersonDropdownProps = {
  /** 用户头像的文件地址/Base64Url，不传使用默认头像,图片来自数据库则在业务层使用Image服务转化 */
  avatar?: string;
  /** 用户名 */
  userName?: string;

  /** 用户名最大长度，超出... */
  maxUserNameLength?: number;
  /** 是否显示退出登录按钮, 默认为显示 */
  showSignOut?: boolean;
  /** dropdown content render函数，支持复写默认样式 */
  contentRender?: (defaultDoms: {
    // /** 个人中心 */
    // UserCenter: React.ReactNode;
    // /** 个人设置 */
    // UserSetting: React.ReactNode;
    /** 修改密码 */
    ChangePassword: React.ReactNode;
  }) => React.ReactNode[];

  /** 返回boolean，觉得是否执行默认的事件 */
  onClick?: (action: Action) => Promise<boolean>;
  /** 多语言格式化 */
  formatMessage?: IFormatMessage;

  /* 是否是第一次登录 */
  isFirstLogin?: boolean;
  /* 用户类型 */
  userType?: string;
} & Omit<DropDownProps, 'overlay'>;



/**
 * <a href='https://preview.pro.ant.design/dashboard/analysis?primaryColor=%231890ff&fixSiderbar=true&colorWeak=false&pwa=false' target='_blank'>👉参考UI</a>
 * <hr/>
 * 1、顶栏显示：头像/默认图标+用户名（显示最大20字符，溢出裁切）<br/>
 * 2、hover下拉带单<br/>
 * 3、菜单默认包含以下内容，支持拓展其他菜单<br/>
 * 3.1、个人设置 - 对接标准化页面个人设置：基本信息、区域化设置（时间日期格式控制，数字格式控制等）<br/>
 * 3.2、退出登录<br/>
 *
 * @param {MedalsoftPersonDropdown} props
 * @author: 康锐
 */
export const MedalsoftPersonDropdown = (
  props: IMedalsoftPersonDropdownProps,
) => {
  const {
    showSignOut,
    userName,
    avatar,
    contentRender,
    isFirstLogin,
    userType,
  } = props;
  const {
    formatUserName,
    formatMessage,
    onItemClick,
    isModalVisible,
    handleOk,
    handleCancel,
    passwordForm,
    checkNewPassword,
  } = usePersonalDropdownService(props);

  // /** 个人中心节点 */
  // const UserCenter = (
  //   <MenuItemWrapper key="UserCenter" onClick={() => onItemClick('UserCenter')}>
  //     <UserOutlined />
  //     {formatMessage('个人中心')}
  //   </MenuItemWrapper>
  // );
  // /** 个人设置节点 */
  // const UserSetting = (
  //   <MenuItemWrapper
  //     key="UserSetting"
  //     onClick={() => onItemClick('UserSetting')}
  //   >
  //     <SettingOutlined />
  //     {formatMessage('个人设置')}
  //   </MenuItemWrapper>
  // );

  // 修改密码
  const ChangePassword =

    <MenuItemWrapper
      key="ChangePassword"
      onClick={() => onItemClick('ChangePassword')}
    >
      <UserOutlined />
      {formatMessage('修改密码')}
    </MenuItemWrapper>


  return (
    <DropdownWrapper>
      <Space size={'small'}>
        <span >Welcome！</span>
        <Divider type="vertical" />
        <QuestionCircleOutlined />
        <Divider type="vertical" />
        <Dropdown
          trigger={['hover']}
          {...props}
          overlay={
            <Menu>
              {/* {contentRender?.({ UserCenter, UserSetting }).map((item) => (
              <MenuItemWrapper>{item}</MenuItemWrapper>
            )) ?? [UserCenter, UserSetting]} */}
              {/* {contentRender?.({ ChangePassword }).map((item) => (
              <MenuItemWrapper>{item}</MenuItemWrapper>
            )) ?? [ChangePassword]} */}
              {showSignOut && (
                <>
                  {/* <Menu.Divider /> */}
                  <Menu.Item key="SignOut" onClick={() => onItemClick('SignOut')}>
                    <LogoutOutlined />
                    Login Out
                  </Menu.Item>
                </>
              )}
            </Menu>
          }
        >
          <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {/* <Tooltip placement="bottom" title={userName}> */}
              <span>
                {formatUserName(userName)}{' '}
                <DownOutlined style={{ fontSize: '10px' }} />
              </span>
          </span>
          {/* </Tooltip> */}
        </Dropdown>
      </Space>
      <Modal
        title="Change Password"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ flex: '100px' }}
          wrapperCol={{ flex: 'auto' }}
          labelAlign="left"
          form={passwordForm}
        >
          <Form.Item
            name="oldPassword"
            label="原密码"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true },
              {
                validator: (rule, value, callback) => {
                  checkNewPassword(rule, value, callback);
                },
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="新密码确认"
            rules={[
              { required: true },
              {
                validator: (rule, value, callback) => {
                  checkNewPassword(rule, value, callback);
                },
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </DropdownWrapper>
  );
};
export default MedalsoftPersonDropdown;

const defaultProps: IMedalsoftPersonDropdownProps = {
  placement: 'bottomLeft',
  showSignOut: true,
  maxUserNameLength: 20,
};

MedalsoftPersonDropdown.defaultProps = defaultProps;
