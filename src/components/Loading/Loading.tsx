import * as React from 'react';
import { Modal, Spin } from 'antd';
export interface ILoadingProps {
  visible?: boolean;
  children?: any;
}

import styled from 'styled-components';

const LoadingModal = styled(Modal)`
  .ant-modal-content {
    background-color: transparent !important;
    box-shadow: none !important;
  }
`;
const LoadingSpinner = styled(Spin)`
  width: 100px !important;
  min-height: 50px !important;
  max-height: 50px !important;
  background: none !important;
  -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0) !important;
  box-shadow: none !important;
  position: fixed !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export interface ILoading extends React.SFC<ILoadingProps> {
  show?: () => void;
  hide?: () => Promise<any>;
  hideAll?: () => void;
}

export let Loading: ILoading = (props: ILoadingProps) => {
  return (
    <LoadingModal
      visible={props.visible === undefined ? true : props.visible}
      footer={null}
      closable={false}
      centered
      zIndex={9999}
    >
      <LoadingSpinner size={'large'} key="loading" />
    </LoadingModal>
  );
};

Loading.show = null;
Loading.hide = null;
Loading.hideAll = null;

export default Loading;
