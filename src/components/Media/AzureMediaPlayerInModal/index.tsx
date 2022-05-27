import { Modal } from 'antd';
import React from 'react';
import { IAzureMPInModalService } from './useAzureMPInModalService';
import { AzureMP } from 'react-azure-mp';
import styled from 'styled-components';

const AzrueMPModal = styled(Modal)`
  width: 66vw !important;
`;

const ModalMediaPlayer = (props: { service: IAzureMPInModalService }) => {
  const { modal, setmodal, formatMessage } = props.service;

  return (
    <AzrueMPModal
      title={formatMessage('云媒体详情')}
      visible={modal.visible}
      onCancel={() => {
        setmodal((prev) => {
          return { ...prev, visible: false };
        });
      }}
      footer={null}
      centered
      maskClosable={false}
    >
      <AzureMP
        skin="amp-flush"
        src={[
          {
            src: modal.src,
            type: 'application/vnd.ms-sstr+xml',
          },
        ]}
      />
    </AzrueMPModal>
  );
};
export default ModalMediaPlayer;
