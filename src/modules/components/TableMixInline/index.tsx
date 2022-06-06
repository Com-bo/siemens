import React, { useEffect, useState } from 'react';
import TableMix from '@/components/Table'
import { Button, Divider, Form, Input, InputNumber, Select, Space } from 'antd';
import { TableBtnDiv, TableTitleDiv, TableTopDiv, TaleTitleIconDiv } from '@/assets/style';
import { TableMixDiv } from './tablemix'
import { TablePaginationConfig } from 'antd/es/table/interface';
export default (props: any) => {
    // const [scrollY, setScrollY] = useState<any>(0);
    const [columns, setColumns] = useState([])
    const [pageSize, setPageSize] = useState(20)

    const getcolumnItem = (col: any) => {

        return {
            title: <div className={props.search ? "listSearch" : 'hiddenlistSearch'}>
                <div className="title">{col.title}</div>
                <Form.Item name={col.name}>
                    {getSearchInputType(col.titleRender)}
                </Form.Item>
            </div>,
            align: 'center',
            dataIndex: col.name,
            key: col.name,
            width: col.width,
            render: col.render,
            fixed: col.fixed
        }

    }

    const getSearchInputType = (text?: string) => {
        switch (text) {
            case "input":
                return <Input />
            case "number":
                return <InputNumber />
            default:
                return ''
        }
    }
    // orignalColsObject{name:'',title:''}
    const generateColumns = (orignalColsObject: any) => {
        let arr = []
        orignalColsObject.forEach(element => {
            arr.push(getcolumnItem(element))
        });
        return arr
    }
    // 页码更新  

    useEffect(() => {
        setColumns(generateColumns(props.columns))
    }, [props.search])
    return (
        <TableMixDiv status={props.search}  >
            {/* table 过滤组 */}
            {props.renderFilterGroup}
            {/* table 按钮组 */}
            <TableTopDiv>
                <TableTitleDiv style={{ float: 'left' }}>
                    <TaleTitleIconDiv>
                        <span></span>
                    </TaleTitleIconDiv>
                    <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>{props.listName} List</span>
                </TableTitleDiv>
                <TableBtnDiv>
                    {props.renderBtns}
                </TableBtnDiv>
            </TableTopDiv>
            {/* table 数据组 */}
            <Form form={props.form}>
                <TableMix scrollY={'calc(100vh - 500px)'} handlePageSize={props.changePageSize} onPageChange={props.onPageChange} onChange={(selectedRowKeys, selectedRows) => props.onChange(selectedRowKeys, selectedRows)} data={props.data} columns={columns} total={props.total} current={props.current} pageSize={pageSize} rowKey={props.rowKey} selection={true} pagination={true} />
            </Form>
        </TableMixDiv>);

};
