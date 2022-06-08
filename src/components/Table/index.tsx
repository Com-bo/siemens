import React, { useEffect, useRef, useState } from 'react';
import { Input, Select, Table, TablePaginationConfig } from 'antd';
// import styles from './style.less';
import { TableMixDiv } from './style';
interface TableOptions {
  columns: Array<any>; //列
  data: Array<any>; //table 数据
  total?: number;
  pageSize?: number;
  selection?: boolean;
  selectedRowKeys?: Array<any>;
  current?: number;
  rowKey?: string;
  scrollY?: string | number;
  onPageChange?: (
    pagination: any, filters: any, sorter: any, extra: any
  ) => void;
  handlePageSize?: (val: number) => void
  tableHeight?: any; //table高度
  onChange?: (selectedRowKeys, selectedRows) => void,
  pagination?: boolean;
  rowClick?: (record: Object) => void;

}

export default (_props: TableOptions) => {
  const [_pageSize, setPageSize] = useState(20);


  return (
    <TableMixDiv>
      <Table
        dataSource={_props.data}
        rowSelection={_props.selection ? {
          selectedRowKeys: _props.selectedRowKeys||[],
          onChange: (selectedRowKeys, selectedRows) => {
            _props.onChange(selectedRowKeys, selectedRows)
          }
        } : undefined}
        columns={_props.columns}
        onRow={record => {
          return {
            onClick: event => {
              _props.rowClick && _props.rowClick(record)
            }, // 点击行
          };
        }}
        rowClassName={(record, index) => (index % 2 == 0 ? '' : 'stripe')}
        pagination={_props.pagination ? {
          total: _props.total,
          current: _props.current,
          pageSize: _pageSize,
          showTotal: (total) => {
            return <>
              <span className="total">Total: <strong>{total}</strong></span>
              <label>Items</label>
              <Select value={_pageSize} onChange={(val) => {
                setPageSize(val)
                _props.handlePageSize(val)
              }}>
                {
                  [10, 20, 30, 40, 50].map(v => {
                    return <Select.Option value={v} key={v}>{v}</Select.Option>
                  })
                }

              </Select>
            </>
          },
        } : false}
        rowKey={_props.rowKey}
        scroll={{ x: 1000, y: _props.scrollY ?? null }}
        onChange={_props.onPageChange}

      />
    </TableMixDiv>
  );
};
