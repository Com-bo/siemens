import React, { useEffect, useRef, useState } from 'react';
import { Input, Select, Table, TablePaginationConfig } from 'antd';
// import styles from './style.less';
import { TableMixDiv } from './style';
interface TableOptions {
  columns: Array<any>; //列
  data: Array<any>; //table 数据
  total: number;
  current: number;
  rowKey?: string;
  onPageChange?: (
    pagination: TablePaginationConfig,
  ) => void;
  handlePageSize: (val: number) => void
  tableHeight?: any; //table高度
}

export default (_props: TableOptions) => {
  const [pageSize, setPageSize] = useState(20);

  // 获取元素的thead
  useEffect(() => {


  }, [])
  return (
    <TableMixDiv >
      <Table
        dataSource={_props.data}
        columns={_props.columns}
        rowClassName={(record, index) => (index % 2 == 0 ? '' : 'stripe')}
        pagination={{
          total: _props.total,
          current: _props.current,
          showTotal: (total) => {
            return <>
              <span className="total">Total: <strong>{total}</strong></span>
              <label>Items</label>
              <Select value={pageSize} onChange={(val) => {
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
        }}
        rowKey={_props.rowKey}
        scroll={{ x: 1000 }}
        onChange={_props.onPageChange}

      />
    </TableMixDiv>
  );
};
