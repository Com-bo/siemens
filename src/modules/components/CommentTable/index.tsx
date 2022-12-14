import React, { useEffect, useState } from 'react';
import TableMix from '@/components/Table';
import { Button, Divider, Form, Input, InputNumber, Select, Space } from 'antd';
import {
  TableBtnDiv,
  TableTitleDiv,
  TableTopDiv,
  TaleTitleIconDiv,
} from '@/assets/style';
import { TableMixDiv } from './tablemix';
export default (props: any) => {
  // const [scrollY, setScrollY] = useState<any>(0);
  const [columns, setColumns] = useState([]);
  const getcolumnItem = (col: any) => {
    return {
      title: (
        <div style={{ padding: '10px 0' }}>
          <div className="title">{col.title}</div>
        </div>
      ),
      align: 'center',
      dataIndex: col.name,
      key: col.name,
      width: col.width || '100px',
      render: col.render,
      fixed: col.fixed,
      sorter: col.sorter || null,
    };
  };
  const generateColumns = (orignalColsObject: any) => {
    let arr = [];
    orignalColsObject.forEach((element) => {
      arr.push(getcolumnItem(element));
    });
    return arr;
  };
  // 页码更新

  useEffect(() => {
    setColumns(generateColumns(props.columns));
  }, [props.search]);
  return (
    <TableMixDiv status={props.search}>
      {props.renderFilterGroup}
      {/* table 按钮组 */}
      <TableTopDiv>
        <TableTitleDiv style={{ float: 'left' }}>
          <TaleTitleIconDiv>
            <span></span>
          </TaleTitleIconDiv>
          <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
            {props.listName} List
          </span>
        </TableTitleDiv>
        <TableBtnDiv>{props.renderBtns}</TableBtnDiv>
      </TableTopDiv>
      {/* table 数据组 */}
      <Form form={props.form}>
        <TableMix
          rowClick={(record) => props.rowClick && props.rowClick(record)}
          scrollY={props.scrollY || 'calc(100vh - 495px)'}
          handlePageSize={props.changePageSize}
          onPageChange={props.onPageChange}
          onChange={(selectedRowKeys, selectedRows) =>
            props.onChange(selectedRowKeys, selectedRows)
          }
          {...props}
          columns={columns}
          pagination={true}
        />
      </Form>
    </TableMixDiv>
  );
};
