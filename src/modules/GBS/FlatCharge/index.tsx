import React, { useEffect, useState } from 'react';
import TableList from '@/modules/components/TableMixInline'
import { Button, Col, DatePicker, Divider, Dropdown, Form, Input, Menu, message, Modal, Popconfirm, Radio, Row, Select, Space, Table, Upload } from 'antd';
import { DownOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { BtnThemeWrap, TableTitleDiv, TableTopDiv, TableWrapDiv, TaleTitleIconDiv } from '@/assets/style';
import search from '@/assets/images/search.png'
import FilterGroup from '@/modules/components/FilterGroup'
import TableMix from '@/components/Table'
import { deleteData, getFlatChargeData, submitMulti, copyData, logDataQuery, importFlatData, getProductData, exportExcel } from '@/app/request/apiFlat'
import './style.less'
import moment from 'moment';
export default (props: any) => {
  const [tableData, setTableData] = useState([])
  const [isSearch, setIsSearch] = useState(true)
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [pageSize, setPageSize] = useState(20)
  const [showLog, setShowLog] = useState(false)
  const [logData, setLogData] = useState([])
  const [logSize, setLogSize] = useState(20)
  const [logCurrent, setLogCurrent] = useState(1)
  const [logTotal, setLogTotal] = useState(0)
  const [logId, setLogId] = useState('')
  const [showFlatData, setShowFlatData] = useState(false)
  const [form] = Form.useForm();
  const [formData] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [productData, setProductData] = useState([])
  const [showPro, setShowPro] = useState(false)
  const [searchType, setSearchType] = useState("header")
  const [groupName, setGroupName] = useState("")
  const orignalCols = [{
    name: 'bviBusinessLine',
    title: 'BVI Business Line',
    width: "150px",
    titleRender: 'input'
  }, {
    name: 'businessLine',
    title: 'Business Line',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'serviceLine',
    title: 'Service Line',
    width: "100px",
    titleRender: 'input',
    logic: true
  }, {
    name: 'are',
    title: 'ARE',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'companyCode',
    title: 'Company Code',
    width: "150px",
    titleRender: 'input'
  }, {
    name: 'customerDevision',
    title: 'Customer Devision',
    width: "150px",
    titleRender: 'input',
    logic: true
  },
  {
    name: 'product',
    title: 'Product Name',
    width: "200px",
    titleRender: 'input'
  }, {
    name: 'costCenter',
    title: 'Cost Center',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'totalAmount',
    title: 'Total Amount',
    width: "100px",
    logic: true
  }, {
    name: 'po',
    title: 'PO',
    width: "180px",
    titleRender: 'input'
  }, {
    name: 'comment',
    title: 'Comment',
    width: "200px",
    titleRender: 'input'
  }, {
    name: 'startMonth',
    title: 'Start Month',
    width: "100px",
    // titleRender: 'input'
  }, {
    name: 'endMonth',
    title: 'End Month',
    width: "100px",
    // titleRender: 'input'
  }, {
    name: 'chargeType',
    title: 'ChargeType',
    width: "200px",
    titleRender: 'input'
  }, {
    name: 'system',
    title: 'System',
    width: "120px",
    titleRender: 'input'
  }, {
    name: 'TemplateType',
    title: 'Template Type',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'modifiedDate',
    title: 'Modified Date',
    width: "180px",
    render: (text) => text && moment(text).isValid() ? moment(text).format("YYYY-MM-DD HH:mm:ss") : text
  }, {
    name: 'modifiedUser',
    title: 'Modified User',
    width: "100px",
    titleRender: 'input'
  },
  {
    name: 'Operate',
    title: 'Operate',
    width: "200px",
    fixed: 'right',
    render: (text, record, index) => <Space>
      <Button type="text" key="1" icon={<EditOutlined />}></Button>
      <Popconfirm
        title="Confirm to delete?"
        onConfirm={(event) => deleteInfos([record.id], event)}
        okText="Confirm"
        cancelText="Cancel"
      >
        <Button type="text" key="2" icon={<i className='gbs gbs-delete'></i>} onClick={(event) => event.stopPropagation()}></Button>
      </Popconfirm>
      {
        record.dataStatus !== "Submit" ? <Popconfirm
          title="Confirm submission?"
          onConfirm={(event) => { onSubmit([record.orgId], event) }}
          okText="Confirm"
          cancelText="Cancel"
        ><Button type="text" key="3" icon={<i className='gbs gbs-submit'></i>} onClick={(event) => event.stopPropagation()} ></Button>
        </Popconfirm> : ''
      }

      < Button type="text" key="4" icon={<i className='gbs gbs-logs' ></i>} onClick={(event) => {
        event.stopPropagation();
        toLog(record.orgId)
      }}></Button >
    </Space >
  }]
  const columns: any = [{
    title: 'Created Date',
    dataIndex: 'createdDate',
    key: 'createdDate',
    align: 'center',
    width: "160px",
    render: (text) => text && moment(text).isValid() ? moment(text).format("YYYY-MM-DD HH:mm:ss") : text
  }, {
    title: 'Created User',
    dataIndex: 'createdUser',
    key: 'createdUser',
    align: 'center',
  }, {
    title: 'Fields Name',
    dataIndex: 'fieldsName',
    key: 'fieldsName',
    align: 'center',
  }, {
    title: 'Old Value',
    dataIndex: 'oldValue',
    key: 'oldValue',
    align: 'center',
  }, {
    title: 'New Value',
    dataIndex: 'newValue',
    key: 'newValue',
    align: 'center',
  }, {
    title: 'Modified Date',
    dataIndex: 'modifiedDate',
    // sorter: {
    //   compare: (a, b) => moment(a.modifiedDate) > moment(b.modifiedDate),
    // },
    key: 'modifiedDate',
    align: 'center',
    render: (text) => text && moment(text).isValid() ? moment(text).format("YYYY-MM-DD HH:mm:ss") : text
  }, {
    title: 'Modified User',
    dataIndex: 'modifiedUser',
    key: 'modifiedUser',
    align: 'center',
  }]
  const proColumns: any = [
    {
      name: 'businessLine',
      title: 'Business Line',
      width: "100px",
    }, {
      name: 'are',
      title: 'ARE',
      width: "100px",
    }]
  useEffect(() => {

    _getData()

  }, [current, searchType])

  // 用于获取table接口方法
  const _getData = (_pageSize?: number) => {
    let params = {};
    if (searchType == "header") {
      params = {
        current,
        pageSize: _pageSize ?? pageSize,
        searchCondition: form.getFieldsValue()
      }
    } else {
      params = {
        groupName,
        current,
        pageSize: _pageSize ?? pageSize,

      }
    }

    return getFlatChargeData(params).then(res => {
      if (res.isSuccess) {
        setTableData(res.data)
        setTotal(res.totalCount)
      } else {
        message.error(res.msg)
      }
    })
  }

  const savefilterGroup = () => {
    console.log("please save  filter group interface")
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
  const changePageSize = (val: number) => {
    setPageSize(val)
    _getData(val)
  }
  const handleLogSize = (val: number) => {
    setLogSize(val)

  }
  // 删除接口
  const deleteInfos = (recordIdList: Array<any>, event) => {
    event.stopPropagation();
    deleteData({
      recordIdList
    }).then(res => {
      if (res.isSuccess) {
        message.success("Deletion succeeded!");
        setSelectedRowKeys([])
        _getData()
        setCurrent(1)
      } else {
        message.error(res.msg)
      }
    })
  }
  // 批量提交
  const onSubmit = (data, event) => {
    event.stopPropagation();
    submitMulti({
      "recordIdList": data
    }).then(res => {
      if (res.isSuccess) {
        setSelectedRowKeys([])
        _getData()
        message.success(res.msg)
      } else {
        message.error(res.msg)
      }
    })

  }
  const toCopy = () => {
    Modal.confirm({
      title: "Tips",
      icon: <ExclamationCircleOutlined />,
      content: "Confirm to copy this record?",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => {
        copyData({
          "recordIdList": selectedRowKeys
        }).then(res => {
          if (res.isSuccess) {
            _getData()
            setSelectedRowKeys([])
            message.success(res.msg)
          } else {
            message.error(res.msg)
          }
        })
      },
      centered: true,
    })
  }
  const toLog = (recordId: string) => {
    // 获取loglist数据
    setLogId(recordId)
  }
  useEffect(() => {
    logId && _getLogData()
  }, [logCurrent, logId, logSize])
  const _getLogData = async () => {
    const res = await logDataQuery({
      recordId: logId,
      pageIndex: logCurrent,
      pageSize: logSize
    })
    if (res.isSuccess) {
      setLogData(res.data || [])
      setLogTotal(res.totalCount)
      setShowLog(true)
    } else {
      message.error(res.msg)
    }
    return res
  }
  const onLogPageChange = (pagination, filters, sorter, extra) => {
    //   翻页|排序|筛选
    switch (extra.action) {
      case "paginate":
        setLogCurrent(pagination.current)
        break;
      case "sort":
        break;
      default:
        break;
    }
  }
  const importExcel = (file) => {
    const fd = new FormData();
    fd.append("file", file);
    importFlatData(fd).then(res => {
      if (res.isSuccess) {
        message.success(res.msg)
        _getData()
        setSelectedRowKeys([])
      } else {
        message.error(res.msg)
      }
    })
  }
  const _getProduct = () => {
    getProductData({
      "are": "",
      "customerDivision": "",
      "productName": "",
      "pageIndex": 1,
      "pageSize": 20
    }).then(res => {

    })
  }
  const exportExcelAction = () => {
    // 确认导出哪一种搜索方式
    let params: any = {
      pageIndex: current,
      pageSize: pageSize,
    }
    if (searchType == "header") {
      params.searchCondition = form.getFieldsValue()
    }
    exportExcel(params, searchType).then((res: any) => {
      let elink = document.createElement('a');
      // 设置下载文件名
      elink.download = 'Flat Charge List.xlsx';
      elink.href = window.URL.createObjectURL(new Blob([res.response?.data]));
      elink.click();
      window.URL.revokeObjectURL(elink.href);
      // parseExcel(res.data, fileName);
    });
  };


  return <div>
    <Modal width="1000px" title={
      <TableTopDiv style={{ margin: 0 }}>
        <TableTitleDiv style={{ float: 'left' }}>
          <TaleTitleIconDiv>
            <span></span>
          </TaleTitleIconDiv>
          <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>Product List Data</span>
        </TableTitleDiv>
      </TableTopDiv>
    } footer={null} visible={showPro} maskClosable={false} destroyOnClose={true} onCancel={() => {
      // formImport.resetFields();
      setShowPro(false);
    }}>
      <TableWrapDiv>
        <Table columns={proColumns} dataSource={productData} rowKey="id" pagination={false} />
      </TableWrapDiv>
    </Modal>
    {/* 日志查询 */}
    <Modal width="1000px" title={
      <TableTopDiv style={{ margin: 0 }}>
        <TableTitleDiv style={{ float: 'left' }}>
          <TaleTitleIconDiv>
            <span></span>
          </TaleTitleIconDiv>
          <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>Log List Data</span>
        </TableTitleDiv>
      </TableTopDiv>
    } footer={null} visible={showLog} maskClosable={false} destroyOnClose={true} onCancel={() => {
      // formImport.resetFields();
      setShowLog(false);
    }}>
      <TableWrapDiv className='selfTable'>
        <TableMix columns={columns} data={logData} current={logCurrent} pageSize={logSize} total={logTotal} handlePageSize={handleLogSize} rowKey="id" onPageChange={onLogPageChange} pagination={true} />
      </TableWrapDiv>
    </Modal>
    {/* 新增、编辑flat Charge */}
    <Modal maskClosable={false} width="1000px" title={
      <TableTopDiv style={{ margin: 0 }}>
        <TableTitleDiv style={{ float: 'left' }}>
          <TaleTitleIconDiv>
            <span></span>
          </TaleTitleIconDiv>
          <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>Flat Charge Data</span>
        </TableTitleDiv>
      </TableTopDiv>
    } visible={showFlatData} footer={null} onCancel={() => {
      setShowFlatData(false)
      formData.resetFields()
    }}>
      <Form requiredMark={!componentDisabled} form={formData} labelCol={{ flex: '120px' }} >
        <Row gutter={20}>
          <Col span={20}>
            <Form.Item
              label="Product Name"
              name="ProductName"
              rules={[{ required: true }]}
            >
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={() => {

            }}>Search Product</Button>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Bussiness Line"
              name="BussinessLine"
            >
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Service Line"
              name="ServiceLine"
            >
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Customer Devision"
              name="CustomerDevision"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="ARE"
              name="ARE"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Company Code"
              name="CompanyCode"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Cost Center"
              name="CostCenter"
            >
              <Select >
                {/* <Select.Option></Select.Option> */}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Total Amount"
              name="TotalAmount"
              rules={[{ required: true, message: 'Total Amount is Required;' }]}
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
              label="Start Month"
              name="StartMonth"
            >
              <DatePicker disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="End Month"
              name="EndMonth"
            >
              <DatePicker disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="ChargeType"
              name="ChargeType"
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
              label="Template Type"
              name="TemplateType"
            >
              <Input disabled={componentDisabled} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Upload Date"
              name="UploadDate"
            >
              <DatePicker disabled={componentDisabled} />
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

    <TableList
      headerSearch={() => {
        if (searchType == "header") {
          return _getData()
        } else {
          setSearchType("header")
        }
      }}
      form={form}
      data={tableData}
      columns={orignalCols}
      selectedRowKeys={selectedRowKeys}
      total={total}
      onPageChange={onPageChange}
      onChange={(_selectedRowKeys, _selectedRows) => {
        setSelectedRowKeys(_selectedRowKeys)
        setSelectedRows(_selectedRows)
      }}
      changePageSize={changePageSize}
      current={current}
      search={isSearch}
      rowKey="orgId"
      listName="Flat Charge"
      renderFilterGroup={
        <FilterGroup defaultVal={groupName} changeVal={setGroupName} onSearch={() => setSearchType("group")} onSaveFilterGroup={savefilterGroup} fields={orignalCols} exportAction={exportExcelAction} />
      }
      renderBtns={<Space>
        {/* <BtnThemeWrap><Button>Export Original</Button></BtnThemeWrap> */}
        <BtnThemeWrap>
          <Dropdown overlay={() => (
            <Menu >
              <Menu.Item key="1" icon={<i className='gbs gbs-import'></i>}>

                <Upload style={{ margin: "0 10px" }}
                  maxCount={1}
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  beforeUpload={(file) => {
                    importExcel(file)
                    return false
                  }}
                >
                  <Button key="import" type="text">
                    <span>Import</span>
                  </Button>
                </Upload>

              </Menu.Item>
              <Menu.Item key="2" icon={<i className='gbs gbs-add'></i>}>
                <span style={{ margin: "0 10px" }} onClick={() => {
                  setShowFlatData(true)
                  setComponentDisabled(false)
                }}>Add</span>
              </Menu.Item>
              <Menu.Item key="3" icon={<i className='gbs gbs-download'></i>}>
                <span style={{ margin: "0 10px" }}><a href="./template/Flat Charge.xlsx">Download Template</a></span>
              </Menu.Item>
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
        <BtnThemeWrap><Button disabled={selectedRowKeys.length != 1} onClick={toCopy}>Copy</Button></BtnThemeWrap>
        <BtnThemeWrap><Button disabled={!selectedRowKeys.length} onClick={(event) => onSubmit(selectedRowKeys, event)}>Submit</Button></BtnThemeWrap>
        <Button onClick={(event) => deleteInfos(selectedRowKeys, event)} disabled={selectedRowKeys.length == 0}>Delete</Button>
        <Divider type="vertical" style={{ height: '20px', borderColor: "#999" }} />
        <Button style={{ width: '40px' }} onClick={() => setIsSearch(!isSearch)} icon={<img style={{ verticalAlign: 'middle', marginTop: '-2px' }} src={search} />}></Button>
      </Space>}
    />
  </div>;
};
