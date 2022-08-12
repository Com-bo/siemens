import React, { useEffect, useState } from 'react';
import TableMix from '@/components/Table';
import {
  Button,
  Divider,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Select,
  Space,
} from 'antd';
import {
  TableBtnDiv,
  TableTitleDiv,
  TableTopDiv,
  TaleTitleIconDiv,
} from '@/assets/style';
import { TableMixDiv } from './tablemix';
interface TableMixType {
  headerSearch?: any;
  search?: boolean;
  renderFilterGroup?: React.ReactNode;
  columns: any[];
  listName: string; //表格名称
  renderBtns?: React.ReactNode; //按钮组
  rowClick?: (record: any) => void; //行内点击事件
  scrollY?: string;
  scrollX?: string;
  form?: FormInstance; //行内form
  changePageSize?: (pageSize: number) => void; //页size变化
  onPageChange: (
    pagination: any,
    filters: any,
    {
      column,
      columnKey,
      field,
      order,
    }: { column: any; columnKey: any; field: any; order: any },
    { currentDataSource, action }: { currentDataSource: any; action: any },
  ) => void; //页码变化
  onChange?: (selectedRowKeys, selectedRows) => void; //selection变化
  selection?: boolean; //是否是可选择table，默认可选
  data: any[]; //table的数据
  selectedRowKeys?: any[];
  total: number;
  current: number;
  rowKey: string;
  type?: 'checkbox' | 'radio';
}
export default (props: TableMixType) => {
  // const [scrollY, setScrollY] = useState<any>(0);
  const [columns, setColumns] = useState([]);
  const getcolumnItem = (col: any) => {
    return {
      title: (
        <div className={props.search ? 'listSearch' : 'hiddenlistSearch'}>
          <div className="title">{col.title}</div>
          {col.name == 'Operate' || !col.titleRender ? (
            <Form.Item></Form.Item>
          ) : (
            <Form.Item name={col.name}>
              {getSearchInputType(col.titleRender)}
            </Form.Item>
          )}
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

  const getSearchInputType = (text?: string) => {
    switch (text) {
      case 'input':
        return <Input onClick={(e) => e.stopPropagation()} />;
      case 'number':
        return <InputNumber />;
      default:
        return '';
    }
  };
  // orignalColsObject{name:'',title:''}
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
      {/* table 过滤组 */}
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
          scrollY={props.scrollY || 'calc(100vh - 471px)'}
          handlePageSize={props.changePageSize}
          onPageChange={props.onPageChange}
          onChange={(selectedRowKeys, selectedRows) =>
            props.onChange(selectedRowKeys, selectedRows)
          }
          {...props}
          columns={columns}
          selection={props.selection ?? true}
          pagination={true}
        />
      </Form>
    </TableMixDiv>
  );
};
