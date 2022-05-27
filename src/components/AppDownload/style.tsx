import { Popover } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  div {
    position: relative;
    text-align: center;
    &:not(:first-child) {
      margin-left: 16px;
    }
    img {
      display: block;
      width: 150px;
    }
    a {
      display: block;
    }
  }
  &:hover {
    img:not(:hover) {
      opacity: 0.1;
    }
    canvas:not(:hover) {
      opacity: 0.1;
    }
  }
`;
export const PopoverWrapper = styled(Popover)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
