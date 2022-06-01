import React, { useEffect, useState } from 'react';
import TableMix from '@/components/Table'
import { Button, Divider, Form, Input, InputNumber, Select, Space } from 'antd';
import { TableBtnDiv, TableTitleDiv, TableTopDiv, TaleTitleIconDiv } from '@/assets/style';
import { TableMixDiv } from './tablemix'
import { TrademarkOutlined } from '@ant-design/icons';
export default (props: any) => {
    const [columns, setColumns] = useState([])
    const [form] = Form.useForm();
    const getcolumnItem = (col: any) => {

        return {
            title: <div className={props.search ? "listSearch" : 'hiddenlistSearch'}>
                <div className="title">{col.title}</div>
                <Form.Item>
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
    const changeSize = (pageSize: number) => {
        console.log(pageSize)
    }
    useEffect(() => {
        setColumns(generateColumns(props.columns))
    }, [props.search])
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
                    <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>{props.listName} List</span>
                </TableTitleDiv>
                <TableBtnDiv>
                    {props.renderBtns}
                </TableBtnDiv>
            </TableTopDiv>
            {/* table 数据组 */}
            <Form form={form}>
                <TableMix onChange={(selectedRowKeys, selectedRows) => props.onChange(selectedRowKeys, selectedRows)} data={props.data} columns={columns} handlePageSize={changeSize} total={0} current={1} rowKey={props.rowKey} selection={true} pagination={true}/>
            </Form>
        </TableMixDiv>);

};
