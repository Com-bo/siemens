import React, { useState } from 'react';
import { decodeHtml } from '@/tools/utils';
import { Modal, Button, Table } from 'antd';
import { FormTableDiv } from '@/assets/style';
import moment from 'moment';
export default (props: any) => {
  // 备注弹框内容
  const [remarksText, setRemarksText] = useState('');
  // 处理记录的备注说明对话框
  const [isRemarksVisible, setIsRemarksVisible] = useState(false);
  const dealColumns: any = [
    {
      title: '序号',
      width: 100,
      align: 'center',
      render: (text, row, index) => {
        return index + 1;
      },
    },
    {
      title: '处理步骤',
      dataIndex: 'dealStepName',
      align: 'center',
      key: 'dealStepName',
      width: 140,
      render: (text) => {
        return <span style={{ color: '#009999' }}>{text}</span>;
      },
    },
    {
      title: '处理人',
      dataIndex: 'dealUserTrueName',
      align: 'center',
      key: 'dealUserTrueName',
      ellipsis: true,
    },
    {
      title: '处理日期',
      dataIndex: 'dealDt',
      align: 'center',
      width: 180,
      key: 'dealDt',
      render: (text) => {
        return text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : '';
      },
    },
    {
      title: '处理操作',
      dataIndex: 'dealStatusName',
      align: 'center',
      key: 'dealStatusName',
    },
    {
      title: '备注说明',
      dataIndex: 'remarks',
      align: 'center',
      key: 'remarks',
      ellipsis: true,
      render: (text, record) => {
        if (!text) {
          return '/';
        }
        return record.dealStep == 'StepUploadConfirm' ? (
          <Button
            type="link"
            onClick={() => {
              setRemarksText(decodeHtml(text));
              setIsRemarksVisible(true);
            }}
          >
            查看备注
          </Button>
        ) : (
          text
        );
      },
    },
  ];

  return (
    <>
      <Modal
        title="备注说明"
        visible={isRemarksVisible}
        footer={null}
        onCancel={() => setIsRemarksVisible(false)}
        wrapClassName="remarkModalClass"
      >
        <div
          dangerouslySetInnerHTML={{ __html: remarksText }}
          style={{ overflowX: 'auto' }}
        ></div>
      </Modal>
      <FormTableDiv>
        <Table
          rowClassName={(record, index) => (index % 2 == 0 ? '' : 'stripe')}
          style={{ width: '100%' }}
          dataSource={props.dealList.map((item) => {
            return {
              ...item,
              key: Math.random(),
            };
          })}
          key="key"
          pagination={false}
          columns={dealColumns}
        />
      </FormTableDiv>
    </>
  );
};
