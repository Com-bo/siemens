import React, { useEffect, useState } from 'react';
import TableMix from '@/components/Table'
import { Button, Divider, Form, Input, Select, Space } from 'antd';
import { FilterGroupDiv, TableBtnDiv, TableTitleDiv, TableTopDiv, TaleTitleIconDiv } from '@/assets/style';
import { SettingOutlined } from '@ant-design/icons';
export default (props: any) => {
    const [columns, setColumns] = useState([])
    const [form] = Form.useForm();
    const getcolumnItem = (col: any) => {
        if (col.name == "Operate") {
            return {
                title: <>
                    <div className="title">{col.title}</div>
                    <Form.Item>
                    </Form.Item>
                </>,
                align: 'center',
                dataIndex: col.name,
                key: col.name,
                width: col.width,
                render: props.renderOper,
                fixed: "right"
            }
        }
        return {
            title: <>
                <div className="title">{col.title}</div>
                <Form.Item name={col.name}>
                    <Input />
                </Form.Item>
            </>,
            align: 'center',
            width: col.width,
            dataIndex: col.name,
            key: col.name
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
    }, [])
    return (
        <>
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
                <TableMix data={props.data} columns={columns} handlePageSize={changeSize} total={0} current={1} rowKey={props.rowKey} />
            </Form>
        </>);

};
