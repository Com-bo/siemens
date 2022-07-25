import React, { useState, useEffect } from 'react';
import {
  BtnThemeWrap,
  ContentWrap,
  FilterGroupDiv,
  TableTitleDiv,
  TableTopDiv,
  TaleTitleIconDiv,
} from '@/assets/style';
import search from '@/assets/images/search.png';
import TableList from '@/modules/components/TableMixInline';
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Tooltip,
  Switch,
  Upload,
} from 'antd';
import moment from 'moment';
import './style.less';
import DebounceSelect from '@/components/Select/debounceSelect';
import TableMix from '@/components/Table';
import {
  ClearOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  ServiceLineBasicQueryListData,
  ServiceLineBasicExportData,
  ServiceLineBasicDeleteData,
  ServiceLineBasicQueryLogData,
  ServiceLineBasicEditDataSave

} from '@/app/request/apiServiceLineBasic';
export const Index = (props: any) => {
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [formData] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [showLog, setShowLog] = useState(false);
  const [logData, setLogData] = useState([]);
  const [logSize, setLogSize] = useState(20);
  const [logCurrent, setLogCurrent] = useState(1);
  const [logTotal, setLogTotal] = useState(0);
  const [logId, setLogId] = useState('');
  const [showCostCenterData, setShowCostCenterData] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const orignalCols: any = [
    {
      name: 'chargeType',
      title: 'ChargeType',
      width: '100px',
  
    },
    {
      name: 'billingLocation',
      title: 'Billing Location',
      width: '100px',
   
    },
    {
      name: 'businessLine',
      title: 'Businessline',
      width: '200px',
     
    },
    {
      name: 'glAccount',
      title: 'GLAccount',
      width: '150px',
 
    },
    {
      name: 'saleOrg',
      title: 'SaleOrg',
      width: '150px',
  
    },
    {
      name: 'distributionChannel',
      title: 'Distribution Channel',
      width: '180px',

    },
    {
      name: 'division',
      title: 'Division',
      width: '180px',
 
    },
    {
      title: 'Sales Office',
      width: '180px',
      name: 'salesOffice',

    },
    {
      title: 'Sales Group',
      width: '180px',
      name: 'salesGroup',
  
    },
    {
      title: 'Sales Revenue Type',
      width: '150px',
      name: 'salesRevenueType',

    },
    {
      title: 'Is MVC',
      width: '150px',
      name: 'isMVC',
      render: (text) => (text === null ? '' : text === false ? 'No' : 'Yes'),
    },
    {
      name: 'Operate',
      title: 'Operate',
      width: '200px',
      fixed: 'right',
      render: (text, record, index) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="text"
              key="1"
              icon={<EditOutlined />}
              onClick={() => {
                setShowCostCenterData(true);
                setComponentDisabled(false);
                formData.setFieldsValue({
                  ...record,
                  customerDivision: record.custemerDivision,
                });
              }}
            ></Button>
          </Tooltip>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={(event) => deleteInfos([record.id], event)}
            okText="Confirm"
            cancelText="Cancel"
          >
            <Tooltip title="Delete">
              <Button
                type="text"
                key="2"
                icon={<i className="gbs gbs-delete"></i>}
                onClick={(event) => event.stopPropagation()}
              ></Button>
            </Tooltip>
          </Popconfirm>
          <Tooltip title="Log">
            <Button
              type="text"
              key="4"
              icon={<i className="gbs gbs-logs"></i>}
              onClick={(event) => {
                event.stopPropagation();

                toLog(record.id);
              }}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  const columns: any = [
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      align: 'center',
      width: '160px',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },
    {
      title: 'Created User',
      dataIndex: 'createdUser',
      key: 'createdUser',
      align: 'center',
    },
    {
      title: 'Fields Name',
      dataIndex: 'fieldsName',
      key: 'fieldsName',
      align: 'center',
    },
    {
      title: 'Old Value',
      dataIndex: 'oldValue',
      key: 'oldValue',
      align: 'center',
    },
    {
      title: 'New Value',
      dataIndex: 'newValue',
      key: 'newValue',
      align: 'center',
    },

  ];
  // 删除接口
  const deleteInfos = (recordIdList: Array<any>, event) => {
    event.stopPropagation();
    Modal.confirm({
      title: 'Tips',
      icon: <ExclamationCircleOutlined />,
      content: 'Confirm to delete the selected data?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        ServiceLineBasicDeleteData({
          recordIdList,
        }).then((res) => {
          if (res.isSuccess) {
            message.success('Deletion succeeded!');
            setSelectedRowKeys([]);
            getData();
            setCurrent(1);
          } else {
            message.error(res.msg);
          }
        });
      },
      centered: true,
    });
  };
  const getData = () => {
    let params = {
      searchCondition: {
        pageTop: formFilter.getFieldsValue(),
        listHeader: form.getFieldsValue(),
      },
      orderCondition: {
        //   [orderField]: orderType == 'ascend' ? 0 : 1,
      },
      pageIndex: current,
      pageSize: pageSize,
    };
    ServiceLineBasicQueryListData(params).then((res) => {
      if (res.isSuccess) {
        setTableData(res.data);
        setTotal(res.totalCount);
      } else {
        message.error(res.msg);
      }
    });
  };
  useEffect(() => {
    getData();
  }, [current, pageSize]);
  const onPageChange = (pagination, filters, sorter, extra) => {
    setCurrent(pagination.current);
  };

  const changePageSize = (val: number) => {
    setPageSize(val);
  };

  const exportExcelAction = () => {
    let params = {
      searchCondition: {
        pageTop: formFilter.getFieldsValue(),
        listHeader: form.getFieldsValue(),
      },
      orderCondition: {
        //   [orderField]: orderType == 'ascend' ? 0 : 1,
      },
      pageIndex: current,
      pageSize: pageSize,
    };

    ServiceLineBasicExportData(params).then((res: any) => {
      if (res.response.status == 200) {
        let elink = document.createElement('a');
        // 设置下载文件名
        elink.download = 'ServiceLineBasic List.xlsx';
        elink.href = window.URL.createObjectURL(new Blob([res.response?.data]));
        elink.click();
        window.URL.revokeObjectURL(elink.href);
      } else {
        message.error(res.response.statusText);
      }
    });
  };
  // const importExcel = (file) => {
  //   const fd = new FormData();
  //   fd.append('file', file);
  //   importCostCenterData(fd).then((res) => {
  //     if (res.isSuccess) {
  //       message.success(res.msg);
  //       getData();
  //       setSelectedRowKeys([]);
  //     } else {
  //       message.error(res.msg);
  //     }
  //   });
  // };
  useEffect(() => {
    logId && _getLogData();
  }, [logCurrent, logId, logSize]);
  const _getLogData = async () => {
    const res = await ServiceLineBasicQueryLogData({
      recordId: logId,
      pageIndex: logCurrent,
      pageSize: logSize,
    });
    if (res.isSuccess) {
      setLogData(res.data || []);
      setLogTotal(res.totalCount);
    } else {
      message.error(res.msg);
    }
    return res;
  };
  const onLogPageChange = (pagination, filters, sorter, extra) => {
    //   翻页|排序|筛选
    switch (extra.action) {
      case 'paginate':
        setLogCurrent(pagination.current);
        break;
      case 'sort':
        break;
      default:
        break;
    }
  };
  const handleLogSize = (val: number) => {
    setLogSize(val);
  };
  const toLog = (recordId: string) => {
    // 获取loglist数据
    setLogId(recordId);
    setShowLog(true);
  };
  const saveFormData = () => {
    formData
      .validateFields()
      .then((values) => {
        const params = {
          id: formData.getFieldValue('id') || '',
          ...formData.getFieldsValue(),
        };
        ServiceLineBasicEditDataSave(params).then((res) => {
          if (res.isSuccess) {
            message.success(res.msg);
            setShowCostCenterData(false);
            formData.resetFields();
            getData();
          } else {
            message.error(res.msg);
          }
        });
      })
      .catch((e) => {});
  };
  return (
    <ContentWrap>
      {/* 编辑 */}
      <Modal
        maskClosable={false}
        width="1000px"
        title={
          <TableTopDiv style={{ margin: 0 }}>
            <TableTitleDiv style={{ float: 'left' }}>
              <TaleTitleIconDiv>
                <span></span>
              </TaleTitleIconDiv>
              <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                ServiceLineBasic Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        visible={showCostCenterData}
        footer={null}
        onCancel={() => {
          setShowCostCenterData(false);
          formData.resetFields();
        }}
      >
        <Form form={formData} labelCol={{ flex: '150px' }}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="ChargeType"
                name="chargeType"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Billing Location"
                name="billingLocation"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Businessline"
                name="businessLine"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="GLAccount"
                name="glAccount"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="SaleOrg"
                name="saleOrg"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Distribution Channel"
                name="distributionChannel"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Division"
                name="division"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Sales Office" name="salesOffice" rules={[{ required: true }]}>
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Sales Group" name="salesGroup" rules={[{ required: true }]}>
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Sales Revenue Type" name="salesRevenueType">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item label="Is MVC" name="isMVC" rules={[{ required: true }]}>
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col> */}
            <Col span={12}>
              <Form.Item label="Is MVC" name="isMVC" valuePropName="checked">
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item style={{ textAlign: 'center' }}>
                <Space size={60}>
                  {!componentDisabled ? (
                    <Button type="primary" onClick={saveFormData}>
                      Save
                    </Button>
                  ) : (
                    ''
                  )}
                  <Button
                    onClick={() => {
                      setShowCostCenterData(false);
                      formData.resetFields();
                    }}
                  >
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* 日志查询 */}
      <Modal
        width="1000px"
        title={
          <TableTopDiv style={{ margin: 0 }}>
            <TableTitleDiv style={{ float: 'left' }}>
              <TaleTitleIconDiv>
                <span></span>
              </TaleTitleIconDiv>
              <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                Log List Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        footer={null}
        visible={showLog}
        maskClosable={false}
        destroyOnClose={true}
        onCancel={() => {
          // formImport.resetFields();
          setShowLog(false);
        }}
      >
        <div className="selfTable" style={{ margin: '0 0px 0 -24px' }}>
          <TableMix
            columns={columns}
            data={logData}
            current={logCurrent}
            pageSize={logSize}
            total={logTotal}
            handlePageSize={handleLogSize}
            rowKey="id"
            onPageChange={onLogPageChange}
            pagination={true}
          />
        </div>
      </Modal>
      <TableList
        headerSearch={getData}
        form={form}
        data={tableData}
        columns={orignalCols}
        selectedRowKeys={selectedRowKeys}
        total={total}
        onPageChange={onPageChange}
        onChange={(_selectedRowKeys, _selectedRows) => {
          setSelectedRowKeys(_selectedRowKeys);
          setSelectedRows(_selectedRows);
        }}
        renderFilterGroup={
          <FilterGroupDiv>
            <Form
              form={formFilter}
              labelCol={{ flex: '120px' }}
              wrapperCol={{ span: 14 }}
            >
              <Row className="masterData">
                <Col span={5}>
                  <Form.Item label="ChargeType" name="chargeType">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label="Billing Location" name="billingLocation">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label="Businessline" name="businessLine">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item style={{ textAlign: 'right' }}>
                    <Space size={20}>
                      <Tooltip title="Search">
                        <Button
                          type="primary"
                          icon={<i className="gbs gbs-search"></i>}
                          onClick={() => {
                            setCurrent(1);
                            getData();
                          }}
                        ></Button>
                      </Tooltip>
                      <Tooltip title="Export">
                        <Button
                          icon={<i className="gbs gbs-export"></i>}
                          onClick={exportExcelAction}
                        ></Button>
                      </Tooltip>
                      <Tooltip title="Clear">
                        <Button
                          icon={<ClearOutlined />}
                          onClick={() => {
                            form.resetFields();
                            formFilter.resetFields();
                            if (current == 1) {
                              getData();
                            } else {
                              setCurrent(1);
                            }
                          }}
                        ></Button>
                      </Tooltip>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </FilterGroupDiv>
        }
        renderBtns={
          <Space>
            {/* <BtnThemeWrap>
              <Dropdown
                overlay={() => (
                  <Menu>
                    <Menu.Item
                      key="1"
                      icon={<i className="gbs gbs-import"></i>}
                    >
                      <Upload
                        style={{ margin: '0 10px' }}
                        maxCount={1}
                        showUploadList={false}
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                        beforeUpload={(file) => {
                          importExcel(file);
                          return false;
                        }}
                      >
                        <Button key="import" type="text">
                          <span>Import</span>
                        </Button>
                      </Upload>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<i className="gbs gbs-add"></i>}>
                      <Button
                        style={{ margin: '0 10px' }}
                        type="text"
                        onClick={() => {
                          setShowCostCenterData(true);
                          setComponentDisabled(false);
                        }}
                      >
                        Add
                      </Button>
                    </Menu.Item>
                    <Menu.Item
                      key="3"
                      icon={<i className="gbs gbs-download"></i>}
                    >
                      <span style={{ margin: '0 10px' }}>
                        <a href="./template/ServiceLineBasic.xlsx">
                          Download Template
                        </a>
                      </span>
                    </Menu.Item>
                  </Menu>
                )}
              >

                <Button>
                  <Space>
                    Add
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </BtnThemeWrap> */}

            <BtnThemeWrap>
                <Button
                  style={{ margin: '0 10px' }}
                  type="text"
                  onClick={() => {
                    setShowCostCenterData(true);
                    setComponentDisabled(false);
                  }}
                >
                  Add
                </Button>
              </BtnThemeWrap>

            <Button
              disabled={selectedRowKeys.length != 1}
              onClick={(event) => deleteInfos(selectedRowKeys, event)}
            >
              Delete
            </Button>
            {/* <Divider
              type="vertical"
              style={{ height: '20px', borderColor: '#999' }}
            />
            <Button
              style={{ width: '40px' }}
              onClick={() => setIsSearch(!isSearch)}
              icon={
                <img
                  style={{ verticalAlign: 'middle', marginTop: '-2px' }}
                  src={search}
                />
              }
            ></Button> */}
          </Space>
        }
        changePageSize={changePageSize}
        current={current}
        search={isSearch}
        rowKey="id"
        listName="ServiceLineBasic"
      />
    </ContentWrap>
  );
};
export default Index;
