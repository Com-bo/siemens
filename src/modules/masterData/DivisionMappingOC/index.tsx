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
  Upload,
  Switch
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
  // exportCostCenterExcel,
  // logCostCenterDataQuery,
  // 
  DivMappingOcExportData,
  DivMappingOcImportData,
  // DivMappingOcQueryPageDropListData,
  DivMappingOcQueryListData, 
  DivMappingOcEditDataSave, 
  DivMappingOcDeleteData, 
} from '@/app/request/apiDivMappingOc';
const pageName = 'DivisionMapping-OC';
import { AuthWrapper, checkAuth } from '@/tools/authCheck';
import { parseExcel } from '@/tools/excelDownload';
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
      name: 'are',
      title: 'ARE',
      width: '100px',
    },
    {
      name: 'companyCode',
      title: 'CompanyCode',
      width: '150px',
    },
    {
      title: 'CustomerDivision',
      width: '180px',
      name: 'custemerDivision',
    },
    {
      name: 'seTag',
      title: 'SETag',
      width: '150px',
    },
    {
      name: 'Operate',
      title: 'Operate',
      width: '200px',
      fixed: 'right',
      render: (text, record, index) => (
        <AuthWrapper functionName={pageName} authCode={[`${pageName}-Edit`]} >
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
                    seTag:record.seTag=="Yes" ? true:false
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
            {/* <Tooltip title="Log">
              <Button
                type="text"
                key="4"
                icon={<i className="gbs gbs-logs"></i>}
                onClick={(event) => {
                  event.stopPropagation();

                  toLog(record.id);
                }}
              ></Button>
            </Tooltip> */}
          </Space>
        </AuthWrapper>
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
  // ????????????
  const deleteInfos = (recordIdList: Array<any>, event) => {
    event.stopPropagation();
    Modal.confirm({
      title: 'Tips',
      icon: <ExclamationCircleOutlined />,
      content: 'Confirm to delete the selected data?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        DivMappingOcDeleteData({
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
    DivMappingOcQueryListData(params).then((res) => {
      if (res.isSuccess) {
        setSelectedRowKeys([]);
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

    DivMappingOcExportData(params).then((res: any) => {
      if (res.response.status == 200) {
        let elink = document.createElement('a');
        // ?????????????????????
        elink.download = 'DivMappingOc List.xlsx';
        elink.href = window.URL.createObjectURL(new Blob([res.response?.data]));
        elink.click();
        window.URL.revokeObjectURL(elink.href);
      } else {
        message.error(res.response.statusText);
      }
    });
  };
  const importExcel = (file) => {
    const fd = new FormData();
    fd.append('file', file);
    DivMappingOcImportData(fd).then((res) => {
      if (res.isSuccess) {
        res.data && parseExcel(res.data, 'DivMappingOc import feedback');
        message.success(res.msg);
        getData();
        // setSelectedRowKeys([]);
      } else {
        res.data && parseExcel(res.data, 'DivMappingOc import feedback');
        message.error(res.msg);
      }
    });
  };
  useEffect(() => {
    logId && _getLogData();
  }, [logCurrent, logId, logSize]);
  const _getLogData = async () => {
    // const res = await logCostCenterDataQuery({
    //   recordId: logId,
    //   pageIndex: logCurrent,
    //   pageSize: logSize,
    // });
    // if (res.isSuccess) {
    //   setLogData(res.data || []);
    //   setLogTotal(res.totalCount);
    // } else {
    //   message.error(res.msg);
    // }
    // return res;
  };
  const onLogPageChange = (pagination, filters, sorter, extra) => {
    //   ??????|??????|??????
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
    // ??????loglist??????
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
          seTag:formData.getFieldValue('seTag')?"Yes":"No"
        };
        DivMappingOcEditDataSave(params).then((res) => {
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
      {/* ?????? */}
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
                DivisionMappingOC Data
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
              <Form.Item label="ARE" name="are" rules={[{ required: true }]}>
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="CompanyCode"
                name="companyCode"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="CustomerDivision" name="custemerDivision" rules={[{ required: true }]}>
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="SETag" name="seTag" valuePropName="checked">
                <Switch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  disabled={componentDisabled}
                  onChange={(val) => {
                    formData.setFieldsValue({
                      seTag: val,
                    });
                  }}
                />
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

      {/* ???????????? */}
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
              labelCol={{ flex: '50px' }}
              wrapperCol={{ span: 14 }}
            >
              <Row className="masterData">
                <Col span={7}>
                  <Form.Item label="ARE" name="are">
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
                          onClick={()=>{
                            setCurrent(1);
                            getData()
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
          <>
            <AuthWrapper functionName={pageName} authCode={[`${pageName}-Edit`]} >
              <Space>
                <BtnThemeWrap>
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
                              formData.setFieldsValue({
                                seTag: false,
                              });
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
                            <a href="./template/DivisionMapping-OC.xlsx">
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
                </BtnThemeWrap>
                <Button
                  disabled={selectedRowKeys.length == 0}
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
            </AuthWrapper>
          </>
        }
        changePageSize={changePageSize}
        current={current}
        search={isSearch}
        rowKey="id"
        listName="DivisionMappingOC"
      />
    </ContentWrap>
  );
};
export default Index;
