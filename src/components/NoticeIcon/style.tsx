import { BellOutlined } from '@ant-design/icons';
import { Badge, Dropdown } from 'antd';
import styled from 'styled-components';

export const BellIcon = styled(BellOutlined)`
  padding: 4px;
  vertical-align: middle;
`;

export const NoticeBadge = styled(Badge)`
  box-shadow: none;
  font-size: 16px;
`;
export const DropdownWrapper = styled(Dropdown)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
