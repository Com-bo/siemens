import * as React from 'react';
import styled from 'styled-components';

export type ITextIconProps = {
  /** icon内容 - 两个符号为最佳体验 */
  text: string;
  /** 是否选中并高亮显示 */
  isSelected?: boolean;
};

const IconWrapper = styled.div<{ isSelected: boolean }>`
  font-size: 10px;
  width: 18px;
  height: 20px;
  display: inline-block;
  margin-right: 5px;
  text {
    fill: ${(props) =>
      props.isSelected ? props.theme['com-texticon-highlight-color'] : ''};
  }
`;

/**
 * 文字图标组件提供以下服务：<br/>
 * 1、将传入的字体格式成icon<br/>
 * 2、字体大小突破浏览器限制的12px<br/>
 *
 * @param {ITextIconProps} props
 * @author: Phoebe.Lv
 */
export const TextIcon = (props: ITextIconProps) => {
  return (
    <IconWrapper isSelected={props.isSelected}>
      <svg width="100%" height="100%">
        <text x="5%" y="70%" fill="#000" text-anchor="left">
          {props.text}
        </text>
      </svg>
    </IconWrapper>
  );
};

TextIcon.defaultProps = {
  isSelected: false,
};
export default TextIcon;
