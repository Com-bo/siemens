import { getFilterGroupFieldList, queryFilterGroupList, saveFilterGroupData } from '@/app/request/common';
import { FilterGroupDiv, TableTitleDiv, TaleTitleIconDiv } from '@/assets/style';
import { ControlOutlined, ExclamationCircleOutlined, PlusCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Modal, Radio, Row, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';


export default (props: any) => {
    const [filterGroup, setFilterGroup] = useState("")
    const [isSetting, setSetting] = useState(false)
    const [operfields, setFields] = useState({})
    const [operList, setOperList] = useState([])
    const [filterGropList, setFilterGroupList] = useState([])

    const { Option } = Select
    const changeFilterGroup = (val) => {
        setFilterGroup(val)
    }
    const [form] = Form.useForm()

    useEffect(() => {
        getFilterGroupFieldList({ moduleName: props.moudleName ?? "Flat Charge" }).then(res => {
            if (res.isSuccess) {
                let _fields = {}
                let data = res.data || []
                data.map(item => {
                    if (!_fields[item.fieldName]) {
                        _fields[item.fieldName] = {
                            fieldName: item.fieldName,
                            fieldDispName: item.fieldDispName,
                            operator: [item.operator]
                        };
                    } else {
                        _fields[item.fieldName]['operator'].push(item.operator)
                    }
                })
                setFields(_fields)

            }
            return queryFilterGroupList({ moduleName: props.moudleName ?? "Flat Charge" })
        }).then(result => {
            if (result.isSuccess) {
                setFilterGroupList(result.data || [])
            }
        })
        form.setFieldsValue({
            groupFieldList: [{ fieldName: '', operator: '', fieldValue: '' }]
        })
    }, [])
    const getFilterOperator = (operator) => {
        switch (operator) {
            // case "Not equal":
            //     return "!="
            // case "Equal to":
            //     return "=";
            // case "Greater than or equal to":
            //     return ">="
            default:
                return operator

        }
    }
    // type=true,新建type=false编辑
    const saveFilterGroup = (type: boolean) => {
        form.validateFields().then(valid => {
            if (!form.getFieldValue("groupName") && type) {
                message.error("New Group is required;")
                return
            }
            if (!form.getFieldValue("id") && !type) {
                message.error("Filter Group is required;")
                return
            }
            let groupFieldList = []
            form.getFieldValue("groupFieldList").map(item => {
                groupFieldList.push({
                    fieldName: item.fieldName,
                    fieldValue: item.fieldValue,
                    operator: item.operator,
                    fieldDispName:operfields[item.fieldName]?.fieldDispName
                })
            })
            const params = {
                filterGroup: {
                    "id": type ? null : form.getFieldValue("id"),
                    "groupName": type ? form.getFieldValue("groupName") : '',
                    "moduleName": props.moudleName,
                    "conditionRelationship": form.getFieldValue("conditionRelationship")
                },
                groupFieldList: groupFieldList
            }
            // console.log(params)
            saveFilterGroupData(params).then(res => {
                if (res.isSuccess) {
                    message.success(res.msg)
                    queryFilterGroupList({ moduleName: props.moudleName ?? "Flat Charge" }).then(result => {
                        if (result.isSuccess) {
                            setFilterGroupList(result.data || [])
                        }
                    })
                } else {
                    message.error(res.msg)
                }
            })
        }).catch(e => { })
    }
    const deleteFilterGroup=()=>{
        Modal.confirm({
            title: "Tips",
            icon: <ExclamationCircleOutlined />,
            content: "Confirm to delete the selected Filter Group?",
            okText: "Confirm",
            cancelText: "Cancel",
            onOk: () => {
                console.log("暂未开发")
            },
            centered: true,
          })
       
    }
    return (
        <>
            <Modal title={<div>
                <TaleTitleIconDiv>
                    <span></span>
                </TaleTitleIconDiv>
                <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>Filter Group</span>
            </div>}
                footer={null} visible={isSetting} onCancel={() => setSetting(false)} width={1000}>
                <Form labelCol={{ span: 4 }} form={form}>
                    <Form.Item
                        label="Filter Group"
                        name="id"
                    >
                        <Select style={{ width: '100%' }}>
                            {filterGropList.map((item, i) => <Option key={i} value={item?.value}>{item?.label}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="New Group"
                        name="groupName"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Filter Type"
                        name="conditionRelationship"
                        rules={[{required:true,message:'Filter Type required'}]}
                    >
                        <Radio.Group >
                            <Radio value="and" key={0}>And</Radio>
                            <Radio value="or" key={1}>Or</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Row>
                        <Form.List name="groupFieldList">
                            {(fields, { add, remove }) => (
                                <>
                                    <Col span={19} offset={4} >
                                        {fields.map(({ name }, index) => (
                                            <Row gutter={20} key={index}>
                                                <Col span={6}>
                                                    <Form.Item name={[name, "fieldName"]}  rules={[{required:true,message:'Field Name required'}]}>
                                                        <Select style={{ width: "100%" }} allowClear onChange={(val: string) => {
                                                            if (val) {
                                                                setOperList(operfields[val]?.operator || [])
                                                            } else {
                                                                setOperList([])
                                                            }
                                                        }}>
                                                            {Object.keys(operfields).map((item: string, _index) => <Option key={_index} value={item}>{operfields[item]?.fieldDispName}</Option>)}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item name={[name, "operator"]} rules={[{required:true,message:'Operator required'}]} >
                                                        <Select style={{ width: "100%" }} allowClear>
                                                            {operList?.map((item, _i) => <Option key={_i} value={item}>{getFilterOperator(item)}</Option>)}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={10}>
                                                    <Form.Item name={[name, "fieldValue"]} rules={[{required:true,message:'Field Value required'}]} >
                                                        <Input style={{ width: "100%" }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={1}>
                                                    <Form.Item >
                                                        <Button icon={<i className='gbs gbs-delete'></i>} type="text" onClick={() => {
                                                            if (index != 0) {
                                                                remove(name)
                                                            } else {
                                                                if (fields.length == 1) {
                                                                    message.warning("Keep at least one record")
                                                                }
                                                            }
                                                        }}></Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>))}
                                    </Col>
                                    <Col span={1}>
                                        <Button icon={<PlusCircleOutlined />} type="text" onClick={add}></Button>
                                    </Col>
                                </>
                            )}
                        </Form.List>
                    </Row>
                    <Form.Item style={{ textAlign: 'center', margin: "20px" }}>
                        <Space size={[20, 20]}>
                            <Button type="primary" onClick={() => saveFilterGroup(false)}>Save</Button>
                            <Button type="primary" onClick={() => saveFilterGroup(true)}>New Group</Button>
                            <Button  onClick={deleteFilterGroup} >Delete</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            <FilterGroupDiv id="filterGroup">
                <label>Filter Group:</label>
                <Select style={{ minWidth: "300px" }} onChange={changeFilterGroup} allowClear>
                    {filterGropList.map((item, i) => <Option key={i} value={item?.value}>{item?.label}</Option>)}
                </Select>
                <Space size={10}>
                    {props?.customComponet}
                    <Button type="primary" icon={<i className="gbs gbs-search"></i>} onClick={() => props.onSearch(filterGroup)} ></Button>
                    <Button icon={<i className="gbs gbs-setting"></i>} onClick={() => {
                        form.resetFields();
                        form.setFieldsValue({
                            groupFieldList: [{ fieldName: '', operator: '', fieldValue: '' }]
                        })
                        setSetting(true)
                    }}></Button>
                    <Button icon={<i className="gbs gbs-export"></i>} onClick={props.exportAction}></Button>
                </Space>
            </FilterGroupDiv>
        </>
    )
}
