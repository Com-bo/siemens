import React from 'react';

interface ButtonProps {
  /** 属性类型定义，属性说明 */
  text: string;
}

/**  组件简介，描述组件作用，必须要export */
export const Button = (props: ButtonProps) => {
  return <button>{props.text}</button>;
};

Button.defaultProps = {
  text: '默认值',
};
export default Button;
