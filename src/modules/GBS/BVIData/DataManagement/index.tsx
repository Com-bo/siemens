import React, { useEffect, useState } from 'react';
import TableList from '@/modules/components/TableMixInline'
import { Button, Divider, Dropdown, Menu, Modal, Popconfirm, Space, Table, Form, message, Input, Row, Col, Radio, Upload } from 'antd';
import { DownOutlined, EditOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { BtnTextRedWrap, BtnBlueWrap, BtnGreenWrap, BtnOrangeWrap, BtnThemeWrap, TableTopDiv, TableTitleDiv, TaleTitleIconDiv, TableWrapDiv } from '@/assets/style';
import search from '@/assets/images/search.png'
import FilterGroup from '@/modules/components/FilterGroup'
import { objectToFormData } from '@/tools/utils'
import {
  importDataSave
} from '@/app/request/apiBVI'
export default (props: any) => {

  const [tableData, setTableData] = useState([])
  const [isSearch, setIsSearch] = useState(true)
  const [isCheckOriginal, setIsCheckOriginal] = useState(false)
  const [checkData, setCheckData] = useState([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [pageSize, setPageSize] = useState(20)
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [showBviData, setShowBviData] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [form] = Form.useForm();

  const [formData] = Form.useForm();
  const [formImport] = Form.useForm();

  const getCheckOriginalData = () => {
    setIsCheckOriginal(true)
    setCheckData([{
      id: 1,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 2,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 3,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 4,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 5,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 6,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 7,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 8,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 9,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 10,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 11,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 12,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    }])
  }
  const columns: any = [{
    title: 'Business Line',
    dataIndex: 'BusinessLine',
    key: 'BusinessLine',
    align: 'center',
  }, {
    title: 'ARE',
    dataIndex: 'ARE',
    key: 'ARE',
    align: 'center',
  }, {
    title: 'Company Code',
    dataIndex: 'CompanyCode',
    key: 'CompanyCode',
    align: 'center',
  }, {
    title: 'Customer Devision',
    dataIndex: 'CustomerDevision',
    key: 'CustomerDevision',
    width: '160px',
    align: 'center',
  }, {
    title: 'Cost Center',
    dataIndex: 'CostCenter',
    key: 'CostCenter',
    align: 'center',
  }, {
    title: 'Cost Location',
    dataIndex: 'CostLocation',
    key: 'CostLocation',
    align: 'center',
  }, {
    title: 'Product Name',
    dataIndex: 'ProductName',
    key: 'ProductName',
    align: 'center',
  }, {
    title: 'Error Message',
    dataIndex: 'ErrorMessage',
    key: 'ErrorMessage',
    align: 'center',
    render: (text) => <span style={{ color: "red" }}>{text}</span>
  }]
  const orignalCols = [{
    name: 'BusinessLine',
    title: 'Business Line',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'ARE',
    title: 'ARE',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'BillingARE',
    title: 'Billing ARE',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'CompanyCode',
    title: 'Company Code',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'CustomerDevision',
    title: 'Customer Devision',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'CostCenter',
    title: 'Cost Center',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'BillingCostCenter',
    title: 'Billing Cost Center',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'ProductName',
    title: 'Product Name',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'DataType',
    title: 'Data Type',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'Status',
    title: 'Status',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'BVI',
    title: 'BVI',
    width: "100px",
    titleRender: 'number',
    render: (text, record, index) => {
      if (record.bviFlag) {
        return <BtnTextRedWrap color="red"><Button type="text" onClick={getCheckOriginalData} icon={<ExclamationCircleOutlined />}>{text}</Button></BtnTextRedWrap>
      } else {
        return <BtnTextRedWrap ><Button type="text" onClick={getCheckOriginalData}>{text}</Button></BtnTextRedWrap>
      }
    }
  }, {
    name: 'Operate',
    title: 'Operate',
    width: "140px",
    fixed: 'right',
    render: (text, record, index) => <Space>
      <Button type="text" key="1" icon={<EditOutlined />} onClick={(event) => {
        event.stopPropagation();
        setShowBviData(true)
        setComponentDisabled(false)
        formData.setFieldsValue(record)
      }}></Button>
      <Popconfirm
        title="Are you sure?"
        onConfirm={() => deleteInfos([record.id])}
        okText="Yes"
        cancelText="Cancel"
      >
        <Button type="text" key="2" icon={<i className='gbs gbs-delete'></i>}></Button>
      </Popconfirm>
      <Button type="text" key="3" icon={<i className='gbs gbs-confirm'></i>}></Button>
    </Space>
  }]
  useEffect(() => {
    _getData()
  }, [current])

  const _getData = (_pageSize?: number) => {

    const params = {
      current,
      pageSize: _pageSize ?? pageSize,
      ...form.getFieldsValue()

    }
    console.log(params)
    setTableData([{
      BusinessLine: "1",
      BVI: 3,
      bviFlag: true
    }, {
      BusinessLine: "2",
      BVI: 4,

    }, {
      BusinessLine: "3",
      BVI: 38,
      bviFlag: true
    }, {
      BusinessLine: "4",
      BVI: 3,
      bviFlag: true
    }, {
      BusinessLine: "5",
      BVI: 4,

    }, {
      BusinessLine: "6",
      BVI: 38,
      bviFlag: true
    }, {
      BusinessLine: "7",
      BVI: 3,
      bviFlag: true
    }, {
      BusinessLine: "8",
      BVI: 4,

    }, {
      BusinessLine: "9",
      BVI: 38,
      bviFlag: true
    }, {
      BusinessLine: "10",
      BVI: 3,
      bviFlag: true
    }, {
      BusinessLine: "11",
      BVI: 4,

    }, {
      BusinessLine: "12",
      BVI: 38,
      bviFlag: true
    }])
  }

  const savefilterGroup = () => {
    console.log("please save  filter group interface")
  }
  const changePageSize = (val: number) => {
    setPageSize(val)
    _getData(val)
  }
  // 删除接口
  const deleteInfos = (ids: Array<any>) => {
    message.success("success");
    setSelectedRowKeys([])
    setCurrent(1)
  }
  const onPageChange = (pagination, filters, sorter, extra) => {
    //   翻页|排序|筛选
    setCurrent(pagination.current);
    switch (extra.action) {
      case "paginate":
        setCurrent(pagination.current)
        break;
      case "sort":
        break;
      default:
        break;
    }
  }
  // BVI-View
  const rowClick = (record) => {
    formData.setFieldsValue(record)
    setShowBviData(true)
    setComponentDisabled(true)
  }
  const uploadProps = {
    beforeUpload: () => {
      return false
    }
  }
  // }导入数据
  const importExcel = () => {
    formImport.validateFields().then((values) => {
      console.log(values)
      const fd = new FormData();
      objectToFormData(values.file[0], fd, "file")
      importDataSave(fd, values.type).then(res => {
        setShowImport(false)
        if (res.isSuccess) {
          message.success("Submit success!")
          _getData()
        } else {
          message.error(res.msg)
        }
      })

    }).catch(error => {

    })
  }

  const copyData = () => {
    Modal.confirm({
      title: "Copy Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Copy confirm?",
      okText: "OK",
      cancelText: "Cancel",
      onOk: () => {
        console.log("调用copy接口")
        _getData()
        setSelectedRowKeys([])
        message.success("Copy success！")
      },
      centered: true,
    })
  }
  return <div>
    <Modal width="800px" title={
      <TableTopDiv style={{ margin: 0 }}>
        <TableTitleDiv style={{ float: 'left' }}>
          <TaleTitleIconDiv>
            <span></span>
          </TaleTitleIconDiv>
          <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>Import Data</span>
        </TableTitleDiv>
      </TableTopDiv>
    } footer={null} visible={showImport} maskClosable={false} destroyOnClose={true} onCancel={() => {
      formImport.resetFields();
      setShowImport(false);
    }}>
      <Form form={formImport} labelCol={{ flex: '100px' }}>
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true }]}
        >
          <Radio.Group >
            <Radio value={1}>BVI Manual</Radio>
            <Radio value={2}>R2R MD</Radio>
            <Radio value={3}>H2R BVI</Radio>
            <Radio value={4}>H2R T&E BVI</Radio>
            <Radio value={5}>H2R GMM</Radio>
            <Radio value={6}>O2C BVI</Radio>
            <Radio value={7}>O2C TI BVI</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="File"
          name="file"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
          rules={[{ required: true }]}
        >
          <Upload
            maxCount={1}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            {...uploadProps}
          >
            <Button key="import" type="text" icon={<UploadOutlined />}>
              <span>Upload</span>
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Space size={60}>
            <Button type="primary" onClick={importExcel}>Submit</Button>
            <Button>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
    <Modal width="1000px" title={
      <TableTopDiv style={{ margin: 0 }}>
        <TableTitleDiv style={{ float: 'left' }}>
          <TaleTitleIconDiv>
            <span></span>
          </TaleTitleIconDiv>
          <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>BVI Data</span>
        </TableTitleDiv>
      </TableTopDiv>
    } visible={showBviData} footer={null} onCancel={() => setShowBviData(false)}>
      <Form requiredMark={!componentDisabled} form={formData} labelCol={{ flex: '120px' }} >
        <Row gutter={20}>
          <Col span={24}>
            <Form.Item
              label="Product Name"
              name="ProductName"
              rules={[{ required: true }]}
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Bussiness Line"
              name="BussinessLine"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Service Line"
              name="ServiceLine"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Customer Devision"
              name="CustomerDevision"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="ARE"
              name="ARE"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Billing ARE"
              name="BillingARE"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Company Code"
              name="CompanyCode"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Cost Center"
              name="CostCenter"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Billing Cost Center"
              name="BillingCostCenter"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="BVI"
              name="BVI"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Unit Price"
              name="UnitPrice"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Total Amount"
              name="TotalAmount"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="PO"
              name="PO"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="System"
              name="System"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="BVI Month"
              name="BVIMonth"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="BVI Status"
              name="BVIStatus"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Comment"
              name="Comment"
            >
              <Input.TextArea disabled={componentDisabled} />
            </Form.Item>
          </Col>
          {
            !componentDisabled ? <Col span={24} >
              <Form.Item style={{ textAlign: 'center' }}
              >
                <Space size={60}>
                  <Button type="primary">Save</Button>
                  <Button>Cancel</Button>
                </Space>
              </Form.Item>
            </Col> : ''
          }

        </Row>
      </Form>

    </Modal>
    <Modal title={
      <TableTopDiv style={{ margin: 0 }}>
        <TableTitleDiv style={{ float: 'left' }}>
          <TaleTitleIconDiv>
            <span></span>
          </TaleTitleIconDiv>
          <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>Check Original List</span>
        </TableTitleDiv>
      </TableTopDiv>} width="1300px" visible={isCheckOriginal} footer={null} onCancel={() => setIsCheckOriginal(false)}>
      <TableWrapDiv>
        <Table columns={columns} rowClassName={(record, index) => (index % 2 == 0 ? '' : 'stripe')} dataSource={checkData} rowKey="id" pagination={false} scroll={{ y: 'calc(100vh - 390px)' }} />
      </TableWrapDiv>

      <div style={{ margin: "20px auto 40px", textAlign: 'center' }}>
        <Button type="primary">Export</Button>
      </div>
    </Modal>
    <TableList
      data={tableData}
      form={form}
      columns={orignalCols}
      total={total}
      rowClick={(record => rowClick(record))}
      current={current}
      onPageChange={onPageChange}
      onChange={(_selectedRowKeys, _selectedRows) => {
        setSelectedRowKeys(_selectedRowKeys)
        setSelectedRows(_selectedRows)
      }}
      changePageSize={changePageSize}
      search={isSearch}
      rowKey="BusinessLine"
      listName="Data Management"
      renderFilterGroup={
        <FilterGroup onSaveFilterGroup={savefilterGroup} fields={orignalCols} onSearch={() => _getData()} />
      }
      renderBtns={<Space>
        <BtnOrangeWrap><Button onClick={() => { }}>Recheck</Button></BtnOrangeWrap>
        <BtnGreenWrap><Button>Confirm</Button></BtnGreenWrap>
        <BtnBlueWrap><Button>Unconfirm</Button></BtnBlueWrap>
        <Divider type="vertical" style={{ height: '20px', borderColor: "#999" }} />
        <BtnThemeWrap><Button>Export Original</Button></BtnThemeWrap>
        <BtnThemeWrap>
          <Dropdown overlay={() => (
            <Menu>
              <Menu.Item key="1" icon={<i className='gbs gbs-import'></i>} onClick={() => setShowImport(true)}>
                <span style={{ margin: "0 10px" }}>Import</span>
              </Menu.Item>
              <Menu.Item key="2" icon={<i className='gbs gbs-add'></i>}>
                <span style={{ margin: "0 10px" }}>Add</span>
              </Menu.Item>
              <Menu.SubMenu key="3" title={<span style={{ margin: "0 10px" }}>Import</span>} icon={<i className='gbs gbs-download'></i>}>
                <Menu.Item key="manual"><a href={process.env.WEB_URL + '/template/BVI_Manual Input_Template.xlsx'}>BVI Manual Template</a></Menu.Item>
                <Menu.Item key="md"><a href={process.env.WEB_URL + '/template/R2R MD Import Data 202109.xlsx'}>R2R MD Template</a></Menu.Item>
                <Menu.Item key="BVI"><a href={process.env.WEB_URL + '/template/H2R BVI Uploading template-22 P3.xlsx'}>H2R BVI Template</a></Menu.Item>
                <Menu.Item key="T&E"><a href={process.env.WEB_URL + '/template/H2R T&E report example.xlsx'}>H2R T&E BVI Template</a></Menu.Item>
                <Menu.Item key="GMM"><a href={process.env.WEB_URL + '/template/H2R GMM Charging_Other DC_China_202201-1.xlsx'}>H2R GMM Template</a></Menu.Item>
                <Menu.Item key="O2C"><a href={process.env.WEB_URL + '/template/BVI template O2C.xlsx'}>O2C BVI Template</a></Menu.Item>
                <Menu.Item key="TI"><a href={process.env.WEB_URL + '/template/BVI_O2C_TI_CompanyCo.Template.xlsx'}>O2C  TI BVI Template</a></Menu.Item>
              </Menu.SubMenu>
            </Menu>
          )
          }>
            <Button>
              <Space>
                Add
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown></BtnThemeWrap>
        <BtnThemeWrap><Button disabled={selectedRowKeys.length !== 1} onClick={copyData}>Copy</Button></BtnThemeWrap>
        <BtnThemeWrap><Button disabled={!selectedRowKeys.length}>Edit</Button></BtnThemeWrap>
        <Button disabled={!selectedRowKeys.length}>Delete</Button>
        <Divider type="vertical" style={{ height: '20px', borderColor: "#999" }} />
        <Button style={{ width: '40px' }} onClick={() => setIsSearch(!isSearch)} icon={<img style={{ verticalAlign: 'middle', marginTop: '-2px' }} src={search} />}></Button>
      </Space>}
    />
  </div>;
};
