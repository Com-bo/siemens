import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
// import 'antd/dist/antd.css';
import { TooltipProps } from 'antd/lib/tooltip';
import * as React from 'react';
import styled from 'styled-components';

export type IMedalsoftHelperProps = {
  /** 操作指引下载地址 */
  url: string;
  /**render ,默认icon 可自定义 */
  render?: React.ReactNode;
  /**title tooltip提示语 */
  title?: string;
  /** tooltip额外拓展位 */
  tooltipProps?: TooltipProps;
};
export const HelperDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
/**
 * <a href="https://preview.pro.ant.design/dashboard/analysis?primaryColor=%231890ff&fixSiderbar=true&colorWeak=false&pwa=false/">👉参考UI</a>
 * <hr/>
 * 功能点：<br/>
 * Icon自定义<br/>
 * 下拉菜单附带：<br/>
 * 1、操作文档（点击下载）<br/>123
 * 2、人机交互操作指引唤醒入口（6月底暂不实现）<br/>
 *
 * @param {IMedalsoftHelperProps} props
 * @author: 耀军
 */
export const MedalsoftHelper = (props: IMedalsoftHelperProps) => {
  const { url, render, tooltipProps = {}, title } = props;
  return (
    <Tooltip {...tooltipProps} title={title}>
      <HelperDiv onClick={() => url && window.open(url)}>
        {render ?? <QuestionCircleOutlined />}
      </HelperDiv>
    </Tooltip>
  );
};

MedalsoftHelper.defaultProps = {
  title: '操作指引',
  url: 'https://www.medalsoft.com/zh-cn/',
};
export default MedalsoftHelper;
