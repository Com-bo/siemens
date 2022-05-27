import React, { useEffect } from 'react';
import { Form, Select, Input, Row, Col, Button, Table, DatePicker } from 'antd';

interface propClass {
  orderNo?: string;
}

const index = (props: propClass) => {
  useEffect(() => {
    if (props.orderNo) {
    }
  }, [props.orderNo]);

  //列字段
  const columns: any = [
    {
      title: '序号',
      render: (text, row, index) => {
        return index + 1;
      },
    },
    {
      title: '处理步骤',
      dataIndex: 'dealStepName',
      key: 'dealStepName',
    },
    {
      title: '处理人',
      dataIndex: 'dealUser',
      key: 'dealUser',
    },
    {
      title: '处理日期',
      dataIndex: 'dealDt',
      key: 'dealDt',
    },
    {
      title: '备注说明',
      dataIndex: 'remarks',
      key: 'remarks',
    },
  ];

  return (
    <>
      <Table columns={columns} />
    </>
  );
};

export default index;
