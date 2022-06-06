import { FilterGroupDiv, TableTitleDiv, TaleTitleIconDiv } from '@/assets/style';
import { PlusCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Radio, Row, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';


export default (props: any) => {
    const [filterGroup, setFilterGroup] = useState("")
    const [isSetting, setSetting] = useState(false)
    const { Option } = Select
    const changeFilterGroup = (val) => {
        setFilterGroup(val)
    }
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            logicList: [{ name: '', logic: '', logicContent: '' }]
        })
    }, [])
    return (
        <>
            <Modal title={<div>
                <TaleTitleIconDiv>
                    <span></span>
                </TaleTitleIconDiv>
                <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>Filter Group</span>
            </div>} footer={null} visible={isSetting} onCancel={() => setSetting(false)} width={1000}>
                <Form labelCol={{ span: 4 }} form={form}>
                    <Form.Item
                        label="Filter Group"
                        name="FilterGroup"
                    >
                        <Select style={{ width: '100%' }}>

                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="New Group"
                        name="newGroup"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Filter Type"
                        name="filterType"
                    >
                        <Radio.Group >
                            <Radio value="and">And</Radio>
                            <Radio value="or">Or</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Row>

                        <Form.List name="logicList">
                            {(fields, { add, remove }) => (
                                <>
                                    <Col span={19} offset={4}>
                                        {fields.map(({ name }, index) => (
                                            <Row gutter={20}>
                                                <Col span={6}>
                                                    <Form.Item name={[name, "name"]} >
                                                        <Select style={{ width: "100%" }} allowClear>
                                                            {props.fields.map((item, index) => <Option key={index} value={item.name}>{item.title}</Option>)}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item name={[name, "logic"]} >
                                                        <Select style={{ width: "100%" }} allowClear>
                                                            <Option value="contains">Contains</Option>
                                                            <Option value="gt">&gt;</Option>
                                                            <Option value="gt eq">&gt;=</Option>
                                                            <Option value="eq">=</Option>
                                                            <Option value="lt eq">&lt;=</Option>
                                                            <Option value="lt">&lt;</Option>
                                                            <Option value="begin with">Begin With</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={10}>
                                                    <Form.Item name={[name, "logicContent"]} >
                                                        <Input style={{ width: "100%" }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={1}>
                                                    {index != 0 ?
                                                        <Form.Item >
                                                            <Button icon={<i className='gbs gbs-delete'></i>} type="text" onClick={() => remove(name)}></Button>
                                                        </Form.Item> : ''
                                                    }
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
                            <Button type="primary" onClick={props.onSaveFilterGroup}>Save</Button>
                            <Button type="primary" onClick={props.onSaveFilterGroup}>New Group</Button>
                            <Button >Delete</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            <FilterGroupDiv id="filterGroup">
                <label>Filter Group:</label>
                <Select value={filterGroup} onChange={changeFilterGroup}>
                    <Option value="">Default</Option>
                </Select>
                <Space size={10}>
                    {props?.customComponet}
                    <Button type="primary" icon={<i className="gbs gbs-search"></i>} onClick={props.onSearch} ></Button>
                    <Button icon={<i className="gbs gbs-setting"></i>} onClick={() => setSetting(true)}></Button>
                    <Button icon={<i className="gbs gbs-export"></i>}></Button>
                </Space>
            </FilterGroupDiv>
        </>
    )
}
