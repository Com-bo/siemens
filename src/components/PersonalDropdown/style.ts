import { Dropdown, Menu } from 'antd';
import styled from 'styled-components';
export const DropdownWrapper = styled(Dropdown)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
 margin:0 20px;
  img {
    height: 24px;
    margin-right: 9px;
  }
  font-size: 14px;
  .ant-divider{
   border-color:#91a5ac;
  }
`;

export const MenuItemWrapper = styled(Menu.Item)`
  min-width: 160px;
  display: flex;
  align-items: center;
`;
